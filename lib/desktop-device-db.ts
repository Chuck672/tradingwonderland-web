import { and, eq } from "drizzle-orm";
import { db } from "./db.ts";
import {
  decideDesktopDeviceLogin,
  desktopDeviceViews,
  type DesktopDeviceDirectory,
  type DesktopDeviceRecord,
} from "./desktop-devices.ts";
import { desktopDevices, users } from "./schema.ts";

function asDate(value: Date | string): Date {
  const date = value instanceof Date ? value : new Date(value);
  return new Date(date.getTime());
}

function mapRow(row: {
  deviceId: string;
  deviceName: string | null;
  createdAt: Date | string;
  lastSeenAt: Date | string;
}): DesktopDeviceRecord {
  return {
    deviceId: row.deviceId,
    deviceName: row.deviceName,
    createdAt: asDate(row.createdAt),
    lastSeenAt: asDate(row.lastSeenAt),
  };
}

const deviceColumns = {
  deviceId: desktopDevices.deviceId,
  deviceName: desktopDevices.deviceName,
  createdAt: desktopDevices.createdAt,
  lastSeenAt: desktopDevices.lastSeenAt,
};

/**
 * MySQL allowlist. Login locks the user row first so two new computers cannot
 * both pass the two-device check. Refresh only updates a row that already exists.
 */
export function createDesktopDeviceDirectory(database: typeof db = db): DesktopDeviceDirectory {
  return {
    async list(userId) {
      const rows = await database.select(deviceColumns).from(desktopDevices).where(eq(desktopDevices.userId, userId));
      return rows
        .map(mapRow)
        .sort((a, b) => a.deviceId.localeCompare(b.deviceId));
    },

    async applyLogin(input) {
      return database.transaction(async (tx) => {
        await tx.select({ id: users.id }).from(users).where(eq(users.id, input.userId)).for("update");

        const rows = await tx.select(deviceColumns).from(desktopDevices).where(eq(desktopDevices.userId, input.userId));
        const existing = rows.map(mapRow);
        const decision = decideDesktopDeviceLogin(existing, {
          deviceId: input.deviceId,
          revokeDeviceId: input.revokeDeviceId,
        });
        if (!decision.ok) {
          return { ok: false as const, error: decision.error, devices: desktopDeviceViews(existing) };
        }

        if (decision.revokeDeviceId) {
          await tx
            .delete(desktopDevices)
            .where(and(eq(desktopDevices.userId, input.userId), eq(desktopDevices.deviceId, decision.revokeDeviceId)));
        }

        if (decision.kind === "touch") {
          const patch: { lastSeenAt: Date; deviceName?: string } = { lastSeenAt: input.now };
          if (input.deviceName) patch.deviceName = input.deviceName;
          await tx
            .update(desktopDevices)
            .set(patch)
            .where(and(eq(desktopDevices.userId, input.userId), eq(desktopDevices.deviceId, input.deviceId)));
          return { ok: true as const };
        }

        await tx.insert(desktopDevices).values({
          id: crypto.randomUUID(),
          userId: input.userId,
          deviceId: input.deviceId,
          deviceName: input.deviceName,
          createdAt: input.now,
          lastSeenAt: input.now,
        });
        return { ok: true as const };
      });
    },

    async touch(userId, deviceId, now) {
      return database.transaction(async (tx) => {
        const rows = await tx
          .select({ deviceId: desktopDevices.deviceId })
          .from(desktopDevices)
          .where(and(eq(desktopDevices.userId, userId), eq(desktopDevices.deviceId, deviceId)))
          .for("update");
        if (rows.length === 0) return false;
        await tx
          .update(desktopDevices)
          .set({ lastSeenAt: now })
          .where(and(eq(desktopDevices.userId, userId), eq(desktopDevices.deviceId, deviceId)));
        return true;
      });
    },
  };
}

export const desktopDeviceDirectory = createDesktopDeviceDirectory();

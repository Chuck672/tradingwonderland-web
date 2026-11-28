import { isDesktopDeviceId } from "./desktop-auth.ts";

/** One paid membership can be signed in on this many computers. */
export const DESKTOP_DEVICE_LIMIT = 2;

export const DESKTOP_DEVICE_NAME_MAX = 120;

export type DesktopDeviceRecord = {
  deviceId: string;
  deviceName: string | null;
  createdAt: Date;
  lastSeenAt: Date;
};

export type DesktopDeviceView = {
  id: string;
  name: string | null;
  lastSeenAt: string;
};

export type DesktopDeviceLoginInput = {
  userId: string;
  deviceId: string;
  deviceName: string | null;
  revokeDeviceId: string | null;
  now: Date;
};

export type DesktopDeviceDecision =
  | { ok: true; kind: "touch" | "register"; revokeDeviceId: string | null }
  | { ok: false; error: "device_limit" | "device_not_found" };

export type DesktopDeviceRejection = {
  ok: false;
  error: "device_limit" | "device_not_found";
  devices: DesktopDeviceView[];
};

export type DesktopDeviceDirectory = {
  list(userId: string): Promise<DesktopDeviceRecord[]>;
  /**
   * Register this computer or touch it. A production directory holds a row
   * lock so two new computers cannot both take the last slot.
   */
  applyLogin(input: DesktopDeviceLoginInput): Promise<{ ok: true } | DesktopDeviceRejection>;
  /** False when this computer is not registered. Updates last-seen when true. */
  touch(userId: string, deviceId: string, now: Date): Promise<boolean>;
};

export function parseDesktopDeviceId(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const id = value.trim();
  if (!isDesktopDeviceId(id)) return null;
  return id;
}

/** Missing or blank keeps the stored name. A non-blank name replaces it. */
export function parseDesktopDeviceName(value: unknown): { ok: true; name: string | null } | { ok: false } {
  if (value == null) return { ok: true, name: null };
  if (typeof value !== "string") return { ok: false };
  const name = value.trim().replace(/[\u0000-\u001F\u007F]/g, "");
  if (name.length > DESKTOP_DEVICE_NAME_MAX) return { ok: false };
  return { ok: true, name: name.length > 0 ? name : null };
}

export function desktopDeviceViews(devices: readonly DesktopDeviceRecord[]): DesktopDeviceView[] {
  return [...devices]
    .sort((a, b) => {
      const seen = b.lastSeenAt.getTime() - a.lastSeenAt.getTime();
      if (seen !== 0) return seen;
      return a.deviceId.localeCompare(b.deviceId);
    })
    .map((device) => ({
      id: device.deviceId,
      name: device.deviceName,
      lastSeenAt: device.lastSeenAt.toISOString(),
    }));
}

/**
 * The same deviceId is the computer that is already registered.
 * revokeDeviceId must already belong to this user, and it must be a different computer.
 * A new computer is rejected when two others would remain registered.
 */
export function decideDesktopDeviceLogin(
  existing: readonly DesktopDeviceRecord[],
  input: { deviceId: string; revokeDeviceId: string | null },
): DesktopDeviceDecision {
  const ids = new Set(existing.map((device) => device.deviceId));
  const revoke = input.revokeDeviceId;
  if (revoke && (revoke === input.deviceId || !ids.has(revoke))) {
    return { ok: false, error: "device_not_found" };
  }

  if (ids.has(input.deviceId)) {
    return { ok: true, kind: "touch", revokeDeviceId: revoke };
  }

  const remaining = existing.length - (revoke ? 1 : 0);
  if (remaining >= DESKTOP_DEVICE_LIMIT) {
    return { ok: false, error: "device_limit" };
  }
  return { ok: true, kind: "register", revokeDeviceId: revoke };
}

function copyDevice(row: DesktopDeviceRecord): DesktopDeviceRecord {
  return {
    deviceId: row.deviceId,
    deviceName: row.deviceName,
    createdAt: new Date(row.createdAt.getTime()),
    lastSeenAt: new Date(row.lastSeenAt.getTime()),
  };
}

/** Process-local directory for tests. Production uses the MySQL table. */
export function createMemoryDeviceDirectory(): DesktopDeviceDirectory {
  const rows: Array<DesktopDeviceRecord & { userId: string }> = [];

  function owned(userId: string): Array<DesktopDeviceRecord & { userId: string }> {
    return rows.filter((row) => row.userId === userId);
  }

  return {
    async list(userId) {
      return owned(userId)
        .map(copyDevice)
        .sort((a, b) => a.deviceId.localeCompare(b.deviceId));
    },

    async applyLogin(input) {
      const existing = owned(input.userId);
      const decision = decideDesktopDeviceLogin(existing, {
        deviceId: input.deviceId,
        revokeDeviceId: input.revokeDeviceId,
      });
      if (!decision.ok) {
        return { ok: false, error: decision.error, devices: desktopDeviceViews(existing) };
      }

      if (decision.revokeDeviceId) {
        const index = rows.findIndex(
          (row) => row.userId === input.userId && row.deviceId === decision.revokeDeviceId,
        );
        if (index >= 0) rows.splice(index, 1);
      }

      const current = rows.find((row) => row.userId === input.userId && row.deviceId === input.deviceId);
      if (decision.kind === "touch") {
        if (!current) {
          return { ok: false, error: "device_not_found", devices: desktopDeviceViews(owned(input.userId)) };
        }
        current.lastSeenAt = new Date(input.now.getTime());
        if (input.deviceName) current.deviceName = input.deviceName;
        return { ok: true };
      }

      rows.push({
        userId: input.userId,
        deviceId: input.deviceId,
        deviceName: input.deviceName,
        createdAt: new Date(input.now.getTime()),
        lastSeenAt: new Date(input.now.getTime()),
      });
      return { ok: true };
    },

    async touch(userId, deviceId, now) {
      const current = rows.find((row) => row.userId === userId && row.deviceId === deviceId);
      if (!current) return false;
      current.lastSeenAt = new Date(now.getTime());
      return true;
    },
  };
}

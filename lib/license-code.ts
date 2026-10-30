import { randomInt } from "node:crypto";

type PlanId = "149" | "349";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateLicenseCode(planId: PlanId): string {
  const prefix = planId === "349" ? "ULTRA" : "PRO";
  const segment = () => {
    let out = "";
    for (let i = 0; i < 4; i += 1) out += ALPHABET[randomInt(ALPHABET.length)];
    return out;
  };
  return `${prefix}-${segment()}-${segment()}-${segment()}`;
}

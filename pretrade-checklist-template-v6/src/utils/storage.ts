export type ChecklistState = Record<string, boolean | undefined>;

export function loadState(key: string): ChecklistState {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as ChecklistState;
  } catch {
    return {};
  }
}

export function saveState(key: string, state: ChecklistState) {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {
    // ignore
  }
}


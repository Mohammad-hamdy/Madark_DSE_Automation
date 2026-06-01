export interface ValErr {
  message?: string;
  members?: string[];
}

export function getValidationErrors(resp: any): ValErr[] {
  if (!resp || typeof resp !== "object") return [];

  const candidates: unknown[] = [
    resp.validationErrors,
    resp.error?.validationErrors,
    resp.error?.data?.validationErrors,
    resp.data?.validationErrors,
    resp.errors,
  ];

  for (const c of candidates) {
    if (Array.isArray(c) && c.length > 0) {
      return c as ValErr[];
    }
  }

  const details: unknown =
    resp.error?.details ?? resp.details ?? resp.error?.message;
  if (typeof details === "string") {
    const matches = details.match(/- (.+?)(?:\n|$)/g);
    if (matches) {
      return matches.map((m) => {
        const text = m.replace(/^- /, "").trim();
        return { message: text };
      });
    }
  }

  return [];
}

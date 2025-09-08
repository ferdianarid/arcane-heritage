export function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export function normalizeString(value: string) {
  return value.toLowerCase().replace(/,/g, "").replace(/\s+/g, " ").trim();
}

export function unslugify(value: string) {
  return value.replace(/-/g, " ").toLowerCase();
}

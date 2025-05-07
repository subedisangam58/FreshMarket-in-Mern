export const slugify = (text: string): string =>
    text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/[\s_-]+/g, "-");

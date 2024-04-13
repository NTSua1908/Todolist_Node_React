export function generateSlug(name: string): string {
    const randomString = Math.random().toString(36).substr(2, 8); // Generate random string
    const baseSlug = name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
    return `${baseSlug}-${randomString}`;
}

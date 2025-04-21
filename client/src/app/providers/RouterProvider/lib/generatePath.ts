export const generatePath = (path: string, params: Record<string, string | number>): string => {
    return Object.entries(params).reduce((acc, [key, value]) => acc.replace(`:${key}`, String(value)), path);
};

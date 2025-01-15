// Since Jest doesn't natively support Vite's `import.meta` syntax,
// this file is centralized and expected to be mocked with Jest.
export const env = { ...import.meta.env };

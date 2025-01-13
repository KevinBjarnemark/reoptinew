// Handles `import.meta.env` in tests with Jest, as Jest doesn't
// natively support Vite's `import.meta` syntax. It also facilitates
// mocking in tests with Jest.
export let env = {
    ...import.meta.env,
};

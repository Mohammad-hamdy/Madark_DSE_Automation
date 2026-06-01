export const DSE_ME: {
  createMockApplication: () => string;
} = {
  createMockApplication: () => `/api/auth/me`,
};

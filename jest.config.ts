/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    // ✅ Handle CSS imports
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",

    // ✅ Handle Next.js path aliases like @/Components/...
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest", { useESM: true }],
  },
  transformIgnorePatterns: ["/node_modules/(?!(@faker-js/faker|uuid)/)"],
};

export default config;

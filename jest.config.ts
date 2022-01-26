export default {
    verbose: true,
    moduleFileExtensions: ["js", "ts"],
    transform: {
        "^.*\\.(ts)$": 'ts-jest'
    },
    testMatch: [
        "**/*.spec.ts"
    ],
    testEnvironment: 'node',
}
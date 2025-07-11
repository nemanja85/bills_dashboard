import "@testing-library/jest-dom/vitest";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		// ...
		setupFiles: ["./tests/setup.js"]
		// ...
	},
});

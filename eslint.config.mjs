import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  eslintPluginPrettierRecommended,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      "src/app/generated",
      ".next/**",
      "build/**",
      "dist/**",
      "out/**",
      "coverage/**",
      "public/**",
      "**/*.d.ts",
    ],
  },
];

export default eslintConfig;

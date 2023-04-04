import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const isGithubAction = process.env.GITHUB_ACTION;
const githubPagesLink = "https://github.com/" + process.env.GITHUB_REPOSITORY;
const baseUrl = isGithubAction ? githubPagesLink : "./";

export default defineConfig({
  base: baseUrl,
  plugins: [react()],
  resolve: { alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }] },
});

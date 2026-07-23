import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // videogame_files/ is the minified vendor bundle for the US Mobile arcade
  // prototype. It is already in .gitignore ("Local prototype scratch — not
  // deployed") but eslint does not read .gitignore, so it was being linted:
  // 3,500+ errors in machine-generated code, which drowned the handful of real
  // findings in src/ and made `npm run lint` useless as a signal.
  globalIgnores(['dist', 'videogame_files', 'videogame.html']),
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['*.config.js', 'scripts/**'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  // Node-context files: build config + build scripts.
  //
  // Browser globals are included alongside the Node ones because
  // scripts/prerender.mjs passes callbacks to Playwright's page.evaluate(),
  // and those run in the PAGE, not in Node. With Node globals only, eslint
  // reported three no-undef errors on `document` that were false: the code is
  // correct, it just executes somewhere eslint could not see.
  {
    files: ['*.config.js', 'scripts/**/*.{js,mjs}'],
    extends: [js.configs.recommended],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
])

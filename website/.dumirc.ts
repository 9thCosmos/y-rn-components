import { defineConfig } from 'dumi';
import * as path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'Demo',
  },
  alias: {
    '@lizhengyu617/widgets$': path.resolve(__dirname, '../packages/widgets/dist/index.js'),
  },
});

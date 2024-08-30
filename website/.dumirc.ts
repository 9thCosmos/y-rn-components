import { defineConfig } from 'dumi';
import * as path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'Demo',
  },
  //配置别名，对import语句的source做映射，
  alias: {
    '@lizhengyu617/y-widgets$': path.resolve(__dirname, '../packages/widgets/dist/index.js'),
    '@lizhengyu617/y-utils$': path.resolve(__dirname, '../packages/utils/dist/index.js'),
    'react-native-svg$': require.resolve('react-native-svg-web'),
    'react-native$': require.resolve('react-native-web'),
  },
});

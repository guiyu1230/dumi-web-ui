import { defineConfig, IConfig } from 'dumi';

export default defineConfig({
  title: 'dumi-web-ui',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  base: `/dumi-web-ui/`,
  publicPath: `/dumi-web-ui/`,
  exportStatic: {},
  dynamicImportSyntax: {},
  resolve: {
    includes: ['docs', 'src'],
  },
  styles: ['https://cdn.jsdelivr.net/npm/antd@4.16.13/dist/antd.css'],
  // more config: https://d.umijs.org/config
} as IConfig);

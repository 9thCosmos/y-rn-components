import { readdirSync, readFileSync, writeFileSync } from 'fs';

const srcFiles = readdirSync('src');
const utilFiles = srcFiles
    .filter((file) => file.endsWith('.ts') && !file.endsWith('.test.ts') && file !== 'index.ts')
    .map((file) => file.replace('.ts', ''));

let indexContent = '// 以下代码由 scripts/generate.srcIndex.mjs 自动生成，请勿改动\n';
for (const name of utilFiles) {
    indexContent += `import * as ${name} from './${name}';\n`;
}
indexContent += `const index = { ${utilFiles.join(', ')} };\n`;

indexContent += `export { ${utilFiles.join(', ')}, index as default };\n`;

writeFileSync('src/index.ts', indexContent, 'utf-8');

// const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
//
// packageJson.files = ['chunks', 'index.js', 'index.d.ts'];
//
// for (const name of utilFiles) {
//     packageJson.files.push(`${name}.js`);
//     packageJson.files.push(`${name}.d.ts`);
// }
//
// writeFileSync('package.json', JSON.stringify(packageJson, null, 4), 'utf-8');

console.log('src/index.ts 生成成功');

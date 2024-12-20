import typescript from '@rollup/plugin-typescript';
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default {
    input: './src/index.ts',
    output: [
        {
            file: 'dist/z-export-table.esm.js',
            format: 'esm',
            name: 'ZExportTable'
        }, {
            file: 'dist/z-export-table.esm.min.js',
            format: 'esm',
            name: 'ZExportTable',
            sourcemap: true,
            plugins: [terser()]
        }
    ],
    plugins: [
        typescript({tsconfig: 'tsconfig.esm.json'}),
        commonjs()
    ]
}
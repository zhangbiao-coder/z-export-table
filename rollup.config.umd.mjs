import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
export default {
    input: './src/index.ts',
    output: [
        {
            file: 'dist/z-export-table.umd.js',
            format: 'umd',
            name: 'ZExportTable'
        }, {
            file: 'dist/z-export-table.umd.min.js',
            format: 'umd',
            name: 'ZExportTable',
            sourcemap: true,
            plugins: [terser()]
        }
    ],
    plugins: [
        typescript(),
        commonjs()
    ]
}
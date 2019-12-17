import json from 'rollup-plugin-json';
import {terser} from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs'

export default {
    input: 'src/main.js',
    output: [
        {
            file: 'src/build/main.js',
            format: 'cjs'
        },
        {
            file: 'src/build/main2.min.js',
            format: 'iife',
            name: '1.0.0',
            plugins: [terser()]
        }
    ],
    plugins: [json(), resolve(),
        commonJS({
            include: 'node_modules/**'
        })],
    format: 'iife',
    sourceMap: 'inline'
};

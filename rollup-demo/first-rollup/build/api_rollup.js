const rollup = require('rollup');

const inputOptions = {
    input: 'src/main.js'
};
const outputOptions = {
    file: 'dist/bundle.js',
    format: 'cjs'
};

async function build() {
    const bundle = await rollup.rollup(inputOptions);

    console.log(bundle.imports);
    console.log(bundle.exports);
    console.log(bundle.modules);

    // const {code, map} = await bundle.generate(outputOptions);
    await bundle.write(outputOptions);
}

build();
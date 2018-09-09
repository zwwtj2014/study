class MyPlugin {
    constructor(options) {
        console.log(JSON.stringify(options));
    }

    apply(compiler) {
        compiler.hooks.emit.tap('MyPlugin', (compilation) => {
            compilation.chunks.forEach(chunk => {
                console.log('====================begin输出chunk=======================');
                console.log(chunk);
                console.log('====================end输出chunk=======================');
                chunk.getModules().forEach(module => {
                    module.dependencies.forEach(function (filepath) {
                        console.log('module.fileDependencies:', filepath, '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$44');
                    });
                });

                chunk.files.forEach(function (filename) {
                    var source = compilation.assets[filename].source();
                    console.log('assets source', source, '****************************************');
                });
            });
        })
    }
}

module.exports = MyPlugin;
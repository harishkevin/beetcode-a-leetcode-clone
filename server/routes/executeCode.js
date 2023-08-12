const ivm = require('isolated-vm');

async function runUserScript(code) {
    const isolate = new ivm.Isolate();
    const context = await isolate.createContext();

    const script = await isolate.compileScript(code);
    const result = await script.run(context);

    return result;
}

module.exports = { runUserScript };

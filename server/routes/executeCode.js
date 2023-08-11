const {VM} = require('VM2')

async function runUserScript(code) {
    return new Promise((resolve, reject) => {
        const vm = new VM({
            timeout : 100000,
            sandbox : {},
        })

        try {
            const result = vm.run(code);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {runUserScript}
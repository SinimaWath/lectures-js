// Уже есть describe
export function describe(name, tests = () => []) {
    console.log('Run suite:', name)
    let failed = [];
    tests().forEach((testsFn) => {
        try {
            testsFn();
        } catch (error) {
            failed.push(`${name}: ${error.message}`);
        }
    })

    if (failed.length === 0) {
        console.log('All test passed');
    } else {
        console.log('Failed tests');
        console.log(failed.forEach((error) => console.log(error)))
    }

}

export function it(testName, fn) {
    return () => {
        console.log('Run test:', testName);
        try {
            fn();
        } catch (error) {
            throw new Error(`Test "${testName}": ${error.message}`)
        }
    }
}

export function expect(valueToCheck) {
    return {
        toBeEqual(expectedValue) {
            if (valueToCheck === expectedValue) {
                return;
            }

            throw new Error(`Value ${expectedValue}, was expected, but got ${valueToCheck}`)
        }
    }
}
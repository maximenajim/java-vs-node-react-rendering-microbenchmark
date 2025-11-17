const assert = require('assert');
const { renderServer } = require('../ReactMicroBenchmark');

const result = renderServer([
    { author: 'Alice', text: 'Hello' },
    { author: 'Bob', text: 'Hi there' }
]);

assert.strictEqual(typeof result, 'string', 'renderServer should return a string');
assert.ok(result.length > 0, 'renderServer result should not be empty');
assert.ok(result.includes('<div'), 'rendered markup should contain a <div> element');

console.log('renderServer test passed');

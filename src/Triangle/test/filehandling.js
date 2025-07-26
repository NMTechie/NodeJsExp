import filehandlingsModule from './../filehandling.js';
import assert from 'node:assert';
import { describe, it } from 'node:test';

assert.strictEqual(typeof filehandlingsModule, 'object', 'filehandlingsModule should be an object');
assert.strictEqual(typeof filehandlingsModule.listFiles, 'function', 'listFiles should be a function');
assert.strictEqual(typeof filehandlingsModule.readFileContent, 'function', 'readFileContent should be a function');

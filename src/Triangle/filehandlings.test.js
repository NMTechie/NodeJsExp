import assert from 'node:assert/strict';
import filehandlingsModule from './filehandling.js';
import { suite, describe, test, it, mock } from 'node:test';

describe('ListFiles', () => {
    it('should be a function', () => {
        assert.equal(typeof filehandlingsModule.listFiles, 'function');
    });
    it('should return an array of file paths', async () => {
        const dir = './../../InputDir';
        const files = await filehandlingsModule.listFiles(dir);
        assert.equal(Array.isArray(files), true, 'Expected an array of file paths');
    });
    it('should return an empty array for an empty directory', async () => {
        const dir = './../../OutputDir';
        const files = await filehandlingsModule.listFiles(dir);
        assert.equal(files.length, 0, 'Expected an empty array for an empty directory');
    });
    it('should throw an error for a non-existent directory', async () => {
        const dir = './../../NonExistentDir';
        try {
            await filehandlingsModule.listFiles(dir);
            assert.fail('Expected an error to be thrown for a non-existent directory');
        } catch (error) {
            assert.ok(error instanceof Error, 'Expected an error to be thrown');
        }
    });
});

suite('ReadFileContent', () => {
    test('should be a function', () => {
        assert.equal(typeof filehandlingsModule.readFileContent, 'function');
    });
    test('should read the content of a file', async () => {
        const filePath = './../../InputDir/same.txt'; // Ensure this file exists for the test
        const content = await filehandlingsModule.readFileContent(filePath);
        assert.equal(typeof content, 'string', 'Expected the content to be a string');
        assert.notEqual(content.length, 0, 'Expected the content to not be empty');
        assert.equal(content, 'Hello World!!!!!!!!!!', 'Expected the content is matching');
    });
    test.todo('should throw an error for a non-existent file', async () => {
        const filePath = './../../InputDir/nonExistentFile.txt';
        try {
            await filehandlingsModule.readFileContent(filePath);
            assert.fail('Expected an error to be thrown for a non-existent file');
        } catch (error) {
            assert.ok(error instanceof Error, 'Expected an error to be thrown');
        }
    });
    test.todo('using a mock to simulate file reading', () => {
        mock.method(filehandlingsModule, 'readFileContent', () => {
            throw new Error('Mocked error for testing');
        });
        try {
            filehandlingsModule.readFileContent('someFilePath')
        } catch (error) {
            assert.equal(error.message, 'Mocked error for testing', 'Expected the mocked error message to match');

        }
    });
});

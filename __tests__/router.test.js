/**
 * @jest-environment jsdom
 */

import { pushToHistory } from '../scripts/router.js';

describe('Testing History Stack', () => {
    test('Correct Size of History Stack', () => {
        expect(pushToHistory('settings').length).toBe(2);
    });

    test('Correct Current State Object', () => {
        expect(pushToHistory('entry', 1).state).toEqual({'page': 'entry1'});
    });

    test('Default State Test', () =>{
        expect(pushToHistory().state).toEqual({});
    });
});
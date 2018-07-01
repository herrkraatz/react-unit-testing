import commentReducer from './comments';
import { SAVE_COMMENT } from '../actions/types';

describe('Comments Reducer', () => {

    // in case there is a weird input, we react with the default state
    test('handles action with unknown type', () => {

        expect(commentReducer(undefined, {})).toEqual([]);
    });

    test('SAVE_COMMENT', () => {

        const action = { type: SAVE_COMMENT, payload: 'new comment'};
        expect(commentReducer([], action)).toEqual(['new comment']);

    });

});
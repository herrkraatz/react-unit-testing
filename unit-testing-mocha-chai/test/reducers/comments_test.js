import { expect } from '../test_helper';
import commentReducer from '../../src/reducers/comments';
import { SAVE_COMMENT } from '../../src/actions/types';

describe('Comments Reducer', () => {

    // in case there is a weird input, we react with the default state
    it('handles action with unknown type', () => {

        // expect(commentReducer()).to.be.instanceof(Array);
        // better:
        // eql compares deeply
        // so we are sure the array is really empty
        // expect(commentReducer()).to.eql([]);
        // failed after we completed the reducer: TypeError: Cannot read property 'type' of undefined
        // so we have to pass in values here:
        expect(commentReducer(undefined, {})).to.eql([]);
    });

    // it('handles action of type SAVE_COMMENT', () => {
    //
    // });
    // better:
    it('SAVE_COMMENT', () => {

        const action = { type: SAVE_COMMENT, payload: 'new comment'};
        expect(commentReducer([], action)).to.eql(['new comment']);

    });

});
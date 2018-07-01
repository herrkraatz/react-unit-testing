import { expect } from '../test_helper';

import { SAVE_COMMENT } from '../../src/actions/types';
import { saveComment } from '../../src/actions';

describe('actions', () => {
    describe('saveComment', () => {
        it('has the correct type', () => {

            // action creator returns an action
            const action = saveComment();
            expect(action.type).to.equal(SAVE_COMMENT);
        });

        it('has the correct payload', () => {

            const action = saveComment('new comment');
            expect(action.payload).to.equal('new comment');
        });

    });

});
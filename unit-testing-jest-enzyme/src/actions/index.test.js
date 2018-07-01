import { SAVE_COMMENT } from './types';
import { saveComment } from './';

describe('actions', () => {
    describe('saveComment', () => {
        test('has the correct type', () => {

            // action creator returns an action
            const action = saveComment();
            expect(action.type).toEqual(SAVE_COMMENT);
        });

        test('has the correct payload', () => {

            const action = saveComment('new comment');
            expect(action.payload).toEqual('new comment');
        });

    });

});
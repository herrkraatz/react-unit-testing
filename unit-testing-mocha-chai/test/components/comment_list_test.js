import { renderComponent, expect } from '../test_helper';
import CommentList from '../../src/components/comment_list';

describe('CommentList', () => {

    let component;

    beforeEach(() => {
        // renderComponents makes props available
        // const props = { comments: ['New Comment', 'New Other Comment'] };
        // component = renderComponent(CommentList, null, props);
        const initialState = { comments: ['New Comment', 'New Other Comment'] }; // better call it initialState, not props
        component = renderComponent(CommentList, null, initialState);
    });

    it('shows an LI for each comment', () => {
        expect(component.find('li').length).to.equal(2);

    });

    it('shows each comment that is provided', () => {
        expect(component).to.contain('New Comment');
        expect(component).to.contain('New Other Comment');
    });

});
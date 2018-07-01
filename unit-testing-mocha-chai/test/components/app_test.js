import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app';

// Use 'describe' to group together similar tests
describe('App', () => {

    let component;

    // First create an instance of App
    beforeEach(() => {
        component = renderComponent(App);
    });

    // Use 'it' to test a single attribute of a target
    it('shows comment box', () => {

        // Use 'expect' to make an 'assertion' about a target
        expect(component.find('.comment-box')).to.exist;
    });

    it('shows comment list', () =>{
        expect(component.find('.comment-list')).to.exist;
    });
});










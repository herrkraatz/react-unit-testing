import React from 'react';
import CommentBox from './comment_box';
import { mount } from 'enzyme';

// We need to wrap CommentBox with <Provider> tag in first beforeEach(() => {}) below;
// otherwise we receive this error message:
// Invariant Violation: Could not find “store” in either the context or props of “Connect(CommentBox)”
// https://stackoverflow.com/questions/36211739/invariant-violation-could-not-find-store-in-either-the-context-or-props-of-c

// The Provider's Redux store can be either our own Redux store (Way 1), or a mock Redux store (Way 2)
// You can choose which you like better (both are working)

// Redux I, needed for both ways:
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
configure({ adapter: new Adapter() });

// Redux II, way 1: Use our own Redux store
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
const createStoreWithMiddleware = applyMiddleware()(createStore);

// Redux II, way 2: Use a mock Redux store
import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
const store = mockStore({});

describe('CommentBox', () => {

    let component;

    beforeEach(() => {

        // Way 1: Use our own Redux store
        // component = mount(<Provider store={createStoreWithMiddleware(reducers)}><CommentBox /></Provider>);

        // Way 2: Use a mock Redux store
        component = mount(<Provider store={store}><CommentBox /></Provider>);
    });

    test('has the correct class', () => {
        expect(component.find('.comment-box').length).toBe(1);

    });

    test('has a text area', () => {

        // Either:
        // expect(component.find('textarea').length).toBe(1);
        // Or:
        expect(component.find('textarea').exists()).toEqual(true);
    });

    test('has a button', () => {

        // Either:
        // expect(component.find('button').length).toBe(1);
        // Or:
        expect(component.find('button').exists()).toEqual(true);
    });

    describe('entering some text', () => {

        beforeEach(() => {

            component.find('textarea').simulate('change', {target: {value: 'new comment'}});
        });

        test('shows that text in the textarea', () => {

            expect(component.find('textarea').prop('value')).toEqual('new comment');
        });

        test('when submitted, clears the input', () => {

            component.simulate('submit');
            expect(component.find('textarea').prop('value')).toEqual('');
        });
    });
});

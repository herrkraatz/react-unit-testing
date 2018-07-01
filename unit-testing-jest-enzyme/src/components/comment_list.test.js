import React from 'react';
import CommentList from './comment_list';
import { mount } from 'enzyme';

// We need to wrap CommentBox with <Provider> tag in first beforeEach(() => {}) below;
// otherwise we receive this error message:
// Invariant Violation: Could not find “store” in either the context or props of “Connect(CommentBox)”
// https://stackoverflow.com/questions/36211739/invariant-violation-could-not-find-store-in-either-the-context-or-props-of-c

// The Provider's Redux store must be our own Redux store, not a mock Redux store as in comment_box.test.js because
// we insert an initial state
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';

configure({ adapter: new Adapter() });
const createStoreWithMiddleware = applyMiddleware()(createStore);

describe('CommentList', () => {

    let component;

    beforeEach(() => {

        const initialState = { comments: ['New Comment', 'New Other Comment'] };
        component = mount(<Provider store={createStoreWithMiddleware(reducers, initialState)}><CommentList /></Provider>);
    });

    test('shows an LI for each comment', () => {

        expect(component.find('li').length).toBe(2);
    });

    test('shows each comment that is provided', () => {

        expect(component.find('li').at(0).text()).toEqual('New Comment');
        expect(component.find('li').at(1).text()).toEqual('New Other Comment');
    });

});
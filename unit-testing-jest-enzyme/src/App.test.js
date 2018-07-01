import React from 'react';
import App from './App';
import { mount } from 'enzyme';

// We need to wrap CommentBox with <Provider> tag in first beforeEach(() => {}) below;
// otherwise we receive this error message:
// Invariant Violation: Could not find “store” in either the context or props of “Connect(CommentBox)”
// https://stackoverflow.com/questions/36211739/invariant-violation-could-not-find-store-in-either-the-context-or-props-of-c
// Also see comment_list.test.js
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';

configure({adapter: new Adapter()});
const createStoreWithMiddleware = applyMiddleware()(createStore);

// Use 'describe' to group together similar tests
describe('App', () => {

    let component;

    beforeEach(() => {
        component = mount(<Provider store={createStoreWithMiddleware(reducers)}><App /></Provider>);
    });

    // Use 'test' or 'it' (both possible) to test a single attribute of a target
    test('shows comment box', () => {

        expect(component.find('.comment-box').length).toBe(1);
    });

    test('shows comment list', () => {
        expect(component.find('.comment-list').length).toBe(1);
    });
});


// https://github.com/jsdom/jsdom
// A fake HTML Document run in the terminal (Node.js)
// A JavaScript implementation of the WHATWG DOM and HTML standards, for use with Node.js
import jsdom from 'jsdom';
import _$ from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react'; // needed whenever we use JSX
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';

// Set up testing environment to run like a browser in the command line
// not window, but global variable

const { JSDOM } = jsdom;
const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;

global.window = global.document.defaultView;
// overwrite default $ of jquery / hook up our fake dom to jquery
const $ =  _$(global.window);

// build 'renderComponent' helper that should render a given react class
function renderComponent(ComponentClass, props, state){

    // https://reactjs.org/docs/test-utils.html
    const componentInstance = TestUtils.renderIntoDocument(
        <Provider store={createStore(reducers, state)}>
            <ComponentClass {...props} />
        </Provider>
    );

    return $(ReactDOM.findDOMNode(componentInstance)); // produces HTML and wraps it into jquery to be accessible


}

// build helper to for simulating events
// makes this possible for all jquery elements: $('div').simulate()
$.fn.simulate = function(eventName, value){

    if (value){
        this.val(value); // val() is a jquery function
    }

    // this is the reference to the dom element, and we need the first one of the array
    TestUtils.Simulate[eventName](this[0]);

};

// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect };

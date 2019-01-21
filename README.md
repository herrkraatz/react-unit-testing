# React Unit Testing

This tutorial shall help setting up Unit Tests for your React/Redux Application.

We will do Unit Testing on React Components and the Redux State within these 2 Stacks:

1. Mocha/Chai (our own Stack)

2. Jest/Enzyme (Create React App Starter Kit: Jest is included)


*Notes:*
- Unit Tests on Redux:

    - Most Redux code are functions anyway, so you don't need to mock anything.
    - Test your Action Creators, Reducers, and the resulting application state by passing test values/no values/wrong values into/through them.
    - Docs: https://redux.js.org/recipes/writing-tests
    
- Unit Tests on React Components:
    - Should focus on bullet-proof answers of these questions:
        - is component's content (hierarchy) rendered correctly (findable in DOM) and contains ALL necessary children?
        - is component's content really NOT rendered if I wanted to hide it?
        - have passed Props the right impact?
        - are passed Props forwarded down to the component's child if the child is the recipient of the Props?
        - is the component's state (NOT application state! This is Redux!) updated correctly and holds the right state after an event/passed Props?
        - are CSS classes/selectors attached to the component? 
        - is Dynamic Styling working as expected?
        - do lifecycle events work correctly, like componentDidMount, componentWillUnmount?
        - and surely some more
        
    - Should NOT focus on the business logic of your React Components as business logic should be pulled out of your React Components.
    - Jest Snapshots can save time by just comparing the rendered Outputs of Test A (actual test) and Test B (test which ran immediately before):
        - Jest will "complain/inform" if the snapshot differs from the previous test, so you will be reminded to doublecheck the differences and, if you did a change on purpose, you can run jest with the -u flag (to update the previous shapshot with the actual one).
        - Installation: `npm install --save-dev react-test-renderer`
        - Links:
            - https://reactjs.org/docs/test-renderer.html
            - https://github.com/facebook/react/tree/master/packages/react-test-renderer
        
        
- Testing Interactions between Redux and React Components:

    - This is already an Integration Test, but:
    - We will cover it shortly below: [Integration Tests between React Component and the Redux State](#chapter3) :-)

### IMPORTANT CAUTION: 
The npm packages might have discovered vulnerabilities by now. 
So do not use the combination of our npm versions in your production environment, but within a test environment instead that is sandboxed from your production network.
Unfortunately the author has no time right now to always keep the npm packages at their latest versions and ensure that their combination still play successfully together. The tuturial is supposed to show how it works and should help building working prototypes to make life easier for you.

## Table of Contents

1. [Getting started](#chapter1)
2. [Two Test Stacks](#chapter2)
    1. [Unit Testing with Stack `Webpack`, `Babel`, `Mocha`, `Chai`](#chapter2a)
        1. [Unit Testing React Components](#chapter2a1)
        2. [Unit Testing the Redux State](#chapter2a2)
    2. [Unit Testing with `Create React App` Starter Kit (Integrated: `Webpack`, `Babel`, `Jest`) plus `Enzyme`](#chapter2b)
        1. [Unit Testing React Components](#chapter2b1)
        2. [Unit Testing the Redux State](#chapter2b2)
3. [Integration Tests between React Component and the Redux State](#chapter3)
4. [Links](#chapter4)


## <a id="chapter1"></a>1. Getting started

### Testing in general

Besides Unit Tests, there are Integration Tests, End-to-end Tests (E2E), and User Acceptance Tests.
These are the main tests in software development. If you want to check out other tests, go here: https://en.wikipedia.org/wiki/Software_testing
 
This is the usual order of testing BEFORE delivering a new software or software version to the client:

1. Unit Tests:
    - A single piece of code (usually a function or a class/object) is tested, separate from other pieces.
    - Unit Tests are very helpful if you need to change your code: If your set of Unit Tests verify that your code works, you can safely change your code and have confidence that the other parts of your program will still work as expected.
    - Unit Tests wording can be used for documentation.
    - Save time because you don't have to always repeat manual testing after working on your code.
    - Examples (in general, not React specific): 
        - Testing a function without passing any argument
        - Testing a function by passing a wrong argument type
        - Passing the correct argument type to a function: Testing if the outcome is valid
        - Testing if function returns a valid JSON structure

    TDD: TDD (Test-Driven Development / or Design) was developed out of Unit Testing:
    - Some quotes:
        - "Keep it simple, stupid!" (KISS) 
        - "You aren't gonna need it!" (YAGNI)
    - You can better focus on a demanded requirement by writing very specific test cases first. This way you are forced to work and concentrate on the demanded requirement only, NOT on functionality that is NOT proven to meet the requirement or was never demanded by the client (see MVP: https://en.wikipedia.org/wiki/Minimum_viable_product).
    - By focusing on writing only the code necessary to pass the tests, designs can often be cleaner and clearer than it is achieved by other methods.
    - TDD Cycle:
        1. Add a test
        2. Run all tests and new test will fail as code not written yet: This way we check if the new test really works
        3. Write the code
        4. Run tests: If all test cases pass, go to next step
        5. Refactor code: Clean up
    - Critics:
        - The difficult thing about TDD for many developers is that you have to write tests BEFORE writing any code.
        - If you're the client and the developer in one person, and you're not quite sure yet how your software should convince and appear to users, better focus on options, brainstorming, and branding than on writing test cases. 

    BDD: BDD (Behaviour-Driven Development / or Design) was developed out of TDD:
    - Sets focus on User Stories and their scenarios/events.
    - Sets more focus on the wording for better understanding and documentation.
    - Therefore makes it easier to show test results to the business side to make the client happy - and yourself.

2. Integration Tests: 
    - Not a single function like above, but logical groups (e.g. a login component, or a Service/API to handle authentication) are tested to see, if they (still) work together successfully.
    - To simulate user actions in Node.js, NOT needing a real browser, we will use jsdom module, which is a great DOM implementation in Node.js and gives us a "fake" DOM entirely in JavaScript to run our automated tests against.
    - Examples (Apps in general, not React specific): 
        - Testing if a login component running on a browser connects to a Service/API running on a server successfully.
        - Testing if a Service/API returns data from a database successfully.
        - Testing if a message component running in a progressive web app returns a success message from the database after writing to it.

3. End-to-end Tests (E2E):
    - End-to-end Test make sure that ALL logical groups of an application and all Third-Party Software work together as expected. 
    - The application should be tested with production data under real-time (stress) conditions against the test setup in order to do check performance as well. 
    - The name End-to-end means that the communication and data transfer of the application works as expected from the one end (the client interface) throughout the other end (the database or another client interface) and vice versa.
    - Also called System Test
    - Examples (Apps in general, not React specific):
        - Testing ALL Use Cases/User Stories:
            - User signs up, creating an account and getting Welcome message on screen / receiving an email to confirm.
            - User signs in, getting Welcome Back message and New Offers on screen. 
            - User logs out, getting Good-Bye message.
            - User adds item to shopping cart to prepare checkout and to continue shopping.
            - User checks out.
            - User cancels account.
            - ...
        - Testing Performance
        - Testing Security


#### When all tests above are successful:
 
4. User Acceptance Tests:
    - The Client/Purchaser/Sponsor is involved.
    - Many manual / decision making steps.
    - Questions:
        - Are all requirements of a specification or contract met?
        - Is performance good enough?
        - Did QA Department test edge cases manually?
        - Did QA Department test security manually?
        - Is Software/New Version ready to be released/integrated into IT landscape?
        - Regression Tests successfully after integrating New Version into IT landscape? Do all previous features still work as expected?


Ok, now let's dive into Unit Testing using BDD.

## <a id="chapter2"></a>2. Two Test Stacks

We want to show Unit Testing along these two BDD frameworks, but with the same outcome:

1. Mocha/Chai

2. Jest/Enzyme 

It will of course depend on your stack and your preference which framework to use.
 
*Note:*
- For a list of other Unit Test JavaScript frameworks, see https://en.wikipedia.org/wiki/List_of_unit_testing_frameworks#JavaScript

## <a id="chapter2a"></a>i. Unit Testing with Stack `Webpack`, `Babel`, `Mocha`, `Chai`

### A Note to Mocha/Chai:

Mocha is the container in which Chai code is running.

### Preparation

First install all dependencies:

```
> cd unit-testing-mocha-chai
> npm install
```

When done, run the tests:

```
> npm run test
```

The outcome will be:

```
> npm run test

> testing-with-webpack-and-chai-mocha@1.0.0 test /Users/piano/Desktop/Projects/react-testing/unit-testing-mocha-chai
> mocha --compilers js:babel-core/register --require ./test/test_helper.js --recursive ./test

  actions
    saveComment
      ✓ has the correct type
      ✓ has the correct payload

  App
    ✓ shows comment box
    ✓ shows comment list

  CommentBox
    ✓ has the correct class
    ✓ has a text area
    ✓ has a button
    entering some text
      ✓ shows that text in the textarea
      ✓ when submitted, clears the input

  CommentList
    ✓ shows an LI for each comment
    ✓ shows each comment that is provided

  Comments Reducer
    ✓ handles action with unknown type
    ✓ SAVE_COMMENT


  13 passing (943ms)

> 
```

To add a watcher to always re-run all tests after a change in code:

```
> npm run test:watch
```

### <a id="chapter2a1"></a>a. Unit Testing React Components

As example we will dive into the simple Unit Test of the App Component and play with it.

Let's explore `test/components/app_test.js`:

```
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
```

1. First we import the test_helper.js file to enable Mocha/Chai and to render the Component.
2. We need to also import `app.js` as well, but we leave it WITHOUT CommentList and CommentBox Components ...
 
    ```
    <CommentBox />
    <CommentList />
    ```
                     
    ... because we want our test to FAIL initially !
    
    ```
    import React, {Component} from 'react';
    
    class App extends Component {
        render() {
            return (
                <div className="App">
                    <header className="App-header">
                        <img src="/logo.svg" className="App-logo" alt="logo"/>
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <div className="Test-container">
                    </div>
                </div>
            );
        }
    }
    
    export default App;
    ```
3. Description of Chai commands:

    - The `describe('App', () => {});` command groups together different tests within the same context, for better readability.
    - The `beforeEach(() => {})` command is called before EACH test = `it('attribute to test', () => {});` command is executed.
    - The `it('shows comment box', () => {});` command groups together the final Unit Test(s).
    - The `expect(component.find('.comment-box')).to.exist;` command executes the final Unit Test, testing our assertion that, in this case, a CommentBox exists within our App Component. 
    - Check out http://chaijs.com/api/bdd for many many things you can test !


4. Next, we run the test, and the outcome will be:
    
    ```
    ...
    
    11 passing (841ms)
    2 failing
    
    1) App
         shows comment box:
       AssertionError: expected undefined to exist
        at Context.<anonymous> (test/components/app_test.js:18:9)
    
    2) App
         shows comment list:
       AssertionError: expected undefined to exist
        at Context.<anonymous> (test/components/app_test.js:22:9)
         
    npm ERR! code ELIFECYCLE
    npm ERR! errno 2
    npm ERR! testing-with-webpack-and-chai-mocha@1.0.0 test: `mocha --compilers js:babel-core/register --require ./test/test_helper.js --recursive ./test`
    npm ERR! Exit status 2
    npm ERR! 
    npm ERR! Failed at the testing-with-webpack-and-chai-mocha@1.0.0 test script.
    npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
    
    npm ERR! A complete log of this run can be found in:
    npm ERR!     /Users/piano/.npm/_logs/2018-06-30T14_47_30_101Z-debug.log
    >
    ```
 
5. Put back CommentList and CommentBox Components in `app.js` and all tests will again pass.

For more Unit Tests on React Components, see
- the other test files in `test/components` folder and
- this great tutorial: https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22

### <a id="chapter2a2"></a>b. Unit Testing the Redux State

As second example we'll check if our Reducer `src/reducers/comments.js` works correctly. 
We do it through test file `test/reducers/comments_test.js`:

Here are 2 things we want to test:

- Will reducer return an empty array as new state (an empty array to not to break anything) if we pass it a state of undefined?
- Will action-payload of 'new comment' really return 'new comment' as new state?

```
describe('Comments Reducer', () => {

    // in case there is a weird input, we react with the default (initial) state
    it('handles action with unknown type', () => {
    
        expect(commentReducer(undefined, {})).to.eql([]);
    });

    it('SAVE_COMMENT', () => {

        const action = { type: SAVE_COMMENT, payload: 'new comment'};
        expect(commentReducer([], action)).to.eql(['new comment']);
    });

});
```

For more Unit Tests on Redux, see
- the action creator test file `test/actions/index_test.js`
- Example: https://hackernoon.com/low-effort-high-value-integration-tests-in-redux-apps-d3a590bd9fd5
- Docs: https://redux.js.org/recipes/writing-tests

## <a id="chapter2b"></a>ii. Unit Testing with `Create React App` Starter Kit plus `Enzyme`

First install all dependencies:

```
> cd unit-testing-jest-enzyme
> npm install
```

*Note:*
`npm install` will install the `Create React App` Starter Kit plus:

- enzyme
- enzyme-adapter-react-16
- redux-mock-store

`enzyme` and `enzyme-adapter-react-16` are modules of AirBnb and recommended by Facebook. They are needed to easier mount your React Components, also enabling to connect your Redux Store.

`redux-mock-store` will be installed to give you the option to use a mock Redux Store, independent of your own Redux Store. This may make sense in some scenarios. 

When done, run the tests:

```
> npm run test
```

Jest will ask you:

```
Press `a` to run all tests, or run Jest with `--watchAll`.

Watch Usage
 › Press a to run all tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

So press `a` to run all tests, and the outcome will be:

```
 PASS  src/components/comment_box.test.js
  CommentBox
    ✓ has the correct class (36ms)
    ✓ has a text area (6ms)
    ✓ has a button (2ms)
    entering some text
      ✓ shows that text in the textarea (9ms)
      ✓ when submitted, clears the input (6ms)

 PASS  src/App.test.js
  App
    ✓ shows comment box (15ms)
    ✓ shows comment list (5ms)

 PASS  src/components/comment_list.test.js
  CommentList
    ✓ shows an LI for each comment (6ms)
    ✓ shows each comment that is provided (3ms)

 PASS  src/reducers/comments.test.js
  Comments Reducer
    ✓ handles action with unknown type (2ms)
    ✓ SAVE_COMMENT (1ms)

 PASS  src/actions/index.test.js
  actions
    saveComment
      ✓ has the correct type (3ms)
      ✓ has the correct payload (1ms)

Test Suites: 5 passed, 5 total
Tests:       13 passed, 13 total
Snapshots:   0 total
Time:        1.616s, estimated 2s
Ran all test suites.

Watch Usage: Press w to show more.
```

You are in watch mode now, which means that anytime you do a JavaScript code change in any file under root, 
the test will automatically re-run. 

If you want to see the overall coverage of files tested vs. NOT tested, add flag `--coverage` to package.json:

```
"test": "react-scripts test --env=jsdom --verbose --coverage"
```

This will create a coverage folder under root.
 
The additional output in the Terminal will look like this:

```
---------------------------|----------|----------|----------|----------|-------------------|
File                       |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
---------------------------|----------|----------|----------|----------|-------------------|
All files                  |    26.76 |     7.41 |    38.46 |    40.91 |                   |
 src                       |     1.89 |        0 |     5.88 |      3.7 |                   |
  App.js                   |      100 |      100 |      100 |      100 |                   |
  index.js                 |        0 |        0 |        0 |        0 |... 6,7,8,10,12,18 |
  registerServiceWorker.js |        0 |        0 |        0 |        0 |... 36,137,138,139 |
 src/actions               |      100 |      100 |      100 |      100 |                   |
  index.js                 |      100 |      100 |      100 |      100 |                   |
  types.js                 |      100 |      100 |      100 |      100 |                   |
 src/components            |      100 |      100 |      100 |      100 |                   |
  comment_box.js           |      100 |      100 |      100 |      100 |                   |
  comment_list.js          |      100 |      100 |      100 |      100 |                   |
 src/reducers              |      100 |      100 |      100 |      100 |                   |
  comments.js              |      100 |      100 |      100 |      100 |                   |
  index.js                 |      100 |      100 |      100 |      100 |                   |
---------------------------|----------|----------|----------|----------|-------------------|
>
```

### <a id="chapter2b1"></a>a. Unit Testing React Components

As example we will show again the Unit Test of the App Component: `src/App.test.js`

```
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

    // Use 'test' or it' (both possible) to test a single attribute of a target
    test('shows comment box', () => {

        expect(component.find('.comment-box').length).toBe(1);
    });

    test('shows comment list', () => {
        expect(component.find('.comment-list').length).toBe(1);
    });
});
```

Again, for more Unit Tests on React Components, see
- the other test files in `src/components` folder with suffix `.test.js` and
- this great tutorial: https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22

### <a id="chapter2b2"></a>b. Unit Testing the Redux State

As second example again we'll check if our Reducer `src/reducers/comments.js` works correctly. 
We do it through test file `src/reducers/comments.test.js`:


```
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
```

Again, for more Unit Tests on Redux, see
- the action creator test file `src/actions/index.test.js`
- Example: https://hackernoon.com/low-effort-high-value-integration-tests-in-redux-apps-d3a590bd9fd5
- Docs: https://redux.js.org/recipes/writing-tests

## <a id="chapter3"></a>3. Integration Tests between React Component and the Redux State

In the `CommentBox Component` and `CommentList Component` you might have discovered some Integration Tests already.
 
Let's have a look at `CommentBox Component`:

### Mocha/Chai:

```
describe('entering some text', () => {

    beforeEach(() => {
    
        component.find('textarea').simulate('change', 'new comment');
    });

    it('shows that text in the textarea', () => {
    
        expect(component.find('textarea')).to.have.value('new comment');
    });

    it('when submitted, clears the input', () => {
        
        component.simulate('submit');
        expect(component.find('textarea')).to.have.value('');
    });
});
```

### Jest/Enzyme:

```
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
```

What happens here:

1. `beforeEach(() => {})` injects the string `new comment` into the React Component's textarea BEFORE each following tests `test('...', () => {})` are executed.
    This causes an Update of the Redux State and therefore causes a Re-Render of the React Component.
2. Then we make an assertion whether the React Component got Re-Rendered as we expect within the `expect` statement. 
3. The test will either pass or fail. In our case it will pass.

So with Mocha/Chai and Jest/Enzyme we already have an Integration Test engine as we can accomplish even a full round-trip:

React Component >> Redux State >> React Component

#### Isn't that great ?!

The reasons:
- Everything in React is a Component, also the Redux Store Provider wrapped around our React Components. 
- Mocha/Chai and Jest/Enzyme render the entire React App into memory.
- Within our Node.js Setup, `jsdom` module simulates a "fake" DOM for us, to simulate (user) interactions.

Some manuals:
- https://medium.freecodecamp.org/real-integration-tests-with-react-redux-and-react-router-417125212638
- http://engineering.pivotal.io/post/react-integration-tests-with-enzyme/
- https://medium.com/homeaway-tech-blog/integration-testing-in-react-21f92a55a894


### What's next ?

Next step are End-to-end Tests. If you want to stay within Jest ecosystem, you can think of adding Puppeteer as your browser engine for testing user interactions:
- Puppeteer (Headless Chrome Node API): https://github.com/GoogleChrome/puppeteer
- Jest + Puppeteer: https://blog.logrocket.com/end-to-end-testing-react-apps-with-puppeteer-and-jest-ce2f414b4fd7

Of course there are other tools out there. Please check them out as well:
- Selenium
- TestCafé and
- Cypress 

You'll find the links in the link list below.

Happy Testing !

## <a id="chapter4"></a>4. Links

### Have a look !

Our React-Redux App: 
- Stephen Grider, Repo: https://github.com/StephenGrider/AdvancedReduxCode
- Stephen Grider, Udemy Course "Advanced React and Redux": https://www.udemy.com/react-redux-tutorial

Mocha/Chai:
- https://github.com/chaijs/chai-jquery
- http://chaijs.com/api/bdd

Jest/Enzyme:
- Jest: 
    - https://github.com/facebook/jest
    - http://jestjs.io/docs/en/expect.html#content
- Jest Snapshots (React Test Renderer):
    - https://reactjs.org/docs/test-renderer.html
    - https://github.com/facebook/react/tree/master/packages/react-test-renderer
- Enzyme: https://airbnb.io/enzyme/docs/api/
- Manuals:
    - https://www.sitepoint.com/test-react-components-jest/
    - https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests
    - https://hackernoon.com/low-effort-high-value-integration-tests-in-redux-apps-d3a590bd9fd5

Unit Tests Redux:
- Docs: https://redux.js.org/recipes/writing-tests
- Example: https://hackernoon.com/low-effort-high-value-integration-tests-in-redux-apps-d3a590bd9fd5

Unit Tests React Components:
- Example: https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22

Unit Tests General:
- https://en.wikipedia.org/wiki/Unit_testing
- https://en.wikipedia.org/wiki/List_of_unit_testing_frameworks#JavaScript
- https://hackernoon.com/testing-your-frontend-code-part-ii-unit-testing-1d05f8d50859
- https://codeutopia.net/blog/2015/03/01/unit-testing-tdd-and-bdd/
- https://en.wikipedia.org/wiki/Behavior-driven_development
- https://en.wikipedia.org/wiki/Test-driven_development

Integration Tests:
- https://hackernoon.com/testing-your-frontend-code-part-iv-integration-testing-f1f4609dc4d9
- https://github.com/jsdom/jsdom
- Manuals:
    - https://medium.freecodecamp.org/real-integration-tests-with-react-redux-and-react-router-417125212638
    - http://engineering.pivotal.io/post/react-integration-tests-with-enzyme/
    - https://medium.com/homeaway-tech-blog/integration-testing-in-react-21f92a55a894

End-2-end Tests:
- https://hackernoon.com/testing-your-frontend-code-part-iii-e2e-testing-e9261b56475
- https://medium.freecodecamp.org/why-end-to-end-testing-is-important-for-your-team-cb7eb0ec1504

End-2-end Testing Tools:
- Selenium:
    - https://www.fullstackreact.com/30-days-of-react/day-26/
    - https://www.seleniumhq.org/
- Jest + Puppeteer:
    - Puppeteer (Headless Chrome Node API): https://github.com/GoogleChrome/puppeteer
    - Jest + Puppeteer: https://blog.logrocket.com/end-to-end-testing-react-apps-with-puppeteer-and-jest-ce2f414b4fd7
- TestCafé: https://github.com/DevExpress/testcafe
- Cypress: https://www.cypress.io/

Acceptance Tests:
- https://en.wikipedia.org/wiki/Acceptance_testing

Testing General:
- https://en.wikipedia.org/wiki/Software_testing


### Credits to the authors of above links ! Thank you very much !

### And credits to the reader: Thanks for your visit !

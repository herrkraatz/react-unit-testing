import React, {Component} from 'react';
import CommentBox from './comment_box';
import CommentList from './comment_list';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src="/logo.svg" className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="Test-container">
                    <CommentBox />
                    <CommentList />
                </div>
            </div>
        );
    }
}

export default App;

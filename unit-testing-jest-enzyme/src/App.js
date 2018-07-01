import React, {Component} from 'react';
import CommentBox from './components/comment_box';
import CommentList from './components/comment_list';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
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

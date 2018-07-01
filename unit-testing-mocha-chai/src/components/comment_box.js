import React, { Component } from 'react';

// to turn a component into a container to have access to the state:
import { connect } from 'react-redux';
// imports ALL action creators and stores them in variable actions
import * as actions from '../actions';

// not exporting our component any more, but exporting a container instead:
// export default class CommentBox extends Component {
class CommentBox extends Component {
    constructor(props) {
        super(props);

        this.state = { comment: '' };
    }

    handleChange(event){
        this.setState({ comment: event.target.value });
    }

    handleSubmit(event){
        // keep the form from submitting to itself
        event.preventDefault();

        // new after having wired up the Container with the action creators
        this.props.saveComment(this.state.comment);
        this.setState({ comment: ''});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className="comment-box">
                <h4>Add a comment</h4>
                <textarea value={this.state.comment} onChange={this.handleChange.bind(this)} />
                <div>
                    <button action="submit">Submit Comment</button>
                </div>
            </form>
        )
    }
}

// to turn a component into a container, but we need no state at all ! So no mapStateToProps here !
// instead of mapDispatchToProps we insert actions here (shortcut)
// this will bind all action creators to our CommentBox under this.props (e.g. this.props.saveComment)
export default connect(null, actions)(CommentBox);
import React from 'react';

// to turn a component into a container to have access to the state:
import { connect } from 'react-redux';

const CommentList = (props) => {
    const list = props.comments.map(comment => <li key={comment}>{comment}</li>);
    return (
        <ul className="comment-list">{list}</ul>
    );
};

function mapStateToProps(state){
    return { comments: state.comments};
}

// to turn a component into a container:
export default connect(mapStateToProps)(CommentList);
import React from 'react';
import './Post.css';

class Post extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    
    render() {
        return (
            <section className="post-container">
                <h1 className="post-title">{this.props.title}</h1>
                <h3 className="post-author">{this.props.username}</h3>
                <p className="post-content">{this.props.content}</p>
            </section>
        );
    }
}

export default Post;
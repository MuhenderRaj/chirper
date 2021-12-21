import React from 'react';
import './Post.css';

class Post extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    
    render() {
        return (
            <section className="post-container">
                <h2 className="post-title">{this.props.title}</h2>
                <h3 className="post-author">{this.props.username} chirps:</h3>
                <p className="post-content">{this.props.content}</p>
            </section>
        );
    }
}

export default Post;
import logo from './logo.svg';
import Post from './components/Post';
import './App.css';
import React from 'react';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            username: "muhender",
            formTitle: "",
            formContent: "",
        };

        this.getPosts = this.getPosts.bind(this)
        this.postMessage = this.postMessage.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleContentChange = this.handleContentChange.bind(this)
    }

    componentDidMount() {
        this.interval = setInterval(
            () => {
                fetch(
                    "https://cloudflare-hiring-project.muhender.workers.dev/posts"
                ) 
                .then(res => res.json())
                .then(res => this.setState({posts: res}))
                .catch(error => console.error(error))
            }, 
            10000
        );
        
        fetch(
            "https://cloudflare-hiring-project.muhender.workers.dev/posts"
        ) 
        .then(res => res.json())
        .then(res => this.setState({posts: res}))
        .catch(error => console.error(error))
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    getPosts(posts) {
        var listOfPosts = []
        for (let i = posts.length - 1; i >= 0; i--) {
            listOfPosts.push(
                <li key={i.toString()}>
                    <Post title={posts[i].title} username={posts[i].username} content={posts[i].content} />
                </li>
            );
        }
        
        return listOfPosts;
    }

    async postMessage(event) {
        event.preventDefault()
        await fetch("https://cloudflare-hiring-project.muhender.workers.dev/posts", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username: this.state.username, title: this.state.formTitle, content: this.state.formContent}),
            }
        ).then(res => res.json())
        .then(res => this.setState({posts: res}))
        .catch(error => console.error(error))
        console.log("success")
    }
    
    handleTitleChange(event) {
        this.setState({formTitle: event.target.value})
    }
    
    handleContentChange(event) {
        this.setState({formContent: event.target.value})
    }

    render() {
        return (
            <div className="App">
                <section id="sidebar">
                   {/* TODO just to decrease chirp window width, which looks very wide and bad */}
                </section>

                <section>
                    <section id="post-chirp">
                        <h1>Chirp your thoughts!</h1>
                        <form onSubmit={this.postMessage}>
                            <input type="text" id="form-title" value={this.state.formTitle} onChange={this.handleTitleChange} />
                            {/* <input type={"text"} name={"content"} onChange={this.handleContentChange} /> */}
                            <textarea id="form-content" value={this.state.formContent} onChange={this.handleContentChange} placeholder={"chirp here"}></textarea>
                
                            <div id="submit-div">
                                <input type="submit" id="form-submit" value="Chirp" />
                            </div>
                        </form>
                    </section>
                    <section>
                        <ul>{this.getPosts(this.state.posts)}</ul>
                    </section>
                </section>

            </div>
        );
    }
}

export default App;

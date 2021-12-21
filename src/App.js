import Post from './components/Post';
import './App.css';
import React from 'react';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            username: "",
            formTitle: "",
            formContent: "",
            errorText: "",
        };

        this.setPosts = this.setPosts.bind(this)
        this.getPosts = this.getPosts.bind(this)
        this.postMessage = this.postMessage.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleContentChange = this.handleContentChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
    }
    
    getPosts() {
        fetch(
            "https://cloudflare-hiring-project.muhender.workers.dev/posts"
        ) 
        .then(res => res.json())
        .then(res => this.setState({posts: res}))
        .catch(error => console.error(error))
    }

    componentDidMount() {
        this.interval = setInterval(
            this.getPosts, 
            10000
        );
        
        this.getPosts()
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    setPosts(posts) {
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
        
        let res = await fetch("https://cloudflare-hiring-project.muhender.workers.dev/posts", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({username: this.state.username, title: this.state.formTitle, content: this.state.formContent}),
            }
        )

        let body = await res.text()
        
        if (body === "success") {
            this.getPosts()
            this.setState({errorText: "", formTitle: "", formContent: ""})
        }
        else {
            this.setState({errorText: body})
        }
    }
    
    handleNameChange(event) {
        this.setState({username: event.target.value})
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
                <header>
                    <h1>Chirper</h1>
                </header>

                <section id="main-chirps">
                    <section id="post-chirp">
                        <h2>Chirp your thoughts!</h2>
                        <form onSubmit={this.postMessage}>
                            <input type="text" id="form-title" value={this.state.formTitle} onChange={this.handleTitleChange} placeholder="title" required/>
                            {/* <input type={"text"} name={"content"} onChange={this.handleContentChange} /> */}
                            <textarea id="form-content" value={this.state.formContent} onChange={this.handleContentChange} placeholder="chirp here" required></textarea>
                            <input type="text" id="form-name" value={this.state.username} onChange={this.handleNameChange} placeholder="name" required/>

                            <p id="error">{this.state.errorText}</p>

                            <div id="submit-div">
                                <input type="submit" id="form-submit" value="Chirp" />
                            </div>
                        </form>
                    </section>
                    <section>
                        <ul>{this.setPosts(this.state.posts)}</ul>
                    </section>
                </section>
            </div>
        );
    }
}

export default App;

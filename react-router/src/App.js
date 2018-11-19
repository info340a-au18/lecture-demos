import React, { Component } from 'react';

const BLOG_POSTS = { //model for demoing
  '2018-11-18':"Still no sleep...",
  '2018-11-13':"Today I did not get any sleep either",
  '2018-11-12':"Today I did not get any sleep",
  '2018-11-11':"It was Veteran's Day. I worked.",
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {posts: []}
  }

  componentDidMount() {
    //pretend to load remotely
    this.setState({
      posts: BLOG_POSTS
    })
  }

  render() {
    let postLinks = Object.keys(this.state.posts).map((date) => {
      return (
        <li key={date}>
          <a href={'/blog/posts/'+date} className="nav-link">{date}</a>
        </li>
      )
    });

    return (
      <div className="container">
        <h1>My Blog</h1>
        <nav>
          <ul className="nav">
            <li>
              <a href='/' className="nav-link">Home</a>
            </li>
            <li>
              <a href='/about' className="nav-link">About</a>
            </li>
            <li>
              <a href='/blog' className="nav-link">Blog</a>
            </li>
            {postLinks}
          </ul>
        </nav>
        <WelcomePage />
        <AboutPage />
        <BlogPostList posts={this.state.posts} />
      </div>
    );
  }
}


class WelcomePage extends Component {
  render() {
    return (
      <p className="lead"><strong>Welcome</strong> to my blog, Where I post micro updates about whatever stuff is of interest to me</p>
    );
  }
}

class AboutPage extends Component {
  render() {
    return (
      <div>
        <h2>About</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, amet cumque. Quasi esse facilis quisquam recusandae quam deleniti suscipit, libero dolore tenetur dignissimos expedita neque repellendus accusantium mollitia, dicta id.</p>
      </div>
    );
  }
}

class BlogPostList extends Component {
  render() {
    let postItems = Object.keys(this.props.posts).map((date) => {
      return <BlogPost key={date} date={date} post={this.props.posts[date]} />
    })

    return <div>{postItems}</div>
  }
}

class BlogPost extends Component {
  render() {

    let date = this.props.date;    
    let post = this.props.post;

    return (
      <div>
        <h2>Post on {date}</h2>
        <p>{post}</p>
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';

import { Collapse, Button, CardBody, Card } from 'reactstrap';

import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';


const BLOG_POSTS = { //model for demoing
  '2018-11-18':"Still no sleep...",
  '2018-11-13':"Today I did not get any sleep either",
  '2018-11-12':"Today I did not get any sleep",
  '2018-11-11':"It was Veteran's Day. I worked.",
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {posts: [], collapse:false}
  }

  componentDidMount() {
    //pretend to load remotely
    this.setState({
      posts: BLOG_POSTS
    })
  }

  toggle = () => {
    this.setState((currentState) => {
      return { collapse: !currentState.collapse }
    });
  }

  renderBlogList = (routerProps) => {
    //return thing I want to render
    return <BlogPostList {...routerProps} posts={this.state.posts} />
  }

  render() {
    let postLinks = Object.keys(this.state.posts).map((date) => {
      return (
        <li key={date}>
          <NavLink 
            to={'/blog/posts/'+date} 
            className="nav-link" 
            activeClassName={"activeLink"}>{date}</NavLink>
        </li>
      )
    });

    return (
      <BrowserRouter >
      <div className="container">
        <h1>My Blog</h1>

          {/* code from reactstrap documentation */}
          <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
          <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
            Anim pariatur cliche reprehenderit,
             enim eiusmod high life accusamus terry richardson ad squid. Nihil
             anim keffiyeh helvetica, craft beer labore wes anderson cred
             nesciunt sapiente ea proident.
            </CardBody>
          </Card>
        </Collapse>        

        <nav>
          <ul className="nav">
            <li>
              <NavLink exact to='/' className="nav-link" activeClassName={"activeLink"}>Home</NavLink>
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

        {/* Main Content */}
        <Switch>
          <Route path="/" component={WelcomePage} />
          {/* <Route path="/" component={LoginPartial} /> */}
          <Route path="/about" component={AboutPage} />
          <Route exact path="/blog" render={this.renderBlogList} />
          <Route path="/blog/posts/:postId" component={BlogPost} />
        </Switch>
        {/* <WelcomePage />
        <AboutPage />
        <BlogPostList posts={this.state.posts} /> */}
      </div>
      </BrowserRouter>
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
    console.log(this.props)

    let postItems = Object.keys(this.props.posts).map((date) => {
      return <BlogPost key={date} date={date} post={this.props.posts[date]} />
    })

    return <div>{postItems}</div>
  }
}

class BlogPost extends Component {
  constructor(props){
    super(props);
    this.state = {post: ""}
  }

  componentDidMount() {
    if(this.props.match && this.props.match.params.postId) {
      //fetch it from server
      this.setState({post: BLOG_POSTS[this.props.match.params.postId]})
    }
  }

  render() {

    console.log(this.props)

    let date = this.props.date || this.props.match.params.postId;    
    let post = this.props.post || BLOG_POSTS[this.props.match.params.postId]; //this.state.post  

    return (
      <div>
        <h2>Post on {date}</h2>
        <p>{post}</p>
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import Post from './Post'
import { Helmet } from 'react-helmet'
import Navbar from '../Navbar'
import CreatePost from './CreatePost'
import axios from "axios";
import Alert from './Alert'
import Spinnner from './../Spinner'
import { UncontrolledCarousel } from 'reactstrap';

class ReactFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      title: '',
      text: '',
      image: '',
      posts: [],
      token: localStorage.getItem('token'),
      mostrarFlag: false,
      miPerfil:false,
      misPosts:[],
      modoEdicion: false
    }
  }

  changeHandler = event => {
    const { target } = event;
    this.setState({
      [target.id]: target.value
    });
  }

  getUserPosts = () => {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + this.state.token
      }
    }
    axios.get('https://reactcourseapi.herokuapp.com/user/', config)
      .then(response => {
        console.log(response.data)
        this.setState({misPosts: response.data.user.posts || [], username: response.data.user.username|| 'ErrorUserName'})
      })
  }

  likeHandler = id => {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + this.state.token
      }
    }
    const body ={
      _id:id
    }
    axios.put('https://reactcourseapi.herokuapp.com/post/like', body, config)
      .then(response => {
        console.log(response)
        this.fetchData()
        this.getUserPosts()
      })
      .catch(err=>{
        console.log(err)
      })

  }

  cerrarSesion = () => {
    localStorage.removeItem('token');
  }

  fetchData = () => {
    let config = {
      method: "GET",
      headers: {
        'Content-type': 'Application/json',
        authorization: `Bearer ${this.state.token}`
      }
    }

    fetch('https://reactcourseapi.herokuapp.com/post/', config)
      .then(res => res.json())
      .then(data => {
        this.setState({
          posts: data.filteredPosts || []
        })

      })
  }

  componentDidMount() {
    this.fetchData();
    this.getUserPosts();
  }

  createPost = (event) => {
    event.preventDefault();
    const { title, text, image } = this.state;
    const config = {
      headers: {
        'Authorization': 'Bearer ' + this.state.token
      }
    }
    const body ={
      title,
      text,
      image
    }
    axios.post('https://reactcourseapi.herokuapp.com/post/', body, config)
      .then(response => {
        console.log(response)
        this.setState({title:'', text:'', image:'', mostrarFlag:true})
        this.fetchData()
      })
      .catch()
  }
  deletePost = (id) => {
    const headers = {
        'Authorization': 'Bearer ' + this.state.token
    }
    const data ={
       _id:id
    }
    //console.log(body._id);
    axios.delete('https://reactcourseapi.herokuapp.com/post/', {headers, data})
      .then(response => {
        this.setState({mostrarFlag:true})
        this.fetchData()
        this.getUserPosts()
      })
      .catch(err=>{
        console.log(err)
      })
  }
  editarPost = (id) =>{
    const config = {
      headers: {
        'Authorization': 'Bearer ' + this.state.token
      }
    }
    const body ={
      _id:id,
      title: this.state.title,
      text: this.state.text,
      image: this.state.image
    }
    this.setState({modoEdicion:true})
    axios.put('https://reactcourseapi.herokuapp.com/post/', body, config)
      .then(response => {
        this.setState({modoEdicion:false})
        this.fetchData()
        this.getUserPosts()
        
      })
      .catch(err=>{
        console.log(err)
      })
  }

  postMiPerfilOTodos = (arr) =>{
    return arr.map((post) => {

      return (<Post
        key={post._id}
        name={post.user}
        likes={post.likes}
        title={post.title}
        text={post.text}
        image={post.image}
        onClick={() => this.likeHandler(post._id)}
        editarPost={()=>this.editarPost(post._id)}
        deletePost={() => this.deletePost(post._id)}
      />);

    });
  }

  render() {

    const { title, text, image,  mostrarFlag, miPerfil, modoEdicion} = this.state;
    let postsComponents=[]
    let msg=''
    if(miPerfil){
        postsComponents=this.postMiPerfilOTodos(this.state.misPosts);

        msg='Mi perfil'
    }else{
        postsComponents=this.postMiPerfilOTodos(this.state.posts);
        msg='Feed'
    }

    return (

      <div className="container">
        <Helmet>
          <title> React Feed</title>
        </Helmet>
        {mostrarFlag && <Alert msg='Su accion se realizó con exito :D. (Soy una etiqueta verde btw)' color='success'/>}
        {modoEdicion && <Alert msg='ADVERTENCIA, entrando a modo edicion' color='warning'/>}

        <Navbar clickHome={()=>this.setState({miPerfil:false})} clickPerfil={()=>this.setState({miPerfil:true})} clickCerrarSesion={() => this.cerrarSesion()} />
        <h2>¿Que estas pensando {this.state.username}?</h2>
        <CreatePost title={title} text={text} image={image} submitHandler={this.createPost} changeHandler={this.changeHandler} />
        <div  style={{textAlign:'center'}}>
        <h1 className="display-3">{msg}</h1>
        
        <Spinnner/>
        </div>
        <h2>Recent posts</h2>
        <div className="posts" style={{color:'red'}}>
          <UncontrolledCarousel items={this.state.posts.map((element,index)=>{
            return {
              header:element.user,
              caption:element.text,
              key:index,
              src:element.image
            }
          })} />;
          {/*postsComponents*/}
        </div>
      </div>
    );
  }
}

export default ReactFeed;

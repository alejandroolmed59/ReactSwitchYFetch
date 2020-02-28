import React from 'react'
import PropTypes from 'prop-types'
import { ButtonToggle } from "reactstrap";
import '../../App.css'

const Post = props => {
    return(
        <article className= "post card">
            
            <header className="card-header">
				<h3>
					{props.title}
				</h3>
				<div className='divaso'>
					<h5>Usuario: {props.name}</h5>
					<ButtonToggle className='float-right' color="warning" onClick={props.editarPost}>Editar Post</ButtonToggle>
					<ButtonToggle className='float-right' color="danger" onClick={props.deletePost}>Eliminar Post</ButtonToggle>
				</div>
			</header>
            
			<main className="card-body">
				<p>{props.text}</p>
			
				<img src = {props.image} alt = {props.name}/>
			</main>
            
			<footer className="likes card-footer">
				<span> Likes: {props.likes} </span>
                <button  type="button" className="btn btn-outline-primary" onClick = {props.onClick}>Like!</button>
            </footer>
        </article>
    );
}

Post.propTypes = {
	title: PropTypes.string,
	name: PropTypes.string,
	image: PropTypes.string,
	onClick: PropTypes.func,
	likes: PropTypes.number,
	text: PropTypes.string
}

export default Post;
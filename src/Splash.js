import React from 'react'
import {withRouter} from 'react-router-dom'

class Splash extends React.Component{
    constructor(props){
        super(props);
        this.state = ({
            loading: true
        })
    }
    componentDidMount(){
        const token=localStorage.getItem('token')
            if(token){
                this.verifyToken(token);
            }else{
                this.props.history.push('/login')
            }

    }

    verifyToken = (token) =>{
        let config={
            method: 'GET',
            headers: {
                authorization:`Bearer ${token}`
            }
        }
        fetch('https://reactcourseapi.herokuapp.com/verifytoken', config)
        .then(res =>{
            if(res.ok){
                this.setState({loading:false})
            }else{
                localStorage.removeItem('token');
                this.props.history.push('/login')
            }
        })
    }

    render(){
        const splash= (<div className="full-centered">
                            <h1>Carganding....</h1>
                        </div>);
        console.log(this.state.loading)
        return this.state.loading? splash : this.props.children;
        
    }
}

export default withRouter(Splash);
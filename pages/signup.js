import {Component} from 'react'
import withLayout from '../components/Layouts/Layout'
import Link from 'next/link'
import styles from './SignupStyle'
import axios from 'axios'
import jscookie from 'js-cookie'
import Router from 'next/router'

class Signup extends Component{

    handleInputChange=(event)=>{
        const target = event.target;
        
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        })
    }

    handleButtonClick=(event)=>{
        axios.post('http://api.pihitak.com/signup',{
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            email:this.state.email,
            password:this.state.password
        })
        .then(function(response){
            if(response.data.status == 422){
                let userInfo ={
                    access_token : response.data.access_token,
                    userId : response.data.userId,
                    loginuser : response.data.username
                }
                jscookie.set('token',userInfo);
                Router.push('/')
            }
            else{
                console.log('User Creation Failed')
            }
           
        })
        .catch(function(error){
            console.log(error);
        });
    }

    render(){
        return(
            <div className="signup-container">
                <form className="form">
                    <h1>Sign up</h1>
                    <div className="form-content">
                    <div className="inner-form-content">
                        <input id="txtFirstName" type="text" name="firstname" placeholder="First Name" onChange={this.handleInputChange}/>
                        <span className="outer-focus-symbol"></span>
                        <span className="focus-symbol" >
                            <i className="fa fa-user" aria-hidden="true"></i>
                        </span>
                    </div>  
                    <div className="inner-form-content">
                        <input id="txtLastName" type="text" name="lastname" placeholder="Last Name" onChange={this.handleInputChange}/>
                        <span className="outer-focus-symbol"></span>
                        <span className="focus-symbol" >
                            <i className="fa fa-user" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div className="inner-form-content">
                        <input id="txtEmail" type="text" name="email" placeholder="Email" onChange={this.handleInputChange}/>
                        <span className="outer-focus-symbol"></span>
                        <span className="focus-symbol" >
                            <i className="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div className="inner-form-content">
                        <input id="txtpassword" type="password" name="password" placeholder="Password" onChange={this.handleInputChange}/>
                        <span className="outer-focus-symbol"></span>
                        <span className="focus-symbol" >
                            <i className="fa fa-lock fa-lg" aria-hidden="true"></i>
                        </span>
                    </div>
                        <div className="button" onClick={this.handleButtonClick}>sign up</div>
                        <div className="loginpath">
                            Already have an account?
                            <Link href="/login">
                                <a  className="login">Sign in</a>
                            </Link>
                        </div>
                    </div>
                </form>
                <style jsx>{styles}</style>
            </div>
        )
    }
}

export default withLayout(Signup)
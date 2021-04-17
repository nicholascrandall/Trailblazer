import React, { Component } from 'react';
import {Grid, Button, Message, Header, Form, Icon} from 'semantic-ui-react'
import { Redirect } from "react-router-dom";
 
export default class UserForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
            status: 200,
            signUpSuccess: false,
            loginSuccess: false
        }
    }

    handleChange=(event)=>{
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit=()=>{
        let url = ''
        this.props.context === 'login'?
            url = this.props.baseURL + '/session/':
            url = this.props.baseURL + '/user/'
        fetch(url, {
            method:'POST',
            body: JSON.stringify(this.state),
            headers: {'Content-Type': 'application/json'}
        }).then(response => response.json())
        .then(data => {
            let signUpSuccess = data.status!==400
            let loginSuccess = data.status!==400 && this.props.context === 'login'
            // this.props.setCurrentUser(data.currentUser)
            this.setState({
                username: '',
                password: '',
                message: data.message,
                status: data.status,
                signUpSuccess: signUpSuccess,
                loginSuccess: loginSuccess
            })
        })
        .catch(err=> console.log(err))
    }

    render(){
        if (this.state.loginSuccess) {
            return <Redirect to='/event/' />
          }
        return (
            <>
            {/* Header Column*/}
            <Grid style={{ height: '100vh', width: '100vw', margin:'0', padding:'0' }} verticalAlign='middle'>
                <Grid.Column 
                    className="user-header" 
                    style={{ height: '100vh', width: '50vw', margin: '0', padding:'0', display:'flex', justifyContent:'center', alignItems:'center'}}>     
                        <Header 
                            size="huge" 
                            className="white" 
                            style={{ fontSize: '72px',  margin: '0'}}
                        >
                        Welcome to Trailblazer
                        </Header>
                        <Header as='h2' className="white">
                            Plan your next outdoor trip and find friends to go with you!
                        </Header>
                </Grid.Column> 

                {/* Form Column */}
                <Grid.Column textAlign='center' style={{ height: '100vh', width: '50vw', display: 'flex', justifyContent:'center', alignItems:'center', backgroundColor:'whitesmoke', margin:'0',  padding:'0'}} verticalAlign='middle'>
                    <Header as='h2' color='teal' size='huge' textAlign='center'>
                        {this.props.context === 'login'?
                            <> Login </>:
                            <> Sign Up </>
                            }
                    </Header>
                    <Form size='large' style={{width: '50%'}} onSubmit={(event)=>this.handleSubmit(event)}>
                            <Form.Input 
                                fluid 
                                icon='user' 
                                name='username'
                                id='username'
                                iconPosition='left' 
                                placeholder='Username' 
                                value={this.state.username}
                                onChange={(event)=>this.handleChange(event)}
                                />
                            <Form.Input
                                fluid
                                icon='lock'
                                name='password'
                                id='password'
                                iconPosition='left'
                                value={this.state.password}
                                placeholder='Password'
                                type='password'
                                onChange={(event)=>this.handleChange(event)}
                            />

                            {this.props.context === 'signup' && this.state.signUpSuccess?
                                <Message color='green'>
                                    <Icon name='check circle'/>
                                    New user created! <a href='/user/login'>Sign In!</a>
                                </Message>: null
                            }
                            {this.state.status === 400?
                                <Message color='red'>
                                    <Icon name='warning sign'/>
                                    {this.state.message}
                                </Message>: null
                            }

                            <Button color='teal' fluid size='large'>
                                {this.props.context === 'login'?
                                <> Login </>:
                                <> Sign Up </>
                                }
                            </Button>
                    </Form>
                    {/* User login Message */}
                    {this.props.context === 'login'?
                    <Message color='orange' style={{width: '50%'}}>
                        No Login? <a href='/user/new'>Sign Up!</a>
                    </Message>:null
                    }
                    {/* User Sign Up Message */}
                    {this.props.context === 'signup' && !this.state.signUpSuccess?
                    <Message color='orange' style={{width: '50%'}}>
                        Already have an account? <a href='/user/login'>Sign In!</a>
                    </Message>:null
                    }
                </Grid.Column>
            </Grid>
            </>
        )
    }
}
import React from 'react';
import {Grid, Button, Segment, Message, Header, Form} from 'semantic-ui-react'
 
export default function UserForm(props){

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
                        Plan your next outdoor trip and find friendsto go with you!
                    </Header>
            </Grid.Column> 

            {/* Form Column */}
            <Grid.Column textAlign='center' style={{ height: '100vh', width: '50vw', display: 'flex', justifyContent:'center', alignItems:'center', backgroundColor:'whitesmoke', margin:'0',  padding:'0'}} verticalAlign='middle'>
                <Header as='h2' color='teal' size='huge' textAlign='center'>
                    {props.context === 'login'?
                        <> Login </>:
                        <> Sign Up </>
                        }
                </Header>
                <Form size='large' style={{width: '50%'}}>
                    <Segment stacked>
                        <Form.Input 
                            fluid 
                            icon='user' 
                            iconPosition='left' 
                            placeholder='Username' />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />
                
                        <Button color='teal' fluid size='large'>
                            {props.context === 'login'?
                            <> Login </>:
                            <> Sign Up </>
                            }
                        </Button>
                    </Segment>
                </Form>
                <Message color='orange' style={{width: '50%'}}>
                    {props.context === 'login'?
                        <> No Login? <a href='/user/new'>Sign Up!</a> </>:
                        <> Already have an account? <a href='/user/login'>Sign In!</a></>
                    }
                </Message>
            </Grid.Column>
        </Grid>
        </>
    )
}
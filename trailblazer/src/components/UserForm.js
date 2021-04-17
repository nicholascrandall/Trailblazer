import React from 'react';
import {Grid, Button, Segment, Message, Header, Form} from 'semantic-ui-react'
 
export default function UserForm(props){

    return (
        <>
        <Grid style={{ height: '100vh', width: '100vw', margin:'0', padding:'0' }} verticalAlign='middle'>
            <Grid.Column style={{ height: '100vh', width: '50vw', margin: '0', padding:'0'}}>     
                <Header size="huge" className="user-header white" style={{ fontSize: '72px',  margin: '0'}}
                >
                    Welcome to Trailblazer
                </Header> 
            </Grid.Column> 
            <Grid.Column textAlign='center' style={{ height: '100vh', width: '50vw', display: 'flex', justifyContent:'center', alignItems:'center', backgroundColor:'whitesmoke', margin:'0',  padding:'0'}} verticalAlign='middle'>
                <Header as='h2' color='teal' size='huge' textAlign='center'>
                    Login
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
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message color='orange' style={{width: '50%'}}>
                    No Login? <a href='#'>Sign Up!</a>
                </Message>
            </Grid.Column>
        </Grid>
        </>
    )
}
import React, {Component} from 'react'
import { Grid, Modal, Icon, Image, Rail, Segment, Header} from 'semantic-ui-react'
import Events from './Events'
import EditUser from './EditUser'

class UserInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    setOpen= (bool)=>{
        this.setState({
            open: bool
        })
    }
    
    render () {
        return(
        <Grid centered columns={2} style={{minHeight:'60vh'}}>
            <Grid.Column>
            <Segment style={{border:'none', boxShadow: 'none'}}>
                <Segment>
                    <Header size='huge'>About Me</Header>
                <p>
                    {this.props.currentUser.about? this.props.currentUser.about: <>Add an about me section!</>}
                </p>
                </Segment>

                <Segment>
                    <Header size='huge'>Your Trips</Header>
                    <Header>Upcoming Trips</Header>
                    <Events profile={true} future={true} baseURL={this.props.baseURL} setEvent={this.props.setEvent} currentUser={this.props.currentUser}/>
                    <Header>Past Trips</Header>
                    <Events profile={true} past={true} baseURL={this.props.baseURL} setEvent={this.props.setEvent} currentUser={this.props.currentUser}/>
                </Segment>
                

                <Rail dividing position='left'>
                        <Segment style={{marginTop: '20px'}}>
                            <Image style={{maxWidth: '240px'}} src={this.props.currentUser.avatar} />
                            <p>Username: {this.props.currentUser.username}</p>
                            <p>Name: {this.props.currentUser.fullname? this.props.currentUser.fullname: <>Add your full name!</> }</p>
                            <Modal
                                onClose={() => this.setOpen(false)}
                                onOpen={() => this.setOpen(true)}
                                open={this.state.open}
                                trigger={<Icon name='edit'color='grey'/>}
                                header='Edit Your Information!'
                                content={<EditUser setOpen={this.setOpen} baseURL={this.props.baseURL} currentUser={this.props.currentUser} editUserInfo={this.props.editUserInfo}/>}
                                />
                        </Segment>
                </Rail>

            </Segment>
            </Grid.Column>
        </Grid>
        )
    }
}

export default UserInfo;
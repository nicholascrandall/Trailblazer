import React, {Component, createRef} from 'react'
import { Grid, Modal, Icon, Image, Rail, Segment, Header, Sticky } from 'semantic-ui-react'
import Events from './Events'
import EditUser from './EditUser'

class UserInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    
    render () {
        const contextRef = createRef()
        return(
        <Grid centered columns={2}>
            <Grid.Column>
            <Segment style={{border:'none', boxShadow: 'none'}}>
                <Segment>
                    <Header size='huge'>About Me</Header>
                <p>
                    {this.props.currentUser.about? this.props.currentUser.about: <>Add an about me section!</>}
                </p>
                <Icon name='edit' color='grey'/>
                </Segment>

                <Segment>
                    <Header size='huge'>Your Trips</Header>
                    <Header>Upcoming Trips</Header>
                    <Events profile={true} future={true} baseURL={this.props.baseURL} setEvent={this.props.setEvent} currentUser={this.props.currentUser}/>
                    <Header>Past Trips</Header>
                    <Events profile={true} past={true} baseURL={this.props.baseURL} setEvent={this.props.setEvent} currentUser={this.props.currentUser}/>
                </Segment>
                

                <Rail dividing position='left'>
                    <Sticky>
                        <Segment>
                            <Image src='https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png' />
                            <p>Username: {this.props.currentUser.username}</p>
                            <p>Name: {this.props.currentUser.fullname? this.props.currentUser.fullname: <>Add your full name!</> }</p>
                            <Modal
                                trigger={<Icon name='edit'color='grey'/>}
                                header='Edit Your Information!'
                                content={<EditUser baseURL={this.props.baseURL} currentUser={this.props.currentUser} editUserInfo={this.props.editUserInfo}/>}
                                />
                        </Segment>
                    </Sticky>
                </Rail>

            </Segment>
            </Grid.Column>
        </Grid>
        )
    }
}

export default UserInfo;
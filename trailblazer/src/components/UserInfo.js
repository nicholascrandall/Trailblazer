import React, {Component, createRef} from 'react'
import { Grid, Image, Rail, Segment, Header, Sticky } from 'semantic-ui-react'
import Events from './Events'

class UserInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {}
    }


    
    render () {
        const contextRef = createRef()
        return(
        <Grid centered columns={2}>
            <Grid.Column>
            <Segment>
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
                    <Sticky context={contextRef}>
                        <Segment>
                            <Image src='https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png' />
                            <p>Username: {this.props.currentUser.username}</p>
                            <p>Name: {this.props.currentUser.fullname? this.props.currentUser.fullname: <>Add your full name!</> }</p>
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
import React, {createRef} from 'react'
import { Grid, Image, Rail, Segment, Header, Sticky } from 'semantic-ui-react'

const UserInfo = (props) => {
    const contextRef = createRef()

    return(
    <Grid centered columns={2}>
        <Grid.Column>
        <Segment>
            <Segment>
                <Header size='huge'>About Me</Header>
            <p>
                {props.currentUser.about? props.currentUser.about: <>Add an about me section!</>}
            </p>
            </Segment>
            
            <Segment>
                <Header size='huge'>Your Trips</Header>
            </Segment>
            

            <Rail dividing position='left'>
                <Sticky context={contextRef}>
                    <Segment>
                        <Image src='https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png' />
                        <p>Username: {props.currentUser.username}</p>
                        <p>Name: {props.currentUser.fullname? props.currentUser.fullname: <>Add your full name!</> }</p>
                    </Segment>
                </Sticky>
            </Rail>

        </Segment>
        </Grid.Column>
    </Grid>
    )
}

export default UserInfo;
import {Container, Menu, Button} from 'semantic-ui-react'

export default function NavBar(props) {
  return (
    <Menu
        fixed='top'
        inverted={true}
        pointing={true}
        secondary={true}
        size='large'
        >
        <Container>
            <Menu.Item as='a' href='/'>
                Home
            </Menu.Item>
            <Menu.Item as='a' href='/event' active>Find Meetups</Menu.Item>
            {props.currentUser?
                <><Menu.Item as='a'>Your Trips</Menu.Item>
                <Menu.Item as='a'>Your Profile</Menu.Item></>: null
            }
            <Menu.Item position='right'>
                {props.currentUser?
                <>
                Welcome, {props.currentUser.username}
                <Button onClick={props.logout} as='a' href='/user/login' inverted={true} primary={false} style={{ marginLeft: '0.5em' }}>
                    Log Out
                </Button>
                </>:
                <>
                <Button as='a' href='/user/login' inverted={true}>
                    Log in
                </Button>
                <Button as='a' href='/user/new' inverted={true} primary={false} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                </Button>
                </>
                }
            </Menu.Item>
        </Container>
    </Menu>
  )
}
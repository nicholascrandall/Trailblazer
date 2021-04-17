import {Container, Menu, Button} from 'semantic-ui-react'

export default function NavBar(props) {
    console.log(props.currentUser)
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
            <Menu.Item as='a'>Your Trips</Menu.Item>
            <Menu.Item as='a'>Your Profile</Menu.Item>
            <Menu.Item position='right'>
                {props.currentUser?
                <>
                Welcome, {props.currentUser.username}
                <a href='/user/new'>
                    <Button as='a' inverted={true} primary={false} style={{ marginLeft: '0.5em' }}>
                    Log Out
                    </Button>
                </a>
                </>:
                <>
                <a href='/user/login'>
                    <Button as='a' inverted={true}>
                    Log in
                    </Button>
                </a>
                <a href='/user/new'>
                    <Button as='a' inverted={true} primary={false} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                    </Button>
                </a>
                </>
                }
            </Menu.Item>
        </Container>
    </Menu>
  )
}
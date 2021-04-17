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
            <Menu.Item as='a' active>
                Home
            </Menu.Item>
            <Menu.Item as='a'><a href='/event'>Find Meetups</a></Menu.Item>
            <Menu.Item as='a'><a href='#'>Your Trips</a></Menu.Item>
            <Menu.Item as='a'><a href='#'>Your Profile</a></Menu.Item>
            <Menu.Item position='right'>
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
            </Menu.Item>
        </Container>
    </Menu>
  )
}
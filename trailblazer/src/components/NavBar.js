import {Container, Menu, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default function NavBar(props){
    return (
        <Menu 
            className='menu'
            fixed='top'
            inverted={true}
            pointing={true}
            secondary={false}
            size='large'
            >
            <Container>
                <Link className='nav-link' to='/'>
                    <Menu.Item>Home</Menu.Item>
                </Link>

                <Link to='/event' className='nav-link'><Menu.Item>Find Meetups</Menu.Item></Link>
                {props.currentUser?
                    <>
                    <Link to='/' className='nav-link'><Menu.Item>Your Trips</Menu.Item></Link>
                    <Link to='/' className='nav-link'><Menu.Item>Your Profile</Menu.Item></Link>
                    </>: null
                }
                <Menu.Item position='right'>
                    {props.currentUser?
                    <>
                    Welcome, {props.currentUser.username}
                    <Link to='/user/login'>
                        <Button onClick={props.logout} inverted={true} primary={false} style={{ marginLeft: '0.5em' }}>
                            Log Out
                        </Button>
                    </Link>
                    </>:
                    <>
                    <Link to='/user/login'>
                        <Button inverted={true}>
                            Log in
                        </Button>
                    </Link>
                    <Link to='/user/new'>
                        <Button inverted={true} primary={false} style={{ marginLeft: '0.5em' }}>
                            Sign Up
                        </Button>
                    </Link>
                    </>
                    }
                </Menu.Item>
            </Container>
        </Menu>
    )
 }
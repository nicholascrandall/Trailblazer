import './App.css';
import {Header, Container, Menu, Button} from 'semantic-ui-react'

function App() {
  return (
    <div className="App">
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
            <Menu.Item as='a'>Find Meetups</Menu.Item>
            <Menu.Item as='a'>Your Trips</Menu.Item>
            <Menu.Item as='a'>Your Profile</Menu.Item>
            <Menu.Item position='right'>
              <Button as='a' inverted={true}>
                Log in
              </Button>
              <Button as='a' inverted={true} primary={false} style={{ marginLeft: '0.5em' }}>
                Sign Up
              </Button>
            </Menu.Item>
          </Container>
        </Menu>
      <header className="App-header">
        <Header className="white" size="huge">Trailblazers</Header>
      </header>
    </div>
  );
}

export default App;

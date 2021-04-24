import React, { Component } from 'react';
import {Segment, Container, Image} from 'semantic-ui-react'

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Segment inverted vertical style={{padding: '2em 0em' }}>
            <Container>
                <h4>2021 © Ellyn Golden and Nicholas Crandall</h4>
                <Image 
                    as='a' 
                    href="https://github.com/nicholascrandall/Trailblazer" 
                    target="_blank" 
                    src='/Github-mark.png' 
                    style={{maxWidth:'30px', display:'inline-block'}}/>
            </Container>
            </Segment>
        )
    }
}


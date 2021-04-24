import React, { Component } from 'react';
import {Segment, Grid, Header, List, Container} from 'semantic-ui-react'

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Segment inverted vertical style={{ padding: '2em 0em' }}>
            <Container>
                <h4>2021 © Ellyn Golden and Nicholas Crandall</h4>
            </Container>
            </Segment>
        )
    }
}


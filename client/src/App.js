import React, { Component } from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import InputUrl from './InputUrl';
import TableSpec from './TableSpec';
import logo from './logo.png';

class App extends Component {
  state = {
    specPhoneA: null,
    specPhoneB: null
  };

  setStateData = (key) => {
    return (val) => {
      this.setState({ [key]: val });
    }
  }

  render() {
    const { specPhoneA, specPhoneB } = this.state;
    const comparable = specPhoneA !== null && specPhoneB !== null;
    return (
      <div className='app'>
        <Container text>
          <div className='logo top-img'>
            <Image src={logo} size='medium' shape='rounded' centered />
          </div>
          <Grid>
            <Grid.Column floated='left' width={8}>
              <InputUrl setData={this.setStateData('specPhoneA')} />
            </Grid.Column>
            <Grid.Column floated='right' width={8}>
              <InputUrl setData={this.setStateData('specPhoneB')} />
            </Grid.Column>
          </Grid>
        </Container>
        {comparable && <TableSpec specPhoneA={specPhoneA} specPhoneB={specPhoneB} />}
      </div>
    );
  }
}

export default App;

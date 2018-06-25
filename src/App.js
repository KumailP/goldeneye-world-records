import React, { Component } from 'react';
import './App.css';
import MainTable from './components/MainTable';
import MainTableEditable from './components/MainTableEditable';
import TierTable from './components/TierTable';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Icon, Modal, Button, Header, Form, Input, Message } from 'semantic-ui-react';
import bcrypt from 'bcryptjs';


const color = ['white', '#32661e', '#418e23', '#4dbc21', '#b2d6a4', '#e8b2b2', '#c47f7f', '#b25555', '#772828'];

const fakeAuth = {
  isAuth: false,
  hash: '$2a$10$ZiyT3wm92ZkPIRN6YV6/8ehmH2CxtWcWRvyCXB1KKsw3X4ozLiiHW',
  authenticate(cb){
    console.log("Authenticated!");
    this.isAuth = true;
    setTimeout(cb, 100);
  },
  signout(cb){
    this.isAuth = false;
    setTimeout(cb, 100);
  }
}

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirectToReferrer: false,
      password: '',
      wrongPassword: false
    }
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({
        redirectToReferrer: true
      })
    })
  }
  handleChangeEdit = (value) => {
    this.setState({password: value});
  }
  validatePassword = () => {
    if(bcrypt.compareSync(this.state.password, fakeAuth.hash)){
      this.setState({password: ''});
      this.login();
    }
    else{
      this.setState({wrongPassword: true, password: ''})
    }
  }
  render() {
    const { redirectToReferrer } = this.state;

    if(redirectToReferrer === true) {
      return (
        <Redirect to='/edit' />
      )
    }
    return (
      <div>
        <Modal dimmer="blurring" trigger={<Button className="loginBtn" color='black' onClick={() => {this.setState({wrongPassword: false, password: ''})}}><Icon name="edit" /></Button>} basic size='small'>
          <Header icon='edit' content='Enable Editing' />
          <Modal.Content>
            
            <Form>
          <label>
            Password
            <Form.Field control={Input} value={this.state.password} type="password" onChange={(e) => this.handleChangeEdit(e.target.value)} />
           
            </label>
            {this.state.wrongPassword ? <Message negative>
    <p>Incorrect Password</p>
  </Message> : <div/>}
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' inverted onClick={this.validatePassword}>
              <Icon name='checkmark' /> Enable Editing
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}


class App extends Component {
  state = {
    key: Math.random()
  }
  renderRoot = () => {
    fakeAuth.signout();
    return <MainTable style={{flex: 1}} color={color}/>
  }
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <h1>Goldeneye Speedrun World Records</h1>
          <div className="flex-container">
            <Switch>
              <Route path="/" exact render={this.renderRoot} />
              
              <Route path="/edit" render={() => (
                fakeAuth.isAuth ? <MainTableEditable style={{flex: 1}} color={color} />
                :
                <Redirect to='/' />
              )} />
            </Switch>
            <div className="right-section">
              <TierTable style={{flex: 1}} color={color}/>
              <Login key={this.state.key} />
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

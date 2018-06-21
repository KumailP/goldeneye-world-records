import React, { Component } from 'react'
import { Table, Icon, Modal, Button, Header, Form, Input, Message } from 'semantic-ui-react'
import './MainTable.css';
import bcrypt from 'bcryptjs';
const levels = ['agent', 'secret', 'doubleo'];

export default class MainTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      records: [],
      enableEditing: false,
      password: '',
      wrongPassword: false
    }
    this.hash = '$2a$10$ZiyT3wm92ZkPIRN6YV6/8ehmH2CxtWcWRvyCXB1KKsw3X4ozLiiHW';
    
  }
  
  componentDidMount() {
    this.fetchRecords();

    this.previousValue = JSON.parse(JSON.stringify(this.state.records))
    this.originalValue = JSON.parse(JSON.stringify(this.state.records))
  }
  getIcon = (tierStr) => {
    let tier = parseInt(tierStr, 10);
    return <Icon name='star' style={{color: this.props.color[tier]}}/>
  }

  fetchRecords = () => {
    fetch("/get-records")
      .then(response => response.json())
      .then(json => {
        this.setState({
          records: json
        });
      });
  }
  
  handleChange = (value, record, level, label) => {
    let recordsCopy = JSON.parse(JSON.stringify(this.state.records));
    record[level].time = value;

    recordsCopy[label] = record;

    this.setState({
      records: JSON.parse(JSON.stringify(recordsCopy))
    })
  }

  handleChangeSelect = (e, record, level, label) => {
    let recordsCopy = JSON.parse(JSON.stringify(this.state.records));

    record[level].tier = e.target.value;
    recordsCopy[label] = record;

    this.setState({
      records: JSON.parse(JSON.stringify(recordsCopy))
    })
  }

  handleChangeEdit = (value) => {
    this.setState({password: value});
  }

  savePrevious = () => {
    this.previousValue = JSON.parse(JSON.stringify(this.state.records))
  }

  restorePrevious = () => {
    this.setState({
      records: JSON.parse(JSON.stringify(this.previousValue))
    })
  }
  
  sendRecords = () => {
    fetch('/save-records', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.records)
    })
  }

  saveRecords = () => {
    this.sendRecords();
    this.fetchRecords();
    this.setState({enableEditing: false});
  }

  validatePassword = () => {
    if(bcrypt.compareSync(this.state.password, this.hash)){
      this.setState({enableEditing: true, password: ''});
    }
    else{
      this.setState({wrongPassword: true, password: ''})
    }
  }

  render() {

    var tierOptions = [];
    for(let i=1; i<9; i++){
      tierOptions.push(<option key={i} value={i}>{i}</option>)
    }

    return (
      <div>
        <Table celled inverted selectable fixed compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Stage</Table.HeaderCell>
              <Table.HeaderCell>Agent</Table.HeaderCell>
              <Table.HeaderCell>Secret Agent</Table.HeaderCell>
              <Table.HeaderCell>00 Agent</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
          {this.state.enableEditing ? 
          this.state.records.map((record, label) => {

            return (
                <Table.Row key={label}>
                  <Table.Cell style={{color: 'gold', fontWeight: 'bold'}}>{record.stage}</Table.Cell>


                  {levels.map((val, i) => {
                  return (<Modal dimmer="blurring" key={i}
                  trigger={<Table.Cell selectable className="cellStyle"
                   onClick={this.savePrevious}>{record[val].time} {this.getIcon(record[val].tier)}</Table.Cell>}
                   basic size='small'>
                    <Header icon='edit' content='Edit Record' />
                    <Modal.Content>
                      <p>
                        {record.stage} - {val.charAt(0).toUpperCase() + val.slice(1)} Time
                      </p>
                      <Form>
                        <label>
                          Time
                          <Form.Field control={Input} value={record[val].time} onChange={(e) => this.handleChange(e.target.value, record, val, label)} />
                          </label>
                       
                        
                        <label>
                          Tier
                      <select value={record[val].tier} onChange={(e) => this.handleChangeSelect(e, record, val, label)}>
                        
                        {tierOptions}
                      </select>
                      </label>
                      </Form>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button basic color='red' inverted onClick={this.restorePrevious}>
                        <Icon name='remove' /> RESET
                      </Button>
                    </Modal.Actions>
                  </Modal>
                  )})}

                </Table.Row>
            )
          })
          :
          this.state.records.map((record, label) => {
            return (
                <Table.Row key={label}>
                  <Table.Cell style={{color: 'gold', fontWeight: 'bold'}}>{record.stage}</Table.Cell>
                  {levels.map((val, i) => {
                    return <Table.Cell key={i}>{record[val].time} {this.getIcon(record[val].tier)}</Table.Cell>
                  })}
                </Table.Row>
            )
          })
          }
          </Table.Body>
          
        </Table>
        
        {this.state.enableEditing ? 
        <div><Button floated='left' color='black' onClick={() => this.setState({enableEditing: false, records: this.originalValue})}><Icon name="cancel" /> Cancel</Button>
        <Button floated='right' color='black' onClick={this.saveRecords}><Icon name="save" /> Save</Button></div>
        :
        <div>
          <Modal dimmer="blurring" trigger={<Button floated='left' color='black' onClick={() => {this.setState({wrongPassword: false, password: ''})}}><Icon name="edit" /> Edit</Button>} basic size='small'>
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
        }
        </div>
    )
  }
}

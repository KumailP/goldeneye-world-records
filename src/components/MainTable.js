import React, { Component } from 'react'
import { Table, Icon, Modal, Button, Header, Form, Input } from 'semantic-ui-react'
import records from '../tabledata/records'
import './MainTable.css';
const color = ['white', '#32661e', '#418e23', '#4dbc21', '#b2d6a4', '#e8b2b2', '#c47f7f', '#b25555', '#772828'];
const levels = ['agent', 'secret', 'doubleo'];

export default class MainTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      records: [],
      enableEditing: true
    }
  }
  
  componentDidMount() {
    this.setState({records: records})
    this.previousValue = JSON.parse(JSON.stringify(records))
  }
  getIcon = (tierStr) => {
    let tier = parseInt(tierStr, 10);
    return <Icon name='star' style={{color: color[tier]}}/>
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

  savePrevious = () => {
    this.previousValue = JSON.parse(JSON.stringify(this.state.records))
  }

  restorePrevious = () => {
    this.setState({
      records: JSON.parse(JSON.stringify(this.previousValue))
    })
  }

  saveRecords = () => {

    // send this.state.records to express backend which saves it to file :)



  //   fs.writeFile("../tabledata/records.json", this.state.records, 'utf8', function (err) {
  //     if (err) {
  //         return console.log(err);
  //     }
  
  //     console.log("The file was saved!");
  // }); 
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
        <div><Button floated='left' color='black' onClick={() => this.setState({enableEditing: false})}>Back</Button>
        <Button floated='right' color='black' onClick={this.saveRecords}>Save Records</Button></div>
        : 
        <Button floated='right' color='black' onClick={() => this.setState({enableEditing: true})}>Edit</Button>}
        </div>
    )
  }
}

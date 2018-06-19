import React, { Component } from 'react'
import { Table, Icon, Modal, Button, Header, Form, Input } from 'semantic-ui-react'
import records from '../tabledata/records'

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
                  return (<Modal dimmer="blurring" 
                  trigger={<Table.Cell selectable 
                   ><a href="#" onClick={this.savePrevious}>{record[val].time} {this.getIcon(record[val].tier)}</a></Table.Cell>}
                   basic size='small'>
                    <Header icon='edit' content='Edit Record' />
                    <Modal.Content>
                      <p>
                        {record.stage} - Agent Time
                      </p>
                      <Form>
                        <label>
                          Time
                          <Form.Field control={Input} value={record[val].time} onChange={(e) => this.handleChange(e.target.value, record, "agent", label)} />
                          </label>
                       
                        
                        <label>
                          Tier
                      <select value={record[val].tier} onChange={(e) => this.handleChangeSelect(e, record, "agent", label)}>
                        
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
                    return <Table.Cell>{record[val].time} {this.getIcon(record[val].tier)}</Table.Cell>
                  })}
                </Table.Row>
            )
          })
          }
          </Table.Body>
          
        </Table>
        
        </div>
    )
  }
}

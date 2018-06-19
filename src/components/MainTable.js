import React, { Component } from 'react'
import { Table, Icon, Modal, Button, Header, Form, Input, Select } from 'semantic-ui-react'
import records from '../tabledata/records'

const color = ['white', '#32661e', '#418e23', '#4dbc21', '#b2d6a4', '#e8b2b2', '#c47f7f', '#b25555', '#772828'];

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

    record[level].time = value;

    this.setState({
      records: [...this.state.records, record]
    })
  }

  handleChangeSelect = (value, record, level) => {

    console.log(value);

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
    const tierOptions = [
      { key: '1', text: '1', value: '1' },
      { key: '2', text: '2', value: '2' },
      { key: '3', text: '3', value: '3' },
      { key: '4', text: '4', value: '4' },
      { key: '5', text: '5', value: '5' },
      { key: '6', text: '6', value: '6' },
      { key: '7', text: '7', value: '7' },
      { key: '8', text: '8', value: '8' }
    ]

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


                  <Modal dimmer="blurring" 
                  trigger={<Table.Cell selectable 
                   ><a href="#" onClick={this.savePrevious}>{record.agent.time} {this.getIcon(record.agent.tier)}</a></Table.Cell>}
                   basic size='small'>
                    <Header icon='edit' content='Edit Record' />
                    <Modal.Content>
                      <p>
                        {record.stage} - Agent Time
                      </p>
                      <Form>
                        <Form.Group widths='equal'>
                          <Form.Field control={Input} label='Time' value={record.agent.time} onChange={(e) => this.handleChange(e.target.value, record, "agent", label)} />
                          
                        </Form.Group>
                        <Form.Group widths='equal'>
                        <Form.Field control={Select} label='Tier' options={tierOptions} value={record.agent.tier} onChange={(e) => this.handleChangeSelect(e.target.value, record, "agent")}/>
                        </Form.Group>
                      </Form>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button basic color='red' inverted onClick={this.restorePrevious}>
                        <Icon name='remove' /> RESET
                      </Button>
                    </Modal.Actions>
                  </Modal>

                  <Modal dimmer="blurring" 
                  trigger={<Table.Cell selectable 
                   ><a href="#" onClick={this.savePrevious}>{record.secret.time} {this.getIcon(record.secret.tier)}</a></Table.Cell>}
                   basic size='small'>
                    <Header icon='edit' content='Edit Record' />
                    <Modal.Content>
                      <p>
                        {record.stage} - Secret Agent Time
                      </p>
                      <Form>
                        <Form.Group widths='equal'>
                          <Form.Field control={Input} label='Time' value={record.secret.time} onChange={(e) => this.handleChange(e.target.value, record, "secret", label)} />
                          
                        </Form.Group>
                        <Form.Group widths='equal'>
                        <Form.Field control={Select} label='Tier' options={tierOptions} value={record.secret.tier} />
                        </Form.Group>
                      </Form>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button basic color='red' inverted onClick={this.restorePrevious}>
                        <Icon name='remove' /> RESET
                      </Button>
                    </Modal.Actions>
                  </Modal>

                  <Modal dimmer="blurring" 
                  trigger={<Table.Cell selectable 
                   ><a href="#" onClick={this.savePrevious}>{record.doubleo.time} {this.getIcon(record.doubleo.tier)}</a></Table.Cell>}
                   basic size='small'>
                    <Header icon='edit' content='Edit Record' />
                    <Modal.Content>
                      <p>
                        {record.stage} - 00 Agent Time
                      </p>
                      <Form>
                        <Form.Group widths='equal'>
                          <Form.Field control={Input} label='Time' value={record.doubleo.time} onChange={(e) => this.handleChange(e.target.value, record, "doubleo", label)} />
                          
                        </Form.Group>
                        <Form.Group widths='equal'>
                        <Form.Field control={Select} label='Tier' options={tierOptions} value={record.doubleo.tier} />
                        </Form.Group>
                      </Form>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button basic color='red' inverted onClick={this.restorePrevious}>
                        <Icon name='remove' /> RESET
                      </Button>
                    </Modal.Actions>
                  </Modal>




                </Table.Row>
            )
          })
          :
          this.state.records.map((record, label) => {
            return (
                <Table.Row key={label}>
                  <Table.Cell style={{color: 'gold', fontWeight: 'bold'}}>{record.stage}</Table.Cell>

                  <Table.Cell>{record.agent.time} {this.getIcon(record.agent.tier)}</Table.Cell>
                  <Table.Cell>{record.secret.time} {this.getIcon(record.secret.tier)}</Table.Cell>
                  <Table.Cell>{record.doubleo.time} {this.getIcon(record.doubleo.tier)}</Table.Cell>
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

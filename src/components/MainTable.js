import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import records from '../tabledata/records'

export default class MainTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      records: []
    }
  }
  componentDidMount() {
    this.setState({records: records})
  }
  render() {
    return (
      <div>
        <Table celled inverted selectable fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Stage</Table.HeaderCell>
              <Table.HeaderCell>Agent</Table.HeaderCell>
              <Table.HeaderCell>Secret Agent</Table.HeaderCell>
              <Table.HeaderCell>00 Agent</Table.HeaderCell>
            </Table.Row>
          </Table.Header>


              <Table.Body>
          {this.state.records.map((record, label) => {
            return (
                <Table.Row key={label}>
                  <Table.Cell>{record.stage}</Table.Cell>
                  <Table.Cell>{record.agent.time}</Table.Cell>
                  <Table.Cell>{record.secret.time}</Table.Cell>
                  <Table.Cell>{record.doubleo.time}</Table.Cell>
                </Table.Row>
            )
          })}
          </Table.Body>

          
        </Table>
      </div>
    )
  }
}

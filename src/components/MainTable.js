import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react';
import './MainTable.css';
const levels = ['agent', 'secret', 'doubleo'];

export default class MainTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      records: []
    }
  }
  
  componentDidMount() {
    this.fetchRecords();

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
      this.previousValue = JSON.parse(JSON.stringify(this.state.records))
      this.originalValue = JSON.parse(JSON.stringify(this.state.records))
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
          {
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
        
        
        
        </div>
    )
  }
}

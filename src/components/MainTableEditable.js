import React, { Component } from 'react'
import { Table, Icon, Modal, Button, Header, Form, Input, Rating} from 'semantic-ui-react'
import './MainTable.css';
import { Link } from 'react-router-dom';

const levels = ['agent', 'secret', 'doubleo'];

export default class MainTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      records: []
    }
  }
  
  componentDidMount() {
    this.title = document.title;
    document.title = "Goldeneye WRs - Edit";
    this.fetchRecords();
  }
  componentWillUnmount() {
      document.title = this.title;
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
  
  handleChange = (value, record, level, label) => {
    let recordsCopy = JSON.parse(JSON.stringify(this.state.records));
    record[level].time = value;

    recordsCopy[label] = record;

    this.setState({
      records: JSON.parse(JSON.stringify(recordsCopy))
    })
  }


  handleRate = (e, rating, record, level, label) => {
    let recordsCopy = JSON.parse(JSON.stringify(this.state.records));

    record[level].tier = rating;
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
                    let agentType;
                    if(val==='agent') agentType = 'Agent';
                    else if(val==='secret') agentType = 'Secret Agent';
                    else if(val==='doubleo') agentType = '00 Agent';
                  return (<Modal dimmer="blurring" key={i}
                  trigger={<Table.Cell selectable className="cellStyle"
                   onClick={this.savePrevious}>{record[val].time} {this.getIcon(record[val].tier)}</Table.Cell>}
                   size='mini'>
                    <Header icon='edit' content='Edit Record' />
                    <Modal.Content>
                      <p>
                        {record.stage} - {agentType}
                      </p>
                      <Form>
                        <label>
                          Time
                          <Form.Field control={Input} value={record[val].time} onChange={(e) => this.handleChange(e.target.value, record, val, label)} />
                          </label>
                       <br/>
                        <label>
                          Tier
                      <Rating icon='star' size='huge' rating={record[val].tier} maxRating={8} onRate={(e, {rating}) => this.handleRate(e, rating, record, val, label)}/>

                      </label>
                      </Form>
                    </Modal.Content>
                    <Modal.Actions>
                      <div className="modalBtn">
                        <div className="centerFlex"></div>
                        <Button color='red' inverted onClick={this.restorePrevious}>
                          <Icon name='remove' /> RESET
                        </Button>
                      </div>
                    </Modal.Actions>
                  </Modal>
                  )})}

                </Table.Row>
            )
          })
          
          }
          </Table.Body>
          
        </Table>
        
        <div>
            <Link to="/"><Button floated='left' color='black' onClick={() => this.setState({records: this.originalValue})}><Icon name="cancel" /> Cancel</Button></Link>
            <Link to="/"><Button floated='right' color='black' onClick={this.saveRecords}><Icon name="save" /> Save</Button></Link>
        </div>
        
        </div>
    )
  }
}

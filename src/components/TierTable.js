import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

export default class TierTable extends React.Component {
  render() {
    var tiers = [];
    for(let i=1; i<9; i++){
      tiers.push(<Table.Row key={i}>
                    <Table.Cell>{i}</Table.Cell>
                    <Table.Cell><Icon name='star' style={{color: this.props.color[i]}}/></Table.Cell>
                </Table.Row>)
    }
    return (
      <div>
        <Table celled inverted selectable compact>
            <Table.Header fullWidth>
            <Table.Row>
                <Table.HeaderCell colSpan='2'>Tier</Table.HeaderCell>
            </Table.Row>
            </Table.Header>

            <Table.Body>
                {tiers}
            
            </Table.Body>
        </Table>
      </div>
    )
  }
}

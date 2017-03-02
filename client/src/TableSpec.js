import React from 'react';
import { Container, Table, Image } from 'semantic-ui-react';
import { combineSpec } from './utils';

export default function TableSpec({ specPhoneA, specPhoneB }) {
  const specs = combineSpec(specPhoneA, specPhoneB);
  const name = specs.find(({ title }) => title === 'Name');
  const image = specs.find(({ title }) => title === 'Image');
  return (
    <Container>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Specs</Table.HeaderCell>
            <Table.HeaderCell>{name.valueA}</Table.HeaderCell>
            <Table.HeaderCell>{name.valueB}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Hình ảnh</Table.Cell>
            <Table.Cell><Image src={image.valueA} /></Table.Cell>
            <Table.Cell><Image src={image.valueB} /></Table.Cell>
          </Table.Row>
          {specs.map((info, index) => {
            if (info.title === 'Name' || info.title === 'Image') {
              return null;
            }
            return (
              <Table.Row key={index}>
                <Table.Cell>{info.title}</Table.Cell>
                <Table.Cell>{info.valueA}</Table.Cell>
                <Table.Cell>{info.valueB}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Container>
  );
}

import React, { useContext } from 'react';
import AppContext from '../../store/AppContext';
import { Button } from "shards-react";
import { MDBDataTable } from 'mdbreact';

const columnsConfig = [
  {
    label: 'Id',
    field: 'id',
    sort: 'asc',
    width: 50
  },
  {
    label: 'Name',
    field: 'name',
    sort: 'asc',
    width: 150
  },
  {
    label: 'Commercial Name',
    field: 'commercialName',
    sort: 'asc',
    width: 270
  },
  {
    label: 'Type',
    field: 'type',
    sort: 'asc',
    width: 200
  },
  {
    label: 'Document Number',
    field: 'documentNumber',
    sort: 'asc',
    width: 100
  },
  {
    label: 'Actions',
    field: 'actions',
    width: 50,
    sortable: false
  }
];

const Foo: React.FC = () => {
  const { toggleSidebar } = useContext(AppContext);

  return <MDBDataTable
    className="table-responsive-md"
    striped
    bordered
    hover
    data={{
      columns: columnsConfig,
      data: []
    }}
  />
}

export default Foo;
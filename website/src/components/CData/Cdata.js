import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import "./Cdata.css"
import art from '../../data'

const columns = [
  { field: 'Title', headerName: 'Titre', width: 100 },
  { field: 'Content', headerName: 'Contenu', width: 200 },
  { field: 'Language', headerName: 'LANGUE', width: 130 },
  { field: 'Tags', headerName: 'TAGS', width: 90 },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function createRow() {
    var row = [] 

    return row
}

export default function DataTable() {
  return (
    <div className="table">
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
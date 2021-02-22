import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import art from '../../data'

const columns = [
  { field: 'Title', headerName: 'Title', width: 600 , height: 300},
  { field: 'Content', headerName: 'Content', width: 800, height: 300 },
  { field: 'Language', headerName: 'Language', width: 200, height: 300 },
  { field: 'Tags', headerName: 'Tags', width: 200, height: 300},
];



function createRow() {
    var row = [] 
    var list = []
    var i = 0
    while (i < art.articles.length) {
        list = {
            id: i + 1,
            Title: art.articles[i].Title,
            Content: art.articles[i].Content,
            Language: art.articles[i].Language,
            Tags: art.articles[i].Tags
        }
        row.push(list)
        i = i + 1
    }
    return row
}

const rows = createRow()

export default function DataTable() {
  return (
    <div style={{ height: 750, width: '100%' }}>
        <InputGroup className="mb-3">
            <FormControl type="text" placeholder="Search"/>
            <InputGroup.Append>
                <Button variant="dark">Search</Button>
            </InputGroup.Append>
        </InputGroup>
        <br/>
        <DataGrid rows={rows} columns={columns} pageSize={15}/>
    </div>
  );
}
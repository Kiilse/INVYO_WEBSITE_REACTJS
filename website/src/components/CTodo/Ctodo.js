import React, { Component }from 'react';
import moment from 'moment';
import uuid from 'uuid';
import {prints, Donotprint, isprintable} from "../../utils"

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';


import "./Ctodo.css"

class Todo extends Component {
    constructor(props) {
        super(props);

        this.input=React.createRef() 
        this.description=React.createRef() 
        this.endDate=React.createRef()       
        this.state = {
            list: [],
            print: false
        }
    }
    addtask=() => {
        const Items={
            if:uuid.v4(),
            value: this.input.current.value,
            Date: new Date().toUTCString(),
            description: this.description.current.value,
            endDate: this.endDate.current.value,
            states: "On going"
        };

        if (localStorage.getItem('list')==null) {
            const list=[]
            list.push(Items);
            localStorage.setItem('list',JSON.stringify(list))
        } else {
            const list=JSON.parse(localStorage.getItem('list'))
            list.push(Items);
            localStorage.setItem('list',JSON.stringify(list))
        }
        this.setState({
            list:JSON.parse(localStorage.getItem('list'))
        });
        window.location.reload();
    }


    componentDidMount() {
        const list= window.localStorage.getItem('list');
        const parsedList = JSON.parse(list);
        var i = 0
        var date = moment()
        const now = moment()

        if (list==null) {
            return false
        } else if (isprintable()===false){
            while (i < parsedList.length) {
                date = moment(parsedList[i].endDate)
                if (date.isAfter(now)) {
                    console.log("isAfter")
                } else {
                    parsedList.splice(i, 1)
                    i = i - 1
                }
                i = i + 1;
            }
            this.setState({
                list: parsedList,
            })
        } else {
            while (i < parsedList.length) {
                date = moment(parsedList[i].endDate)
                if (date.isAfter(now)) {
                    console.log("isAfter")
                } else {
                    console.log(parsedList[i].states)
                    parsedList[i].states = "End"
                }
                i = i + 1;
            }
            this.setState({
                list: parsedList,
            })
        }
    }

    deleteItem=(event)=> {
        let index = event.target.getAttribute('data-key')
        let listValue= JSON.parse(localStorage.getItem('list'))
        listValue.splice(index, 1)
        this.setState({list:listValue})
        localStorage.setItem('list',JSON.stringify(listValue))
    }

    changePrint=()=> {
        console.log(isprintable)
        if (isprintable() === true) {
            Donotprint()
        } else {
            prints()
        }
        window.location.reload();
    }
    
    render () {
        return (
            <div className="forms">
                <div className="card-1">
                    <Card>
                        <Card.Body>
                            <Card.Title>Todo</Card.Title>
                            <FormControl type="text" placeholder="Task Name" ref={this.input} />
                            <br/>
                            <FormControl type="text" placeholder="Task Description" ref={this.description}/>
                            <br/>
                            <FormControl type="date" placeholder="Task ending" ref={this.endDate}/>
                            <br/>
                            <Button variant="dark" onClick={this.addtask} >Add</Button> {'    '}
                            <Button variant="dark" onClick={this.changePrint}> Change Print</Button>
                        </Card.Body>
                    </Card>
                </div>
                { 
                    this.state.list.map((item,index)=> {
                        return(
                            <div className="card-2">
                                <Card>
                                    <Card.Text></Card.Text>
                                        <ListGroup key={item.id}> {item.value}
                                        <ListGroup.Item>{item.description}</ListGroup.Item>
                                        <ListGroup.Item> This task end on {item.endDate}</ListGroup.Item>
                                        <ListGroup.Item>{item.states}</ListGroup.Item>
                                        <ListGroup.Item>{item.Date}</ListGroup.Item>
                                    </ListGroup>
                                    <Button  variant="dark" size="lg" type="button" value="delete" data-key={index} >
                                        Edit
                                    </Button> {' '}
                                    <Button  variant="dark" size="lg" type="button" value="delete" data-key={index} onClick={(e) => {if (window.confirm('Are you sure you wish to delete this item?')) this.deleteItem(e)}}>
                                        Delete
                                    </Button>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}

export default Todo
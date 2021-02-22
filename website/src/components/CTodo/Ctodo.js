import React, { Component }from 'react';
import moment from 'moment';
import uuid from 'uuid';
import {prints, Donotprint, isprintable} from "../../utils"

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
            <div className="main-container">
                <h1>Todo app</h1>
                <hr/>
                <div className="container">
                    <input type="text" placeholder="Task Name" ref={this.input}/>
                    <input type="text" placeholder="Task Description" ref={this.description}/>
                    <input type="date" placeholder="Task ending" ref={this.endDate}/>
                    <button onClick={this.addtask} className="button">Add</button>
                    <button onClick={this.changePrint}> Change Print</button>
                    <ol>
                        {
                            this.state.list.map((item,index)=>
                            {
                                return(<li key={item.id}> {item.value}
                                    <p>{item.description}</p>
                                    <p> This task end on {item.endDate}</p>
                                    <p>{item.states}</p>
                                    <p>{item.Date}</p>
                                    <button className="button" type="button" value="delete" data-key={index}>
                                        Edit
                                    </button>
                                    <button className="button" type="button" value="delete" data-key={index} onClick={(e) => {if (window.confirm('Are you sure you wish to delete this item?')) this.deleteItem(e)}}>
                                        Delete
                                    </button>
                                </li>)
                            })
                        }
                    </ol>
                </div>
            </div>
        )
    }

}

export default Todo
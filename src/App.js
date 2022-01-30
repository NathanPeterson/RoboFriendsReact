import React from "react";
import SearchBox from './SearchBox'
import CardList from './CardList'
import Scroll from './Scroll'

//Grab Data from file
//import { robots } from './robots'

import './App.css'

class App extends React.Component {
    constructor(){
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        //Grab from file
        //this.setState({ robots: robots})

        //Grab from API
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {this.setState({robots: users})})
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }

    render (){
        const filteredRobots = this.state.robots.filter(robots => {
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })

        if(this.state.robots.length === 0){
            return <h1 className="tc">Loading . . .</h1>
        }else{
            return (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <CardList robots={filteredRobots}/>
                    </Scroll>
                </div>
            )
        }        
    }    
}

export default App 
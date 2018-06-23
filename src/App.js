import React from 'react'
import {Route, NavLink, Switch} from 'react-router-dom'
import './index.css'
import Home from './Components/Home'
import Info from './Components/Info'
import Skills from './Components/Skills'
import Portfolio from './Components/Portfolio'
import NotFound from './Components/NotFound'


class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            info: {},
            skills: [],
            portfolio: {}
        }
    }
    
    saveData = (data, section) => {
        this.setState({
            [section]: data
        })
    }

    render(){
        console.log(this.state)
        return(
            <div className="App">
                <header className="App-header">
                    <nav>
                        <li><NavLink exact activeStyle={{color: 'pink'}} style={{color: 'white', textDecoration: 'none'}} to='/'>Home</NavLink></li>
                        <li><NavLink exact activeStyle={{color: 'pink'}} style={{color: 'white', textDecoration: 'none'}} to='/info'>Personal Information</NavLink></li>
                        <li><NavLink exact activeStyle={{color: 'pink'}} style={{color: 'white', textDecoration: 'none'}} to='/skills' >Skill and Location</NavLink></li>
                        <li><NavLink exact activeStyle={{color: 'pink'}} style={{color: 'white', textDecoration: 'none'}} to='/portfolio'>Portfolio</NavLink></li>
                    </nav>
                </header>
                <main>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/info' render={props => <Info section='info' personal={this.saveData} {...props} />} />
                        <Route exact path='/skills' render={props => <Skills section='skills' skills={this.saveData} {...props} />} />
                        <Route exact path='/portfolio' render={props => <Portfolio section='portfolio' portfolios={this.saveData} {...props} />} />
                        <Route component = {NotFound} />
                    </Switch>
                </main>
                <footer>
                    <p>By React Form</p>
                </footer>
            </div> 
      )
    }
}

export default App
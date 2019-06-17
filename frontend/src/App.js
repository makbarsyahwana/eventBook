import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import Login from './container/Login'
import Event from './container/Event'
import makeEvent from './container/Event/makeEvent'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'



class App extends Component {
  constructor(props){
    super(props)
    this.store = createStore(reducers)
    this.state = {
      tokenAuth: localStorage.getItem('token')
    }
  }

  render(){
    console.log(this.state.tokenAuth)
    return(
      <Provider store={this.store}>
        <BrowserRouter>
        <ToastContainer />
        { localStorage.getItem('token') ? (
          <Switch>
            <Route exact path='/event' name='Event Page' component={Event} />
            <Route path='/event/create' name='Create event page' component={makeEvent} />
            <Redirect from='/' to='/event' />
          </Switch>
        ) : (
          <Switch>
            <Route path='/login' name='Login Page' component={Login} />
            <Redirect from='/' to='/login' />
          </Switch>
        )
        }
        </BrowserRouter>
      </Provider>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
//}

export default App;

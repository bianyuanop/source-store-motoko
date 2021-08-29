import { store } from "../../declarations/store";
import * as React from "react";
import { render } from 'react-dom';
import { Button, Container, Box, IconButton } from "../../../node_modules/@material-ui/core/index";
import Admin from "./components/Admin";
import Root from "./components/Root";
import Merchant from "./components/Merchant";
import Query from "./components/Query";
import About from "./components/About";

import { Home, Storefront, SupervisorAccount, AccountCircle } from "../../../node_modules/@material-ui/icons/index";

import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

const App = () => {
  return (
      <Box
      display='flex'
      flexDirection='column'
      minHeight='100vh'
      width='100%'
      style={{
        background: 'linear-gradient(67deg, rgba(13,25,44,1) 0%, rgba(57,34,62,1) 100%)'
      }}
      >

        <Box className='navbar'>
          <IconButton onClick={()=>{
            window.location = '/';
          }}>
            <Home color='primary' />
          </IconButton>
          <IconButton onClick={()=>{
            window.location = '/#/merchant';
          }}>
            <Storefront color='primary' />
          </IconButton>
          <IconButton onClick={()=>{
            window.location = '/#/admin';
          }}>
            <AccountCircle color='primary' />
          </IconButton>
          <IconButton onClick={()=>{
            window.location = '/#/root';
          }}>
            <SupervisorAccount color='primary' />
          </IconButton>
        </Box>


        <Router>
          <Switch>
            <Route exact path='/'>
              <About />
            </Route>
            <Route path='/admin'>
              <Admin />
            </Route>
            <Route path='/root'>
              <Root />
            </Route>
            <Route path='/merchant'>
              <Merchant />
            </Route>
            <Route path='/query/:id'>
              <Query />
            </Route>
          </Switch>
        </Router>
      </Box>

      
      
  )
};

render(<App />, document.getElementById('app'));
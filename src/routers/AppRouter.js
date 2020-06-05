import React from 'react';
import {Component} from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import createHistory from 'history/createBrowserHistory';


export const history = createHistory();

class AppRouter extends Component {

  componentDidMount() {
    document.title = "Invoice Generator";
  }

  render() {
    return (      
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/" component={Dashboard} exact={true} />
            </Switch>
          </div>
        </Router>
    );
  }
}
  
export default AppRouter;

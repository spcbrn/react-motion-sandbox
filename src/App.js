import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import StaggeredStyledComp from './components/StaggeredStyledComp';
import StaggeredCSS from './components/StaggeredCSS';
import MotionStyledComp from './components/MotionStyledComp';
import MotionCSS from './components/MotionCSS';

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>React Motion - Basic Transitions</h1>
        <ul>
          <Link to="/stagger1"><li>Staggered Transition (styled components)</li></Link>
          <Link to="/stagger2"><li>Staggered Transition (css/custom styling)</li></Link>
          <Link to="/motion1"><li>Slide Transition (styled components)</li></Link>
          <Link to="/motion2"><li>Slide Transition (css/custom styling)</li></Link>
        </ul>
        <Switch>
          <Route path="/stagger1" component={StaggeredStyledComp} />
          <Route path="/stagger2" component={StaggeredCSS} />
          <Route path="/motion1" component={MotionStyledComp} />
          <Route path="/motion2" component={MotionCSS} />
        </Switch>
      </div>
    );
  }
}

export default App;

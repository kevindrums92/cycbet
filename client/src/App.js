import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TYPE_PODIUM, TYPE_STAGE } from './utils/const';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import './App.scss';
import 'react-datepicker/dist/react-datepicker.css';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import JoinEvent from './components/dashboard/events/JoinEvent';
import EventVotes from './components/dashboard/events/EventVotes';
import Vote from './components/dashboard/events/Vote';
import Ranking from './components/dashboard/events/Ranking';
import ManageEvents from './components/dashboard/events/manage/ManageEvents';
import StageReview from './components/dashboard/events/StageReview';
import PodiumReview from './components/dashboard/events/PodiumReview';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser(), []);
  });
  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path='/' component={Landing}></Route>
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register}></Route>
              <Route exact path='/login' component={Login}></Route>
              <PrivateRoute
                exact
                path='/dashboard'
                component={Dashboard}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/joinevent'
                component={JoinEvent}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/eventvotes/:eventId'
                component={EventVotes}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/ranking/:eventId'
                component={Ranking}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/stageReview/:stageId'
                component={StageReview}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/podiumReview/:eventId'
                component={PodiumReview}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/stagevote/:stageId'
                component={Vote}
                type={TYPE_STAGE}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/podiumvote/:eventId'
                component={Vote}
                type={TYPE_PODIUM}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/manageEvent/:eventId'
                component={ManageEvents}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/manageEvent'
                component={ManageEvents}
              ></PrivateRoute>
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;

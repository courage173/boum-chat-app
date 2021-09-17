import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import ChatPage from './pages/Chat';
import './index.css';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import { history } from './redux/store';
import AuthRoute from './HOC/AuthRoute';

function App() {
    return (
        <div style={{ height: '100%' }}>
            <Router history={history}>
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route exact path="/" component={AuthRoute(ChatPage)} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;

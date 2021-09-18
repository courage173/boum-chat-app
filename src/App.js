/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import Client from 'socket.io-client';
import ChatPage from './pages/Chat';
import './index.css';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import { history } from './redux/store';
import AuthRoute from './HOC/AuthRoute';
import { User } from './config';
import Socket from './socket';

const socketAPIUrl =
    process.env.REACT_APP_SOCKET_URL || 'http://localhost:3009';

function App() {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const socketIo = new Client(socketAPIUrl, {
            query: { token: User.getAccessToken() },
        });
        setSocket(socketIo);
        window.socket = socket;

        return () => socketIo.close();
    }, [setSocket]);

    return (
        <div style={{ height: '100%' }}>
            {socket && <Socket socket={socket} />}
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

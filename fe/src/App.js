//Group members
//Hung Man Kei   (1155127099)  Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)  Tsai Kwun Ki      (1155126289)

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login';
import Layout from './pages/Layout';

function App () {
    return (
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/index' component={Layout} />
            <Redirect to="/login" />
        </Switch>


    );
}

export default App;

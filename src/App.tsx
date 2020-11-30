import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Login } from './Login';
import { SignUp } from './SignUp';

function App() {
    return (
        <ChakraProvider>
            <Router>
                {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                <Switch>
                    <Route path={['/signup']}>
                        <SignUp />
                    </Route>
                </Switch>
                <Route path={['/', '/login']}>
                    <Login />
                </Route>
            </Router>
        </ChakraProvider>
    );
}

export default App;

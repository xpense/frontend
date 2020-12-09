import React, { createContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import Api from './api/api';

type Props = Record<string, never>;

const api = new Api();
export const ApiContext = createContext<Api>(api);

const App: React.FC<Props> = () => {
    return (
        <ChakraProvider>
            <ApiContext.Provider value={api}>
                <Router>
                    {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                    <Switch>
                        <Route exact path={'/signup'}>
                            <SignUp />
                        </Route>
                        <Route exact path={'/login'}>
                            <Login />
                        </Route>
                        <Route component={() => <h1>Not Found</h1>} />
                    </Switch>
                </Router>
            </ApiContext.Provider>
        </ChakraProvider>
    );
};

export default App;

import React, { Component } from 'react';
import { Route, Router} from 'react-router-dom';
import Tab from './Tabs';
import history from './history';
import "prevent-pull-refresh";
import { AnimatePresence } from "framer-motion";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat'
  }
});

class App extends Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
      <AnimatePresence>
        <Router history={history}>        
            <div>
              <Route path={'/'} component={props => <Tab {...props} />} />
            </div>
        </Router>
      </AnimatePresence>
      </ThemeProvider>
    );
  }
}

export default App;

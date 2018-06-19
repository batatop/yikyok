import React from 'react';
import { Provider } from 'react-redux';

import store from "./src/store/store"
import AppNavigator from "./src/components/navigation/AppNavigator"

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    );
  }
}
import React, { Component } from 'react';
import { withSnackbar } from 'notistack';

import Header from './components/header.component';
import Footer from './components/footer.component';
import MainBlock from './components/mainBlock/main.index';

import './App.css';

class App extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { notificationRedux, enqueueSnackbar } = this.props;
    if (prevProps.notificationRedux.status !== notificationRedux.status)
      enqueueSnackbar(notificationRedux.message, { variant: notificationRedux.type });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <MainBlock />
        <Footer />
      </div>
    );
  }
}

export default withSnackbar(App);

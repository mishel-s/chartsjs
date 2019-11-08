import { connect } from 'react-redux';

import App from './App.component';

const mapStateToProps = store => ({
  notificationRedux: store.notificationRedux.data,
});

export default connect(mapStateToProps)(App);

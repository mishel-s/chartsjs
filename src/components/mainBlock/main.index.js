import { connect } from 'react-redux';

import MainBlock from './Main.component';

import { showNotification } from '../../commonComponents/notifications/notification.action';

const mapStateToProps = state => ({
  notification: state.notificationRedux.data,
});

export default connect(
  mapStateToProps,
  {
    showNotification,
  }
)(MainBlock);

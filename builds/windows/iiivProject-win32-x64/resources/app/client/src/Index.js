import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import key from 'keymaster'
import Root from './components/CompoundGraph/Root';

const { ipcRenderer } = window.require('electron');
const remote = window.require('electron').remote;
const { dialog } = window.require('electron').remote;

const styles = theme => ({
  app: {
    height: '100%'
  },
});

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };

    this.keyPress = this.keyPress.bind(this);
    key('ctrl+e, ctrl+i, ctrl+o, ctrl+s, ctrl+w', (event, handler) => this.keyPress(event, handler));
  }

  keyPress(event, handler) {
    let key = handler.key;
    let mode = this.state.mode;
    if (key === 'ctrl+o') {
      if (mode === 'input') {
        this.changeFile('inputInitialize');
      } else if (mode === 'output') {
        this.changeFile('outputInitialize');
      }
    } else if (key === 'ctrl+i') {
      if (mode === 'input') {
        this.changeFile('inputUpdate');
      } else if (mode === 'output') {
        this.changeFile('outputUpdate');
      }
    } else if (key === 'ctrl+s') {
      if (mode === 'input') {
        this.changeFile('inputSave');
      } else if (mode === 'output') {
        this.changeFile('outputSave');
      }
    } else if (key === 'ctrl+e') {
      if (mode === 'input') {
        this.changeFile('inputExport');
      } else if (mode === 'output') {
        this.changeFile('outputExport');
      }
    } else if (key === 'ctrl+w') {
      remote.getCurrentWindow();
      window.close();
    }

  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.app}>
        <Root />
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
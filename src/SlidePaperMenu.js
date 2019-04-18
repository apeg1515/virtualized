import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';

const styles = theme => ({
  root: {
    height: 180,
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing.unit,
  },
});

class SimpleCollapse extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} onMouseOver={() => this.props.mouseOver()}>
        <div className={classes.container}>
          <Collapse in={this.props.checked}>
            <Paper elevation={4} className={classes.paper}>
            	{this.props.children}
            </Paper>
          </Collapse>

        </div>
      </div>
    );
  }
}

SimpleCollapse.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  checked: PropTypes.bool,
};

export default withStyles(styles)(SimpleCollapse);
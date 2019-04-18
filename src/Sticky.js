import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';

import Simple from './HelpDesk'

const styles = theme => ({
  root: {
    height: 180,
  },
  wrapper: {
    width: 100 + theme.spacing.unit * 2,
  },
  paper: {
    zIndex: 1,
    position: 'relative',
    margin: theme.spacing.unit,
  },
  svg: {
    width: 520,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
});


class SimpleSlide extends React.Component {
  state = {
    checked: false,
  };

  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  onMouseLeave = () => {
  	this.setState(state => ({ checked: !state.checked }));
  };
  render() {
    const { classes } = this.props;
    const { checked } = this.state;

    return (
    <div className="row">
    <div className="col-xs-offset-10 col-xs-2">
      <div style={{ position: 'sticky', top: 30, zIndex: 1 }} className={classes.root}>
        <div className={classes.wrapper}>
          <Switch checked={checked} onMouseEnter={this.handleChange} aria-label="Collapse" />
          <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
            <Paper elevation={4} className={classes.paper}>
              <svg className={classes.svg}>
                <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
              </svg>
            </Paper>
          </Slide>
        </div>
      </div>
      </div>
      </div>
    );
  }
}

SimpleSlide.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlide);

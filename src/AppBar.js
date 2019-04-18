import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

const stylesList = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function InsetList(props) {
  const { classes } = props;
  return (
    <List component="nav" className={classes.root}>
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText inset primary="Chelsea Otakan" />
      </ListItem>
      <ListItem>
        <div />
      </ListItem>
            <ListItem button>
        <ListItemText inset primary="Eric Hoffman" />
      </ListItem>
            <ListItem button>
        <ListItemText inset primary="Eric Hoffman" />
      </ListItem>

    </List>
  );
}

InsetList.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
const MajorList = withStyles(stylesList)(InsetList);


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  paper: {
    height: 300,
  }
};

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    checked: false,
  };

  Mouse = (event) => {
    console.log('account', event.target.value)
    this.setState(state => ({ checked: !state.checked }));
  };
  
  Leave = (event) => {
    if (this.state.checked) {
      this.setState(state => ({ checked: !state.checked }));
    }
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    console.log(event)
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl, checked } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Photos
            </Typography>
            {auth && (
              <div>

                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={this.Mouse}
                  value="account"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>

                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={this.Mouse}
                  value="account"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
    
            )}
          </Toolbar>
          <div className={classes.root} onMouseLeave={this.Leave}>
            <div className={classes.container}>
              <Collapse in={checked}>
                <Paper elevation={4} className={classes.paper}>         
                  <MajorList />
                </Paper>
              </Collapse>
            </div>
          </div>
 
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
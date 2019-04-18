import React from 'react';
import PropTypes from 'prop-types';
import {
	IconButton,
	Tooltip,
	Typography,
	Grid,
	Grow,
	Paper,
	Popper,
	MenuItem,
	MenuList,
	withStyles,
	ClickAwayListener,
} from '@material-ui/core';

const styles = theme => ({
	root: {
		display: 'flex',
	},
	paper: {
		marginRight: theme.spacing.unit * 2,
	}
});

class FilterColumns extends React.Component {
	state = {
		open: false,
	};

	handleToggle = () => {
		this.setState(state => ({ open: !state.open }));
	};

	handleClose = event => {
	    if (this.anchorEl.contains(event.target)) {
	      return;
	    }

    	this.setState({ open: false });
  	};

  	render() {

  		const { classes, icon, display } = this.props;
    	const { open } = this.state;

    	return (
    		<div className={classes.root}>
    			
    			<Tooltip 
    				title={<React.Fragment>
    						<div style={{ color: '#fff', fontSize: 14 }}>{display}</div>
    					</React.Fragment>} 
    				placement="top-start">
	    			<IconButton 
	    				buttonRef={node => {this.anchorEl = node}} 
	    				aria-owns={open ? 'menu-list-grow' : undefined}
	    				aria-haspopup="true"
	    				onClick={this.handleToggle}>
	    				{icon}
	    			</IconButton>
    			</Tooltip>
    			<Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
    				{({ TransitionProps, placement }) => (
    					<Grow
	    					{...TransitionProps}
	    					id="menu-list-grow"
	    					style={{ 
	    						transformOrigin: placement === 'bottom' ? 'center bottom' : 'center bottom' 
	    					}}>
	    					<Paper>
	    						<ClickAwayListener onClickAway={this.handleClose}>
	    							<MenuList>
				                     	<MenuItem onClick={this.handleClose}>Profile</MenuItem>
				                      	<MenuItem onClick={this.handleClose}>My account</MenuItem>
				                      	<MenuItem onClick={this.handleClose}>Logout</MenuItem>
				                    </MenuList>
	    						</ClickAwayListener>
	    					</Paper>
    					</Grow>

    				)}
    			</Popper>
    		</div>
    	);
  	}
}

FilterColumns.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterColumns);
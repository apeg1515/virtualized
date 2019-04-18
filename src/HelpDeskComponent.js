import React from 'react';
import ChevronLeft  from '@material-ui/icons/ChevronLeft';
import PropTypes from 'prop-types';
import edl from './EDL.svg';
import { 
	withStyles, 
	Card, 
	CardContent, 
	Slide,
	List,
	ListItem,
	ListItemText,
	Typography, 
	Button,
	Avatar,
	Fade,
	ListItemAvatar
} from '@material-ui/core';

const classes = {
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  contentFirst: {
    flex: '1',
  },
  contentSecond: {
  	flex: '2'
  },
   list: {
   	 root: {
   	 	width: '100%',
   	 	maxWidth: 360
   	 }
   },
   icon: {
   		//margin: theme.spacing.unit,
   		fontSize: 14
   },
  	column: {
	  	height: '3em',
	    justifyContent: 'center',
	    alignItems: 'center',
	    flexDirection: 'column',
	    display: 'flex',
 
   },
    columnMiddle: { 
   		display: 'flex',
   		flexDirection: 'column',
   		justifyContent: 'center',
   		transform: 'rotate(-90deg)',
   		height: '5em'
   },

}; 


const Content = props => {

	const { onEventFired } = props;

	return (							
		<div className={classes.details} >

			<CardContent style={{ padding: 2 }} onClick={onEventFired} className={classes.contentFirst}>
				<div className={classes.column}>
					<ChevronLeft className={classes.icon} />
				</div>
				<div className={classes.columnMiddle}>
					<Typography variant="subtitle2">Help Desk</Typography>
				</div>
				<div className={classes.column}>
					<ChevronLeft className={classes.icon} />
				</div>
			</CardContent>
		</div>
	);
};


const ContentProp = (props) => { 
	const { onEvent, id } = props;
	return (
		<div style={{ float: 'right'}}>
			<Card id={id} style={ classes.card } >
				<div style={classes.details} >

					<CardContent style={{ padding: 2, flex: '1' }} onClick={onEvent}>
						<div style={classes.column}>
							<ChevronLeft style={classes.icon} />
						</div>
						<div style={classes.columnMiddle}>
							<Typography variant="subtitle2">Help Desk</Typography>
						</div>
						<div style={classes.column}>
							<ChevronLeft style={classes.icon} />
						</div>
					</CardContent>
				</div>
			</Card>
		</div>
	);
};

const CCProp = withStyles(classes)(ContentProp);


/*
*make sure html, body { max-width: 100%, overflow-x: hidden }
*/

class HelpDeskCard extends React.Component {

	state = {
		checked: false,

	};
	onEnter = () => {
		this.setState({ checked: !this.state.checked });
		const id = document.querySelector('#btn');
		if (!this.state.checked) {
			id.style.display  = 'none';
		} else {
			id.style.display  = 'block';
			//setTimeout(() => { id.style.display  = 'block';}, 400)
		}
	}

	render () {
			const { classes } = this.props;
    		const { checked } = this.state;
		return (
			<div style={{ position: 'sticky', top: '8em', zIndex: 1200, whiteSpace: 'nowrap', marginRight: '-2rem', paddingTop: 2, paddingBottom: 8 }}   className="row">
	
				<div className="col-xs-offset-9 col-xs-3">


					
						<Fade in={checked}>
							<CCProp id="btn" onEvent={this.onEnter} />
						</Fade>
						<Slide  direction="left" in={checked} mountOnEnter unmountOnExit>
							<div style={{ float: 'right'}}>
							<Card className={classes.card} >
								<div className={classes.details} >

									<CardContent style={{ padding: 2 }} onClick={this.onEnter} className={classes.contentFirst}>
										<div className={classes.column}>
											<ChevronLeft className={classes.icon} />
										</div>
										<div className={classes.columnMiddle}>
											<Typography variant="subtitle2">Help Desk</Typography>
										</div>
										<div className={classes.column}>
											<ChevronLeft className={classes.icon} />
										</div>
									</CardContent>
								</div>
								<CardContent style={{ padding: 0 }}  className={classes.contentSecond}>
									<List component="nav" className={classes.list.root} alignItems="flex-start">
										<ListItem button>
											<ListItemAvatar>
												<Avatar alt="support" src={edl} />
											</ListItemAvatar>
											<ListItemText inset primary="Chelsea Otakan" />
										</ListItem>
										<ListItem button>
											<ListItemText inset primary="Chelsea Otakan" />
										</ListItem>
										<ListItem button>
											<ListItemText inset primary="Chelsea Otakan" />
										</ListItem>
									</List>
								</CardContent>
							</Card>
							</div>
						</Slide>
					
				</div>
			</div>
		);
	}

};

HelpDeskCard.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(classes)(HelpDeskCard);
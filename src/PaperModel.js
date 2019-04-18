import React from 'react';
import Button from '@material-ui/core/Button';
import ReactPaginate from 'react-paginate';

import PropTypes from 'prop-types';
import { 
	withStyles, 
	Checkbox, 
	FormControl, 
	FormGroup, 
	Grid, 
	Paper, 
	Typography, 
	Divider 
} from '@material-ui/core';



const styles = {
  show: {
  	display: 'block'
  },
  hide: {
  	display: 'none'
  },
   col: {
   	 flexBasis: '25%',
 	 maxWidth: '25%', 
 	 flex: '0 0 auto',
 	 boxSizing: 'border-box'
   },
   colNine: {
   	 flexBasis: '81%',
 	 maxWidth: '81%',
 	 flex: '0 0 auto',
 	 boxSizing: 'border-box'
  },
  colOne: {
   	 flexBasis: '6.333% !important',
 	 maxWidth: '6.333% !important',
 	 flex: '0 0 auto',
 	 boxSizing: 'border-box'
  }, 
  columnHeader: {
  	display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  rowHeader: {
  	display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  positionRowStart: {
  	 justifyContent: 'flex-start'
  },
  positionRowEnd: {
  	justifyContent: 'flex-end'
  },
  divider: {
  	paddingTop: 5,
  	paddingBottom: 5,
  },
  rotatedText: {
    transform: 'translate(0px, 125px) rotate(270deg)',
    whiteSpace: 'nowrap',
  },
  formCheckboxDefault: {
  	marginLeft: 0,
    marginRight: '-10px',
  },
  formCheckboxColOne: {
  	marginLeft: 0,
    marginRight: 0,
  },
    rowBody: {
    flexBasis: 0,
    maxWidth: '100%',
    flexGrow: 1,
    overflowY: 'scroll',
    overflowX: 'scroll',
    height: '34rem',
    paddingBottom: '2em',
    marginBottom: '3%',
  }
};


const DefaultPaper = withStyles((theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit  * 2,
    borderRadius: 2,
  }, 
}))(Paper);

function PaperSheet(props) {
  const { children } = props;

  return (
    <div>
      <DefaultPaper style={{ height: '42rem'}} elevation={1}>
  		{children}
      </DefaultPaper>
    </div>
  );
}

PaperSheet.propTypes = {
  children:PropTypes.node
};

const PaperMate = withStyles(styles)(PaperSheet);

const ResetButton = withStyles((theme) => ({
	root: {
		backgroundColor: '#fff',
	    borderRadius: 3,
	    border: 'solid 2px #00848f',
	    color: '#00848f',
	    height: 38,
	    padding: '0 20px',
	    margin: 0,
	    boxShadow: 'none',
	    [theme.breakpoints.down('sm')]: {
	    	height: 30,
	    	padding: 0,
	    },
	    [theme.breakpoints.up('md')]: {
	    	height: 30,
	    	padding: 0,
	    }
	},
	label: {
		textTransform: 'capitalize',
	}
}))(Button);

const Title = withStyles((theme) => ({
	root: {
		[theme.breakpoints.down('sm')]: {
	    	fontSize: '0.72rem',
	    },
	   	[theme.breakpoints.up('md')]: {
	    	fontSize: '0.92rem',
	    },
	    [theme.breakpoints.up('lg')]: {
	    	fontSize: '1.10rem'
	    }
	}
}))(Typography);

class DynamicInlineStyle extends React.Component {
  state = {
    color: 'default',
  };
  clicked() {
  	console.log('click event');
  }
  render() {
  	const { reset, active, value, workbookPermission } = this.props;
    return (

   	  <Grid item xs={active === null ? 3 : (active === value ? 9 : 1)}>
   		<div className="box">
      	<PaperMate>
      	  <div style={{
      	  	...styles.rowHeader,
      	  	...(active === null ? {} : (active === value ? styles.rowHeader : styles.columnHeader))
      	  }}>	        
      	  	<div style={{
      	  		...styles.positionRowStart,
      	  		...(active === null ? styles.show : (active === value ? styles.show : styles.hide))
      	  	}}>
      	  		<ResetButton onClick={this.clicked.bind(this)}>RESET</ResetButton>
      	  	</div>
      	  	<div style={{
      	  		alignItems: 'center',
      	  		...(active === null ? {} : (active === value ? {} : styles.rotatedText))
      	  	}}>
      	  		  <Title component="h2" variant="h6">
          			Display 1
        		  </Title>
      	  	</div>
      	  	<div style={styles.positionRowEnd}>
		      <React.Fragment>
		        <FormControl style={{ 

		        	...(active === null ? styles.formCheckboxDefault : (active === value ? {} : styles.formCheckboxColOne))
		         }}> 
		        	<FormGroup>
		        		<Checkbox
			              checked={ value ===  active }
			              onChange={this.props.reset(this)}
			              jcolor="primary"
			              value={value}
			            />
		        	</FormGroup>
		        </FormControl>
		
		      </React.Fragment>
		    </div>
	      </div>

	      <div style={{
	      	...styles.divider,
	      	...(active === null ? styles.show : (active === value ? styles.show : styles.hide))
	      }} >
	      	
	      	<Divider style={{ height: 2 }} variant="fullWidth"/>
	      </div>
	      


	      <div style={{ 
	     	...(active === null ? styles.show : (active === value ? styles.show : styles.hide))
	      }}>      	
		   	<div style={styles.rowBody}>
		        <Typography component="p">
		          Paper can be used to build surface or other elements for your application.
		          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
		        </Typography>
	        </div>
	      </div>
     	
     	  <Grid container alignItems="center" justify="center" direction="row" spacing={8}>
     	  	<Grid item>
     	  		<ResetButton onClick={this.clicked.bind(this)}>RESET</ResetButton>
     	  	</Grid>
     	  	<div style={{
     	  		...(active === null ? styles.hide : (active === value && workbookPermission === true ? styles.show : styles.hide))
     	  	}}>
     	  		<Grid item>
     	  			<ResetButton onClick={this.clicked.bind(this)}>RESET</ResetButton>
     	  		</Grid>	
     	  	</div>
     	  </Grid>
      </PaperMate>
      </div>
    </Grid>
    );
  }
}

DynamicInlineStyle.propTypes = {
	func: PropTypes.func
}

export default DynamicInlineStyle;



import * as React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, MultiGrid, CellMeasurer, SortDirection, CellMeasurerCache } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons';
import { reshapeUsers, reshapePermissions } from './VirtualizedHelpers';
import IntegrationReactSelect from './AutoSelector';
import {  
	TableCell, 
	Paper, 
	withStyles, 
	Typography, 
	Input,
	TextField,
	MenuItem, 
	Select, 
	InputLabel,
	FormGroup,
	FormControl,
	Grid  
} from '@material-ui/core';



const materialStyles = (theme) => ({
	paper: {
	    ...theme.mixins.gutters(),
	    paddingTop: theme.spacing.unit * 2,
	    paddingBottom: theme.spacing.unit * 2,
	    boxShadow: `0px 1px 5px 0px rgba(0,0,0,0.2),
	    0px 2px 2px 0px rgba(0,0,0,0.14), 
	    0px 3px 1px -2px rgba(0,0,0,0.12)`,
	    marginBottom: '2%'
	},
	headerCell: {
		flex: 1,
		display: 'flex',
	    alignItems: 'center',
	    boxSizing: 'border-box',
	    height: 54,
	    cursor: 'initial',
	    padding: 5,
	    overflow: 'hidden',
	    justifyContent: 'center'
	},
	rowCell: {
		flex: 1,
		display: 'flex',
	    alignItems: 'center',
	    boxSizing: 'border-box',
	    cursor: 'pointer',
	    padding: 5,
	    overflow: 'hidden',
	    justifyContent: 'center',
	    '&:hover': {
	     	backgroundColor: '#eeeeee',
	    },
	},
	formFilter: {
		margin: theme.spacing.unit,
	    minWidth: 120,
	},
	inputFilter: {
		margin: theme.spacing.unit,
	}

});

const cache = new CellMeasurerCache({
  	defaultHeight: 38,
   
  fixedWidth: true,
   keyMapper: () => 1,
});


const STYLE_BOTTOM_LEFT_GRID = {
  //borderRight: '2px solid #aaa',
  backgroundColor: '#fafafa',
  height: 336,
};


const STYLE_TOP_RIGHT_GRID = {
  //borderBottom: '2px solid #aaa',
  fontSize: 12
};




const ArrowDirection = props => {
	const { direction } = props;
	if (direction) {
		return ( <ArrowDropUp style={{ fontSize: 14, color: '#736a6a', marginLeft: '1%' }} /> );
	} else {
		return  ( <ArrowDropDown style={{ fontSize: 14, color: '#736a6a', marginLeft: '1%' }} /> );
		
	}
}

ArrowDirection.propTypes = {
	direction: PropTypes.bool.isRequired
};


class MultiGridExample extends React.PureComponent {

  constructor(props, context) {
    super(props, context);

    this.state = {
      fixedColumnCount: 2,
      fixedRowCount: 1,
      scrollToColumn: 0,
      scrollToRow: 0,
      selectedColumn: null,
      columns: [],
      data: [], //this.props.allusers,
      permissions: [], //this.props.allpermissions,
      defaultData: [],
      previousData: [],
      direction: true,
      rowCountLength: 0,
      open: false,
      filterBy: 1
    };

    this._cellRenderer = this._cellRenderer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSelectColumn = this.handleSelectColumn.bind(this);
  }
  
   	componentDidMount() {

   		const allusers = [ ...this.props.allusers ];
   		const allpermissions = [ ...this.props.allpermissions ];
   		allpermissions.unshift(  
   			{id: "displayname", name: "DisplayName" },
  			{id: "username", name: "UserName" }
  		);

  		const data = reshapePermissions(reshapeUsers(allusers, allpermissions), allpermissions);
   		const columns = [ ...this.props.allpermissions ].map(col => ({ label: col.name })).map((suggestion) => ({
  			value: suggestion.label,
 			label: suggestion.label,
		}));

  		data.map(user => (user.roles[0].name = user.displayname, user.roles[1].name = user.username));
  		const copy = data[0];
		data.unshift(copy);

		//console.log(reshapeUsers(allusers, allpermissions));
		this.setState({
			data,
			columns: columns.splice(2),
			defaultData: data,
	  		permissions: allpermissions,
	  		rowCountLength: data.length
		});

   	}


	componentDidUpdate(prevProps, prevState) {
		if (this.props.updateCount !== prevProps.updateCount) {
			console.log('props -> Count', this.props.updateCount)
			console.log('prevProps -> Count', prevProps.updateCount);


	   		const allusers = [ ...this.props.allusers ];
	   		const allpermissions = [ ...this.props.allpermissions ];
	   		allpermissions.unshift(  
	   			{id: "displayname", name: "DisplayName" },
	  			{id: "username", name: "UserName" }
	  		);

	  		const data = reshapePermissions(reshapeUsers(allusers, allpermissions), allpermissions);
	   		const columns = allpermissions.map(col => ({ label: col.name })).map((suggestion) => ({
	  			value: suggestion.label,
	 			label: suggestion.label,
			}));

	  		data.map(user => (user.roles[0].name = user.displayname, user.roles[1].name = user.username));
	  		const copy = data[0];
			data.unshift(copy);

			this.setState({
				data,
				columns,
				defaultData: data,
		  		permissions: allpermissions,
		  		rowCountLength: data.length
			});
		}
			
	}
  handleChange = name => event => {
  	const row  = event.target.getAttribute('rowid');
  	const column = event.target.getAttribute('columnid');
  	 const data = [ ...this.state.data ];
  	
  	data[row].roles[column].checked = !!event.target.checked;
  	//console.log(data[row].roles[column])
  	this.props.assignedRole(event.target.checked);
  	
  	this.setState({ data });
  };

  handleSort = () => {
	const data = [ ...this.state.data ].reverse();
	this.setState({ data });
	if (this.state.direction) {
		this.setState({ direction: false });
	} else {
		this.setState({ direction: true });
	}
  }
  
  handleSelectColumn = value => {
  	console.log(value)
  	const position = this.state.columns.reduce((acc, key, pos) => {
  		if (value !== null && key.value === value.value) {
  			acc.push(pos);
  		}
  		return acc;
  	}, [])[0] + 3;
  	
    if (value !== null) {
    	console.log(position);
    	this.setState({
	    	selectedColumn: value,
	        scrollToColumn: position
    	});
    } 
    if (value === null ){
    	this.setState({
	    	selectedColumn: value,
	        scrollToColumn: 2
    	});
    }
  };

  handleSelectChange = event => {
  	//console.log('filterBy', this.state.filterBy, event.target.value, event.target.name);
    this.setState({ [event.target.name]: event.target.value });
  };
  handleOpen = () =>  {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  handleFilterInput = event => {
  	const value = event.target.value.toLowerCase().trim();
	const displayName = [ ...this.state.defaultData ].filter(user => user.displayname.toLowerCase().indexOf(value) > -1);
	const userName = [ ...this.state.defaultData ].filter(user => user.username.toLowerCase().indexOf(value) > -1);

  	switch(this.state.filterBy) {
  		case 1:
  			this.setState({ data: displayName , rowCountLength: displayName.length });
  			break;
  		case 2:

  			this.setState({ data: userName, rowCountLength: userName.length });
  			break;
  		default:
  			this.setState({ data: [ ...this.state.defaultData ], rowCountLength: [ ...this.state.defaultData ].length });
  			return;
  	}
  };

  render() { 
  	// console.log('permissions props:: ',this.state.permissions)
  	// console.log('allUsers props::', this.state.data)
  	const { classes } = this.props;
    return (
    	<div style={{ flexGrow: 1}}>
	    	<Grid container spacing={24}>
	    		<Grid style={{ height: 80 }} item xs={12}>
	    			<form style={{ paddingBottom: 8 }} autoComplete="off">
	    				<FormGroup row>
					      	<FormControl classes={{ root: classes.formFilter }}>
					      		<InputLabel htmlFor="controlled-open-select">Filter By</InputLabel>
					      		<Select 
					      			open={this.state.open} 
					      			onOpen={this.handleOpen}
					      			onClose={this.handleClose} 
					      			value={this.state.filterBy}
					      			onChange={this.handleSelectChange}
					      			inputProps={{
						              name: 'filterBy',
						              id: 'controlled-open-select',
						            }}>
						            <MenuItem value={1}>DisplayName</MenuItem>
						            <MenuItem value={2}>UserName</MenuItem>
					      		</Select>
					      	</FormControl>
					      	<FormControl classes={{ root: classes.formFilter }}>
					      		<Input 
					      			classes={{ root: classes.inputFilter }}
					      			style={{ marginTop: 16 }}
					      			placeholder="Search"  
				        			onChange={this.handleFilterInput}/>
					      	</FormControl>
						    <FormControl classes={{ root: classes.formFilter }} style={{ width: '20%' }}>

					      		<IntegrationReactSelect 
					      		options={this.state.columns}
					      		value={this.state.selectedColumn}
					      		handleSelectColumn={this.handleSelectColumn} />
						    </FormControl>
				      	</FormGroup>
		      		</form>
	    		</Grid>
	    		<Grid item xs={12}>
			     	<Paper classes={{ root: classes.paper }} elevation={1} style={{ height: 400, width: '100%' }}>
			        <AutoSizer disableHeight>
			          {({ width }) => (
			            <MultiGrid
			              {...this.state}
			              
			              cellRenderer={this._cellRenderer}
			              columnWidth={200}
			              columnCount={this.state.permissions.length}
			              enableFixedColumnScroll
			              enableFixedRowScroll
			              height={380}
			              rowHeight={38}
			              rowCount={this.state.rowCountLength}
			              styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
			     
			              styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
			              width={width}
			              hideTopRightGridScrollbar
			              hideBottomLeftGridScrollbar
			            />
			          )}
			        </AutoSizer>
			      	</Paper>
		    	</Grid>
		    </Grid>
      	</div>
    );
  }
  
  _cellRenderer({columnIndex ,key, rowIndex, parent, style}) {
     const { classes } = this.props;
    //const checkedValue = `${this.state.data[rowIndex].id}${this.state.data[rowIndex].username}`.replace(/\s/g,"").trim();
    //const rowStyles = this.state.data[rowIndex].display !== "flex" ? { ...style, display: "none", top: 0, left: 0, height: 0, width: 0, position: 'initial' } : { ...style, display: "flex" };
    
  	if (rowIndex === 0) {
  		if (columnIndex <= 1) {
  			return (
  				<TableCell classes={{ root: classes.headerCell }}
  					onClick={() => this.handleSort()} 
  					component="div" variant="head" key={key} style={style}>
	  				<Typography  component="h2" variant="caption">
						{this.state.permissions[columnIndex].name}
	  				</Typography>	  				
	  				<ArrowDirection direction={this.state.direction} />						    
		    	</TableCell>
  			);
  		}
  		return (
	  		
			<TableCell classes={{ root: classes.headerCell }} component="div" variant="head" key={key} style={style}>
  				<Typography  component="h2" variant="caption">
					{this.state.permissions[columnIndex].name}
  				</Typography>		    
	    	</TableCell>
			   
			
  		);

  	} 
  	if (this.state.data[rowIndex].roles !== undefined) {
  		return (
	  		
			      	<TableCell
			      		classes={{ root: classes.rowCell }} 
			      		component="div" 
			      		variant="body" 
			      		key={key} 
			      		style={style}>
			  			{columnIndex <= 1 ? 
			  				(
			  					<Typography 
			  						align="center"
			  						variant="body2">
			  						{this.state.data[rowIndex].roles[columnIndex].name}
			  					</Typography>
			  				) : 
			  				(

			  					<input type="checkbox" 
			  					    rowid={rowIndex}
			  					    columnid={columnIndex}
			  						checked={ this.state.data[rowIndex].roles[columnIndex].checked } 
			  						onChange={this.handleChange('checked')}
			  						value={rowIndex,columnIndex} /> 
			  				)
			  			}
			  		</TableCell>
		     
  		);
  	} else {
  		return;
  	}

  }

}

MultiGridExample.propTypes = {
	allpermissions: PropTypes.array,
	allusers: PropTypes.array,
	
}

export default withStyles(materialStyles)(MultiGridExample);
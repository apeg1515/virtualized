import * as React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, MultiGrid, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { reshapeRoles, reshapeUserRoles } from './VirtualizedHelpers';
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons';
import VirtualizedAutoSelector from './AutoSelector';
import {  
	TableCell, 
	Paper,  
	withStyles, 
	Typography, 
	Input,
	MenuItem, 
	Select, 
	InputLabel,
	FormGroup,
	FormControl,
	Grid  
} from '@material-ui/core';


const cache = new CellMeasurerCache({
	defaultHeight: 38,
	fixedWidth: true,
	keyMapper: () => 1,
});
 cache.set(0, 0, 50, 10);

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
	    cursor: 'pointer',
	    padding: 5,
	    overflow: 'hidden',
	    justifyContent: 'flex-start',
	    overflowWrap: 'break-word',
  		wordWrap: 'break-word',
  		hyphens: 'auto',
	},
	rowCell: {
		flex: 1,
		display: 'flex',
	    alignItems: 'center',
	    boxSizing: 'border-box',
	    cursor: 'pointer',
	    padding: 5,
	    whiteSpace: 'nowrap',
	    overflow: 'hidden',
	    justifyContent: 'flex-start',
	    flexWrap:'nowrap',
	    '&:hover': {
	     	backgroundColor: '#eeeeee',
	    },
	    overflowWrap: 'break-word',
  		wordWrap: 'break-word',
  		hyphens: 'auto',
	},
	cellWidth: {
		width: 300,
	},
	formFilter: {
		margin: theme.spacing.unit,
	    minWidth: 120,
	},
	inputFilter: {
		margin: theme.spacing.unit,
	}

});

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

class VirtualizedUserRoleTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fixedColumnCount: 2,
			fixedRowCount: 1,
			scrollToColumn: 0,
			scrollToRow: 0,
			selectedColumn: null,
      		columns: [],
			data: [] , //props.allusers,
			roles: [], //props.allpermissions,
			dataDefault: [],
			rowCountLength: 0,
			direction: true,
			open: false,
			filterBy: 1,
			value: '',
			removed: '',
		};

		this._cellRenderer = this._cellRenderer.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSort = this.handleSort.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleFilterInput = this.handleFilterInput.bind(this);
		this.handleSelectColumn = this.handleSelectColumn.bind(this);
		this.dedupe = this.dedupe.bind(this);
		this.checker = this.checker.bind(this);
	}

   	componentDidMount() {

   		const allusers = [ ...this.props.allusers ];
   		const allroles = [ ...this.props.allroles ].map((role) => ({ id: role.id, name: role.name }));
   		allroles.unshift(  
   			{id: "displayname", name: "DisplayName" },
  			{id: "username", name: "UserName" }
  		);

  		//const data = reshapeRoles(allusers, allroles);
  		const data = reshapeRoles(reshapeUserRoles(allusers, allroles), allroles)

   		const columns = allroles.map(col => ({ label: col.name })).map((suggestion) => ({
  			value: suggestion.label,
 			label: suggestion.label,
		}));

  		data.map(user => (user.roles[0].name = user.displayname));
        data.map(user => (user.roles[1].name = user.username));

  		//const copy = data[0];
		//data.unshift(copy);
		const copied = data[data.length - 1];
		data.push(copied);

		console.log(data);

		this.setState({
			data,
			columns: columns,
			defaultData: data,
	  		roles: allroles,
	  		rowCountLength: data.length
		});

   	}


	componentDidUpdate(prevProps, prevState) {
		if (this.props.updateCount !== prevProps.updateCount) {

	   		const allusers = [ ...this.props.allusers ];
	   		const allroles = [ ...this.props.allroles ].map((role) => ({ id: role.id, name: role.name }));
	   		allroles.unshift(  
	   			{id: "displayname", name: "DisplayName" },
	  			{id: "username", name: "UserName" }
	  		);

	  		const data = reshapeRoles(allusers, allroles);

	   		const columns = allroles.map(col => ({ label: col.name })).map((suggestion) => ({
	  			value: suggestion.label,
	 			label: suggestion.label,
			}));

	  		data.map(user => (user.roles[0].name = user.displayname));
            data.map(user => (user.roles[1].name = user.username));

	  		const copied = data[data.length - 1];
			data.push(copied);

			console.log(data);
			this.setState({
				data,
				columns: columns,
				defaultData: data,
		  		roles: allroles,
		  		rowCountLength: data.length
			});
		}
			
	}

    handleSelectColumn = value => {

	  	const position = this.state.columns.reduce((acc, key, pos) => {
	  		if (value !== null && key.value === value.value) {
	  			acc.push(pos);
	  		}
	  		return acc;
	  	}, [])[0];
	  
	    if (value !== null) {
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

	handleChange = name => event => {

		const row  = event.target.getAttribute('rowid') - 1;
		const column = event.target.getAttribute('columnid');
		const userId = event.target.getAttribute('userid');
		const roleId = event.target.getAttribute('roleid');

		const data = [ ...this.state.data ];
		
		data[row].roles[column].checked = event.target.checked;

		console.log('ROW', row);
		console.log('COLUMN', column);
		console.log('USER', data[row]);
		console.log('checkBox', event.target.checked);
		this.setState({ data });
         
		if (event.target.checked === true) {
			console.log('internal', event.target.checked)
			//this.props.assignRole(userId, roleId);
		} else {
			console.log('internal', event.target.checked);
			//this.props.unassignRole(userId, roleId);
		}
		
	};

	dedupe = ob => {
		if (Array.isArray(ob)) {
	    	const hash = new Object()
		    return ob.filter((e) => {
		    	const key = JSON.stringify(e);
		      	const match = Boolean(hash[key]);
		      	return (match ? false : hash[key] = true);
		    });
	  }
	};

	checker = data => {
		const array = data.map(usr => usr.displayname);
		return array.some((usr, index) => array.indexOf(usr) !== index);
	}

	handleSort = () => {

		/*
		let deduped, copied;
		if(this.state.value && this.state.direction ) {
			deduped = this.dedupe([...this.state.data].reverse());
			copied = deduped[deduped.length - 1];


			console.log('sorted' , deduped);
			console.log('value' , this.state.value);
			console.log('current direction state' , this.state.direction);

			deduped.push(copied);

			return this.setState({ data: deduped, rowCountLength: deduped.length });

		} 

		if (this.state.value && this.state.direction === false) {
			deduped = this.dedupe([...this.state.data].reverse());
			copied = deduped[deduped.length - 1];


			console.log('sorted2' , deduped);
			console.log('value2' , this.state.value);
			console.log('current direction state2' , this.state.direction);

			deduped.push(copied);

			return this.setState({ data: deduped, rowCountLength: deduped.length });
		}else {

			deduped = this.dedupe([...this.state.data].reverse());
			copied = deduped[deduped.length - 1];

			deduped.push(copied);

			return this.setState({ data: deduped });
		}*/

			const deduped = this.dedupe([...this.state.data].reverse());
			const direction = !this.state.direction;
			const copied = deduped[deduped.length - 1];

			deduped.push(copied);

			console.log('direction', direction);

			return this.setState({ data: deduped, rowCountLength: deduped.length, direction });
			//return this.setState(state => ({ data: deduped, rowCountLength: deduped.length, direction: !!state.direction }))

	};

	handleSelectChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleOpen = () =>  {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleSelectChange = event => {

		this.setState({ [event.target.name]: event.target.value });
	};

	  handleOpen = () =>  {
		this.setState({ open: true });
	  };

	  handleClose = () => {
		this.setState({ open: false });
	  };

	handleFilterInput = event => {
        
		const value = event.target.value.toLowerCase();
		this.setState({ value });
		const displayName = [ ...this.state.defaultData ].filter(user => user.displayname.toLowerCase().indexOf(value) > -1);
		
		
		//console.log("LENGTH", displayName)
		//console.log('checker', this.checker(displayName));
		
		if (!this.checker(displayName)) {
			const copied = displayName[displayName.length - 1];
			console.log('last ',copied)
			displayName.push(copied);
		}



		return this.setState({data: displayName , rowCountLength: displayName.length })
		
	};

	render() {

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
						      		</Select>
						      	</FormControl>
						      	<FormControl>
						      		<Input
						      			classes={{ root: classes.inputFilter }} 
						      			style={{ marginTop: 20, fontSize: '1.5rem' }}
						      			placeholder="Search"  
					        			onChange={this.handleFilterInput}/>
						      	</FormControl>
						      	<FormControl classes={{ root: classes.formFilter }} style={{ width: '20%' }}>
						      		<VirtualizedAutoSelector
						      		options={this.state.columns}
						      		value={this.state.selectedColumn}
						      		handleSelectColumn={this.handleSelectColumn} />
						      	</FormControl>
					      	</FormGroup>
			      		</form>
		    		</Grid>
					<Grid item xs={12}>
						<Paper classes={{ root: classes.paper }} elevation={1} style={{ height: 360, width: '100%' }}>
						<AutoSizer disableHeight>
						  {({ width }) => (
							<MultiGrid
							  {...this.state}
							  deferredMeasurementCache={cache}
							  cellRenderer={this._cellRenderer}
							  columnWidth={({index}) => index <= 1 ? 300 : 160 }
							  columnCount={this.state.roles.length}
							  enableFixedColumnScroll
							  enableFixedRowScroll
							  height={320}
							  rowHeight={({ index }) => index === 0 ? 48 : cache.defaultHeight}
							  overscanColumnCount={0}
        					  overscanRowCount={0}
							  rowCount={this.state.data.length}
							  styleBottomLeftGrid={{ backgroundColor: '#fafafa' }}
							  styleTopRightGrid={{ fontSize: 12 }}
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

	_cellRenderer({ columnIndex ,key, rowIndex, parent, style }) {
		
		const { classes } = this.props;	 
		let element;
		if (rowIndex === 0) {
			/*
			if (columnIndex <= 1) {
				return (
					<TableCell 
						classes={{ root: classes.headerCell }} 
						onClick={() => this.handleSort()} 
						component="div" 
						variant="head" 
						key={key} 
						style={{ ...style }}>
							<Typography style={{ fontSize: '1.2rem' }} component="h2" variant="display1">
								{this.state.roles[columnIndex].name}
							</Typography>	  				
						<ArrowDirection direction={this.state.direction} />						    
					</TableCell>
				);
			}
			return (
				
				<TableCell 
					classes={{ root: classes.headerCell }} 
					onClick={() => this.handleSort()}  
					component="div" 
					variant="head" 
					key={key} 
					style={{ ...style }}>
						<Typography style={{ fontSize: '1.2rem' }} component="h2" variant="display1">
							{this.state.roles[columnIndex].name}
						</Typography>
						<ArrowDirection direction={this.state.direction} />		    
				</TableCell>				   
				
			);*/
		   	return ( columnIndex <= 1 ? (

		  			<TableCell 
						classes={{ root: classes.headerCell }} 
						onClick={() => this.handleSort()} 
						component="div" 
						variant="head" 
						key={key} 
						style={{ ...style }}>
							<Typography style={{ fontSize: '1.2rem' }} component="h2" variant="display1">
								{this.state.roles[columnIndex].name}
							</Typography>	  				
						<ArrowDirection direction={this.state.direction} />						    
					</TableCell>
		  	) :(

		  		<TableCell 
					classes={{ root: classes.headerCell }} 
					onClick={() => this.handleSort()}  
					component="div" 
					variant="head" 
					key={key} 
					style={{ ...style }}>
						<Typography style={{ fontSize: '1.2rem' }} component="h2" variant="display1">
							{this.state.roles[columnIndex].name}
						</Typography>
						<ArrowDirection direction={this.state.direction} />		    
				</TableCell>

		  	));
		  	
		} 
		if (this.state.data[rowIndex].roles !== undefined ) {

			return (
				<CellMeasurer cache={cache} columnIndex={columnIndex} key={key} parent={parent} rowIndex={rowIndex - 1}>
				  	{({ measure }) => (
						<TableCell 
							classes={{ root: classes.rowCell }}  
							onLoad={measure} 
							component="div" 
							variant="body" 
							key={key} 
							style={{
								...style
							}}>
								{columnIndex <= 1 ? 
									(	<div style={{ display: 'flex' }}>
										<Typography 
											style={{ fontSize: '1.2rem' }}
											align="center"
											variant="body2">
											{this.state.data[rowIndex - 1].roles[columnIndex].name}
										</Typography>
										</div>
									) : 
									(

										<input type="checkbox" 
											rowid={rowIndex}
											columnid={columnIndex}
											userid={this.state.data[rowIndex - 1].id}
											roleid={this.state.data[rowIndex - 1].roles[columnIndex].id}
											checked={ this.state.data[rowIndex - 1].roles[columnIndex].checked } 
											onChange={this.handleChange('checked')}
											value={this.state.data[rowIndex - 1].username} /> 
									)
								}
						</TableCell>
						
				  )}
				</CellMeasurer>
			);
		}

  }
}

VirtualizedUserRoleTable.propTypes = {
	allusers: PropTypes.array,
	allpermissions: PropTypes.array
};

export default withStyles(materialStyles)(VirtualizedUserRoleTable);
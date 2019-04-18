import React from 'react';
import PropType from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Collapse, Typography } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';



class FAQList extends React.Component {
    state = {
        list: this.props.list,
    };

    showHideAnswer = (name, open) => {
        const list = [ ...this.state.list ].map(key => key.name === name ? { ...key, open: !open } : key);
        this.setState({ list });
    }

    render() {
        const { classes }  = this.props;
        const { list } = this.state;

        return (
            <div className="row">
                <div className="col-xs-12">
                    <List className={classes.root}>
                        {list.map((key, position) => (
                            <div key={position}>
                                <ListItem style={{ paddingTop: 20, paddingBottom: 20 }} button onClick={() => this.showHideAnswer(key.name, key.open)}>
                                    <ListItemText primary={<Typography variant="title">{key.question}</Typography>} />
                                    {key.open ? <Remove style={{ color: '#00838F'}} /> : <Add style={{ color: '#00838F'}} />}
                                </ListItem>
                                <Collapse in={key.open} timeout="auto" unmountOnExit>
                                    <List style={{ backgroundColor: '#dfe6ee' }} component="div" disablePadding>
                                        <ListItem className={classes.nested}>
                                           <ListItemText primary={<Typography variant="body1">{key.answer}</Typography>} />
                                        </ListItem>
                                    </List>
                                </Collapse>
                            </div>
                        ))}
                    </List>
                </div>
            </div>
        );
    }
}

FAQList.propTypes ={
    classes: PropType.object.isRequired,
    list: PropType.array.isRequired,
};

const materialStyles = theme => ({
    root: {
        witdh: '100%',
        maxWidth: 1400,
        // backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    addRemove: {
    	color: '#00838F',
    },
});

export default withStyles(materialStyles)(FAQList);

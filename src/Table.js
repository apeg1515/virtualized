import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, SortDirection, Table, ScrollSync } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';


const STYLE = {
  border: '1px solid #ddd',
};
const STYLE_BOTTOM_LEFT_GRID = {
  borderRight: '2px solid #aaa',
  backgroundColor: '#f7f7f7',
};
const STYLE_TOP_LEFT_GRID = {
  borderBottom: '2px solid #aaa',
  borderRight: '2px solid #aaa',
  fontWeight: 'bold',
};
const STYLE_TOP_RIGHT_GRID = {
  borderBottom: '2px solid #aaa',
  fontWeight: 'bold',
};



const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {

  state = {
      fixedColumnCount: 2,
      fixedRowCount: 1,
      scrollToColumn: 0,
      scrollToRow: 0,
  };

  getRowClassName = ({ index }) => {
    const { classes, rowClassName, onRowClick } = this.props;

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { headerHeight, columns, classes, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: 'asc',
      [SortDirection.DESC]: 'desc',
    };

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
          {label}
        </TableSortLabel>
      ) : (
        label
      );

    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        {inner}
      </TableCell>
    );
  };

  render() {
    const state = this.state;
    const { classes, columns, ...tableProps  } = this.props;
    return (
        <AutoSizer>
          {({ height, width }) => (
            <Table
              className={classes.table}
              height={height}
              width={width}
              {...tableProps}
              rowClassName={this.getRowClassName}
            >
              {columns.map(({ cellContentRenderer = null, className, dataKey, ...other }, index) => {
                let renderer;
                if (cellContentRenderer != null) {
                  renderer = cellRendererProps =>
                    this.cellRenderer({
                      cellData: cellContentRenderer(cellRendererProps),
                      columnIndex: index,
                    });
                } else {
                  renderer = this.cellRenderer;
                }

                return (
                  <Column
                    key={dataKey}
                    {...state}
                    style={STYLE}
                    enableFixedColumnScroll
                    enableFixedRowScroll
                    styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
                    styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
                    styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
                    headerRenderer={headerProps =>
                      this.headerRenderer({
                        ...headerProps,
                        columnIndex: index,
                      })
                    }
                    className={classNames(classes.flexContainer, className)}
                    cellRenderer={renderer}
                    dataKey={dataKey}
                    {...other}
                  />
                );
              })}
            </Table>
          )}
        </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func,
};

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 56,
};

const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

const data = [
  ['Frozen yoghurt', 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0,],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0,],
  ['Eclair', 262, 16.0, 24, 6.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0,],
  ['Cupcake', 305, 3.7, 67, 4.3, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0,],
  ['Gingerbread', 356, 16.0, 49, 3.9, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0,],
];

let id = 0;
function createData(dessert, calories, fat, carbs, protein, red, blue, green, black, purple, orange, brown, yellow, Lester, Felix, Alex, Blake, Ivan, Melvin, Nefty, Noel, Mom, Dad, Grandma, Grandpa, Goku, Alita, Gohan, Vergita ) {
  id += 1;
  return { id, dessert, calories, fat, carbs, protein, red, blue, green, black, purple, orange, brown, yellow, Lester, Felix, Alex, Blake, Ivan, Melvin, Nefty, Noel, Mom, Dad, Grandma, Grandpa , Goku, Alita, Gohan, Vergita};
}

const rows = [];

for (let i = 0; i < 2; i += 1) {
  const randomSelection = data[Math.floor(Math.random() * data.length)];
  rows.push(createData(...randomSelection));
}

function ReactVirtualizedTable() {
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <WrappedVirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        onRowClick={event => console.log(event)}
        columns={[
          {
            width: 200,
            flexGrow: 1.0,
            label: 'Dessert',
            dataKey: 'dessert',
          },
          {
            width: 120,
            label: 'Calories (g)',
            dataKey: 'calories',
            numeric: true,
          },
          {
            width: 120,
            label: 'Fat (g)',
            dataKey: 'fat',
            numeric: true,
          },
          {
            width: 120,
            label: 'Carbs (g)',
            dataKey: 'carbs',
            numeric: true,
          },
          {
            width: 120,
            label: 'Protein (g)',
            dataKey: 'protein',
            numeric: true,
          },
                   {
            width: 120,
            label: 'Red (r)',
            dataKey: 'red',
            numeric: true,
          },
          {
            width: 120,
            label: 'Blue (b)',
            dataKey: 'blue',
            numeric: true,
          },
          {
            width: 120,
            label: 'Green (g)',
            dataKey: 'green',
            numeric: true,
          },
          {
            width: 120,
            label: 'Black (b)',
            dataKey: 'black',
            numeric: true,
          },
          {
            width: 120,
            label: 'Purple (p)',
            dataKey: 'purple',
            numeric: true,
          },
          {
            width: 120,
            label: 'Orange (o)',
            dataKey: 'orane',
            numeric: true,
          },
          {
            width: 120,
            label: 'Brown (b)',
            dataKey: 'brown',
            numeric: true,
          },
          {
            width: 120,
            label: 'Yellow (b)',
            dataKey: 'yellow',
            numeric: true,
          },
          {
            width: 120,
            label: 'Blake (p)',
            dataKey: 'purple',
            numeric: true,
          },
          {
            width: 120,
            label: 'Lester (o)',
            dataKey: 'orane',
            numeric: true,
          },
          {
            width: 120,
            label: 'Felix (b)',
            dataKey: 'brown',
            numeric: true,
          },
          {
            width: 120,
            label: 'Alex (b)',
            dataKey: 'yellow',
            numeric: true,
          },
           {
            width: 120,
            label: 'Ivan (p)',
            dataKey: 'purple',
            numeric: true,
          },
          {
            width: 120,
            label: 'Melvin (o)',
            dataKey: 'orane',
            numeric: true,
          },
          {
            width: 120,
            label: 'Nefty (b)',
            dataKey: 'brown',
            numeric: true,
          },
          {
            width: 120,
            label: 'Noel (b)',
            dataKey: 'yellow',
            numeric: true,
          },
          {
            width: 120,
            label: 'Mom (p)',
            dataKey: 'purple',
            numeric: true,
          },
          {
            width: 120,
            label: 'Dad (o)',
            dataKey: 'orane',
            numeric: true,
          },
          {
            width: 120,
            label: 'Grandma (b)',
            dataKey: 'brown',
            numeric: true,
          },
          {
            width: 120,
            label: 'Grandpa (b)',
            dataKey: 'yellow',
            numeric: true,
          },
                    {
            width: 120,
            label: 'Goku (p)',
            dataKey: 'purple',
            numeric: true,
          },
          {
            width: 120,
            label: 'Alita (o)',
            dataKey: 'orane',
            numeric: true,
          },
          {
            width: 120,
            label: 'Gohan (b)',
            dataKey: 'brown',
            numeric: true,
          },
          {
            width: 120,
            label: 'Vergita (b)',
            dataKey: 'yellow',
            numeric: true,
          },
        ]}
      />
    </Paper>
  );
}

export default ReactVirtualizedTable;
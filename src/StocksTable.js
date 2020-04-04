import React from 'react';
import { pure } from 'recompose';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

function StocksTable(props) {
    const { stocks } = props;
    const classes = useStyles();
    const [rowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            {
                stocks.length > 0 &&
                <Paper>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Наименование артикула</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stocks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, stockKey) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={stockKey}
                                        >
                                            <TableCell>
                                                {row.WareFullName}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10]}
                        component="div"
                        count={stocks.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                    />
                </Paper>
            }
        </div>

    );


}


export default pure(StocksTable);
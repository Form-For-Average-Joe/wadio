import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

const PastExerciseTable = ({ rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <TableContainer component={Paper} sx={{borderRadius: 3}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Time</TableCell>
                        <TableCell align="center">Exercise</TableCell>
                        <TableCell align="center">Reps</TableCell>
                        <TableCell align="center">Duration</TableCell>
                        <TableCell align="center">Calories</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{row.Date}</TableCell>
                            <TableCell align="center">{row.Time}</TableCell>
                            <TableCell align="center">{row.Exercise}</TableCell>
                            <TableCell align="center">{row.Reps}</TableCell>
                            <TableCell align="center">{row.Duration}</TableCell>
                            <TableCell align="center">{row.Calories}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[5, 10, 15]}
                            labelRowsPerPage={<span>Rows:</span>}
                            labelDisplayedRows={({ page }) => {
                                return `Page: ${page + 1}`;
                            }}
                            backIconButtonProps={{
                                color: "secondary"
                            }}
                            nextIconButtonProps={{ color: "secondary" }}
                            SelectProps={{
                                inputProps: {
                                    "aria-label": "page number"
                                }
                            }}
                            showFirstButton={true}
                            showLastButton={true}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default PastExerciseTable;
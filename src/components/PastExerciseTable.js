import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const PastExerciseTable = ({rows}) => {
    return (
        <TableContainer component={Paper}>
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
                    {rows.map((row) => (
                        <TableRow
                            key={row.TimeStamp}
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
            </Table>
        </TableContainer>
    );
}

export default PastExerciseTable;
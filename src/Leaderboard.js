import { Avatar, Box } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import logo from './assets/OrbitalLogo.png';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { difficulties, exercises, typesOfRanking } from './util';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

//todo need to maintain cumulative (update query), personal best (write) and last attempt (write) in profile
// device --> first to firestore, second to server to update the red-black
// friends
// need to maintain all previous exercises
// https://dribbble.com/tags/mobile_leaderboard
// https://dribbble.com/shots/14650665-Daily-UI-Leaderboard/attachments/6345922?mode=media
// add a label/marker for friends, and a button to only show friends vs global
// keep pagination, or infinite scrolling?
// select sort by personal best (divide reps by time to get reps/sec, or display for a specific time like 1 min) or cumulative reps done
// need to store exercise datestamp, time when leaderboard function was last run, then access the relevant rows to be added to the leaderboard
const columns = [
  { id: 'rank', label: 'rank' },
  { id: 'name', label: 'Name' },
  // { id: 'exercise', label: 'Exercise' },
  { id: 'reps', label: 'Reps' },
  // {
  // id: 'duration',
  // label: 'Duration',
  // align: 'right',
  // minWidth: 170
  // },
];

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "#555555",
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const GenericSelectionMenu = ({ nameOfVariable, options, variableSelected, setVariableSelected }) => {
  const [anchorElVariable, setAnchorElVariable] = useState(null);
  const openVariable = Boolean(anchorElVariable);
  const handleClickVariable = (event) => {
    setAnchorElVariable(event.currentTarget);
  };
  const handleCloseVariable = () => {
    setAnchorElVariable(null);
  };
  const handleSelectVariable = (index) => {
    setVariableSelected(index);
    handleCloseVariable();
  };

  return (
    <>
      <Button
        id={nameOfVariable + "-selection-button"}
        aria-controls={openVariable ? nameOfVariable + '-selection-button' : undefined}
        aria-haspopup="true"
        aria-expanded={openVariable ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClickVariable}
        endIcon={<KeyboardArrowDownIcon/>}
      >
        {options[variableSelected]}
      </Button>
      <StyledMenu
        id={nameOfVariable + "-selection-menu"}
        MenuListProps={{
          'aria-labelledby': nameOfVariable + '-selection-menu',
        }}
        anchorEl={anchorElVariable}
        open={openVariable}
        onClose={handleCloseVariable}
      >
        {options.map((option, index) =>
          <MenuItem key={option} onClick={() => handleSelectVariable(index)} disableRipple>
            {option}
          </MenuItem>
        )}
      </StyledMenu>
    </>
  );
}

export default function Leaderboard() {
  const [exerciseSelectedIndex, setExerciseSelectedIndex] = useState(0);
  // const [difficultySelectedIndex, setDifficultySelectedIndex] = useState(1);
  // const [typeOfRanking, setTypeOfRanking] = useState(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [rowData, setRowData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const getLeaderboardData = async () => {
      const makeReq = async () => await axios.get('http://ec2-54-169-153-36.ap-southeast-1.compute.amazonaws.com/' + exercises[exerciseSelectedIndex] + '/leaderboard');
      try {
        const { data } = await makeReq();
        setRowData(data);
      } catch (err) {
        console.log("Error fetching leaderboard data")
      }
    };
    getLeaderboardData();
  }, [exerciseSelectedIndex])

  return (
    <Paper sx={{ width: '100%', overflow: 'scroll' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', my: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 } }}>
        <GenericSelectionMenu nameOfVariable={'exercise'} options={exercises} variableSelected={exerciseSelectedIndex} setVariableSelected={setExerciseSelectedIndex} />
        {/*<GenericSelectionMenu nameOfVariable={'difficulty'} options={difficulties} variableSelected={difficultySelected} setVariableSelected={setDifficultySelected} />*/}
        {/*<GenericSelectionMenu nameOfVariable={'typeOfRanking'} options={typesOfRanking} variableSelected={typeOfRanking} setVariableSelected={setTypeOfRanking} />*/}
      </Box>
      <TableContainer>
        <Table /*stickyHeader*/ aria-label="sticky table">
          <TableBody>
            {rowData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell key={row.uid} /*align={column.align}*/>
                      <Typography variant={"h6"}>{row.rank}</Typography>
                    </TableCell>
                    <TableCell>
                      <Avatar variant="rounded" src={logo}/>
                    </TableCell>
                    <TableCell>
                      <Typography variant={"h6"}>{row.uid}</Typography>
                      <Typography>{row.results + ' reps'}</Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rowData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

/*
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>


                                // columns.map((column) => {
                      //   const value = row[column.id];
                      //   return (
                      //     <TableCell key={column.id} align={column.align}>
                      //       {column.format && typeof value === 'number'
                      //        ? column.format(value)
                      //        : value}
                      //     </TableCell>
                      //   );
                      // })
 */

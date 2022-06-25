import { Avatar, Box } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useLocation, Link } from "react-router-dom";
import { useUser } from "reactfire";
import { exercisesWithCalories, exercisesWithCaloriesTitleCase } from './util';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GenericProfileButton from './components/GenericProfileButton';

//todo need to maintain personal best (write) and last attempt (write) in profile
// select sort by personal best (divide reps by time to get reps/sec, or display for a specific time like 1 min) or cumulative reps done
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

const GenericSelectionMenu = ({
                                nameOfVariable,
                                options,
                                variableSelected,
                                setVariableSelected,
                                handleSelectVariableCallback
                              }) => {
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
    handleSelectVariableCallback();
  };

  return (
    <>
      <GenericProfileButton
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
      </GenericProfileButton>
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

const getUserTableRow = (currentUserData, index, currentUserUid, displayString) => {
  const isCurrentUserRow = currentUserData.uid === currentUserUid;
  const rowDisplayName = currentUserData.nickname || currentUserData.uid;
  const getCurrentUserDisplayName = isCurrentUserRow ? rowDisplayName + ' (You)' : rowDisplayName;
  const tableRowSx = { textDecoration: 'none' };
  return <TableRow sx={isCurrentUserRow ? { bgcolor: '#83d6fc', ...tableRowSx } : tableRowSx} hover
                   component={Link}
                   to={'/profile/' + currentUserData.uid}
                   tabIndex={0}
                   key={index}>
    <TableCell align={'center'} key={currentUserData.uid} /*align={column.align}*/>
      <Typography variant={"h6"}>{currentUserData.rank}</Typography>
    </TableCell>
    <TableCell>
      {currentUserData.photoURL ? <Avatar style={{ alignItems: "center", justifyContent: "center", display: "flex" }}
                                          variant="rounded" src={currentUserData.photoURL}/> :
       <Avatar><AccountCircleIcon/></Avatar>}
    </TableCell>
    <TableCell>
      <Typography variant={"h6"}>{getCurrentUserDisplayName}</Typography>
      <Typography>{currentUserData.results + ' ' + displayString}</Typography>
    </TableCell>
  </TableRow>
}

export default function LeaderboardDisplay() {
  const { status, data: user } = useUser();
  const { state } = useLocation();

  const [exerciseSelectedIndex, setExerciseSelectedIndex] = useState(0);
  // const [difficultySelectedIndex, setDifficultySelectedIndex] = useState(1);
  // const [typeOfRanking, setTypeOfRanking] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [leaderboardId, setLeaderboardId] = useState('');

  const displayString = exercisesWithCalories()[exerciseSelectedIndex];

  const [rowData, setRowData] = useState([]);
  const [count, setCount] = useState(rowsPerPage);
  const [currentUserData, setCurrentUserData] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const getLeaderboardData = async () => {
      const makeReq = async () => await axios.get('https://13.228.86.60/' +
        exercisesWithCalories()[exerciseSelectedIndex] + '/leaderboard/' + leaderboardId + '/' + rowsPerPage + '/' +
        page);
      try {
        const { data } = await makeReq();
        setRowData(data.rankings);
        setCount(data.totalNumberOfElements);
      } catch (err) {
        console.log("Error fetching leaderboard data");
      }
    };
    const getCurrentUserData = async () => {
      const makeReq = async () => await axios.get('https://13.228.86.60/' + exercisesWithCalories()[exerciseSelectedIndex] + '/user/' + user.uid);
      try {
        const res = await makeReq();
        if (res?.data) setCurrentUserData(res.data);
      } catch (err) {
        console.log("Error fetching user");
      }
    };
    if (user) getCurrentUserData();
    if (leaderboardId) getLeaderboardData();
  }, [exerciseSelectedIndex, page, rowsPerPage, leaderboardId, user]);

  useEffect(() => {
    if (state?.leaderboardId) {
      setLeaderboardId(state.leaderboardId);
    }
  }, [state]);

  if (status === 'loading') {
    return <p>Loading</p>;
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', my: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 } }}>
        <GenericSelectionMenu nameOfVariable={'exercise'} options={exercisesWithCaloriesTitleCase()}
                              variableSelected={exerciseSelectedIndex} setVariableSelected={setExerciseSelectedIndex}
                              handleSelectVariableCallback={() => setPage(0)}/>
        {/*<GenericSelectionMenu nameOfVariable={'difficulty'} options={difficulties} variableSelected={difficultySelected} setVariableSelected={setDifficultySelected} />*/}
        {/*<GenericSelectionMenu nameOfVariable={'typeOfRanking'} options={typesOfRanking} variableSelected={typeOfRanking} setVariableSelected={setTypeOfRanking} />*/}
      </Box>
      <TableContainer>
        <Table aria-label="leaderboard">
          <TableBody>
            {rowData
              .map((row, index) =>
                getUserTableRow(row, index, user.uid, displayString))}
            {currentUserData ? !(currentUserData.rank >= ((page * rowsPerPage) + 1) && currentUserData.rank <= (page + 1) * rowsPerPage) &&
              <>
                <TableRow>
                  <TableCell
                    align={'center'}>
                    <Typography component={'h1'}>
                      {'⋮'}
                    </Typography>
                  </TableCell>
                  <TableCell>{'⋮'}</TableCell>
                  <TableCell>{'⋮'}</TableCell>
                </TableRow>{getUserTableRow(currentUserData, -1, user.uid, displayString)}
              </> : null}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

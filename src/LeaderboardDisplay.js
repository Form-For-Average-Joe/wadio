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
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useUser } from "reactfire";
import LoadingSpinner from "./components/LoadingSpinner";
import { exercisesWithCalories, exercisesWithCaloriesTitleCase } from './util';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

//todo need to maintain personal best (write) and last attempt (write) in profile
// select sort by personal best (divide reps by time to get reps/sec, or display for a specific time like 1 min) or cumulative reps done

const getUserTableRow = (rowUserData, index, currentUserUid, displayString) => {
  const isCurrentUserRow = rowUserData.uid === currentUserUid;
  const rowDisplayName = rowUserData.nickname || rowUserData.uid;
  const getCurrentUserDisplayName = isCurrentUserRow ? rowDisplayName + ' (You)' : rowDisplayName;
  const tableRowSx = { textDecoration: 'none' };

  return <TableRow sx={isCurrentUserRow ? { bgcolor: '#83d6fc', ...tableRowSx } : tableRowSx} hover
    {...(!rowUserData.isAnonymous && { component: Link, to: '/profile/' + rowUserData.uid })}
                   tabIndex={0}
                   key={index}>
    <TableCell align={'center'} key={rowUserData.uid} /*align={column.align}*/>
      <Typography variant={"h6"}>{rowUserData.rank}</Typography>
    </TableCell>
    <TableCell>
      {rowUserData.photoURL ? <Avatar style={{ alignItems: "center", justifyContent: "center", display: "flex" }}
                                          variant="rounded" src={rowUserData.photoURL}/> :
       <Avatar><AccountCircleIcon/></Avatar>}
    </TableCell>
    <TableCell>
      <Typography variant={"h6"}>{getCurrentUserDisplayName}</Typography>
      <Typography>{rowUserData.results + ' ' + displayString}</Typography>
    </TableCell>
  </TableRow>
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function GetTableContainer(user, exercise, leaderboardId) {
  const [rowData, setRowData] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(rowsPerPage);
  const [page, setPage] = useState(0);

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
        exercise + '/leaderboard/' + leaderboardId + '/' + rowsPerPage + '/' +
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
      const makeReq = async () => await axios.get('https://13.228.86.60/' + exercise + '/user/' + user.uid);
      try {
        const res = await makeReq();
        console.log(res.data)
        if (res?.data) setCurrentUserData(res.data);
        else setCurrentUserData(null);
        console.log(res.data)
      } catch (err) {
        console.log("Error fetching user");
      }
    };
    if (user) getCurrentUserData();
    if (leaderboardId) getLeaderboardData();
  }, [page, rowsPerPage, leaderboardId, user, exercise])

  // console.count("2")
  return (
    <>
      <TableContainer>
        <Table aria-label="leaderboard">
          <TableBody>
            {rowData
              .map((row, index) =>
                getUserTableRow(row, index, user.uid, exercise))}
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
                </TableRow>{getUserTableRow(currentUserData, -1, user.uid, exercise)}
              </> : null}
          </TableBody>
        </Table>
      </TableContainer>
      {/*Can shift the TablePagination out as it is common to all 3 tabs, but it breaks for some reason*/}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>);
}

export default function LeaderboardDisplay() {
  const { status, data: user } = useUser();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [tabValue, setTabValue] = useState(0);
  // const [difficultySelectedIndex, setDifficultySelectedIndex] = useState(1);
  // const [typeOfRanking, setTypeOfRanking] = useState(0);

  const leaderboardId = state?.leaderboardId;
  const leaderboadName = state?.leaderboardName;

  const handleTabValueChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (!leaderboardId) {
      navigate('/leaderboard', { replace: true }); // if user skips the selection, state will be empty, so redirect him back
    }
  }, [state, leaderboardId, navigate]);

  if (status === 'loading') {
    return <LoadingSpinner/>
  }

  // console.count("1")
  //todo This parent component renders twice for some reason
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Paper sx={{ width: '100%', maxWidth: { xs: '100vw', sm: '80vw', md: '70vw', lg: '60vw', xl: '60vw' } }}>
        <Typography variant={"h4"} sx={{ textAlign: "center", my: { xs: 1, sm: 2, md: 2, lg: 3, xl: 3 } }}>
          {'Leaderboard: ' + leaderboadName}
        </Typography>
        <Box sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: "center",
          alignItems: "center"
        }}> {/*//todo can change borderBottom and borderColour or remove them*/}
          <Tabs
            value={tabValue}
            onChange={handleTabValueChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {exercisesWithCaloriesTitleCase().map((exercise, index) =>
              <Tab key={index} label={exercise}/>
            )}
          </Tabs>
        </Box>
        {exercisesWithCalories().map((exercise, index) => {
            return <TabPanel key={index} value={tabValue} index={index}>
              {tabValue === index && GetTableContainer(user, exercise, leaderboardId)}
            </TabPanel>
          }
        )}
      </Paper>
    </Box>
  );
}

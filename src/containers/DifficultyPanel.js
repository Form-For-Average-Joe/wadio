import { useState } from "react";
import { useDispatch } from "react-redux";
import GenericSelectionMenu from "../components/GenericSelectionMenu";
import { setDifficultyLevel } from '../features/exercise/exerciseSlice';
import { Typography, Grid, Box } from '@mui/material';
import { difficulties } from '../util';

export default function DifficultyPanel() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const dispatch = useDispatch();

  return (
    <>
      <Grid container direction="column" sx={{ backgroundColor: "#FFFFFF" }}>
        <Grid item margin="auto" sx={{ paddingTop: "0.5rem" }}>
          <Typography margin="auto" variant="h4" sx={{ color: "#000000" }}>
            {'Difficulty'}
          </Typography>
        </Grid>
        <Grid item margin="auto">
          <Box sx={{ display: 'flex', justifyContent: 'space-around', my: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 } }}>
            <GenericSelectionMenu nameOfVariable={'difficulty'} options={difficulties}
                                  variableSelected={selectedIndex} setVariableSelected={setSelectedIndex}
                                  handleSelectVariableCallback={(variableSelected) => dispatch(setDifficultyLevel(variableSelected))}/>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

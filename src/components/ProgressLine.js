import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Typography, Grid, Box } from "@mui/material";

const steps = [
  {
    level: "I",
    name: "Rookie",
    //calorieRequirement: 0
  },
  {
    level: "II",
    name: "Regular",
    //calorieRequirement: 300
  },
  {
    level: "III",
    name: "Semi-Pro",
    //calorieRequirement: 800
  },
  {
    level: "IV",
    name: "Pro",
    //calorieRequirement: 1600
  },
  {
    level: "V",
    name: "Master",
    //calorieRequirement: 3000
  },
  {
    level: "VI",
    name: "Legend",
    //calorieRequirement: 5000
  }
];


const ProgressLine = ({cal}) => {
  return (
    <Box display="flex" justifyContent="center">
      <div style={{ margin: 50 }}>
        <ProgressBar
          width="65vw"
          percent={100 * (parseInt(cal) / 5000)}
          filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
        >
          {steps.map((step, index, arr) => {
            return (
              <Step
                position={100 * (index / arr.length)}
                transition="scale"
                children={({ accomplished }) => (
                  <Grid container spacing={1} direction="column" alignItems="center" sx={{paddingTop: "1.5rem"}}>
                    <Grid item>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "30%",
                          width: 40,
                          height: 40,
                          color: "white",
                          backgroundColor: accomplished ? "green" : "gray"
                        }}
                      >
                        {step.level}
                      </div>
                    </Grid>
                    <Grid item>
                      <Typography>
                        {step.name}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              />
            );
          })}
        </ProgressBar>
      </div>
      </Box>
  );
}

export default ProgressLine;



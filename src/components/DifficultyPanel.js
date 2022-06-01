import {Button, Card, Grid, Typography} from '@mui/material';
import React, {useState} from 'react';
import {store} from "../app/store";
import {setDifficultyLevel} from "../features/userValues/userValuesSlice";

const DifficultyPanel = () => {
    const [difficulty, setDifficulty] = useState(1);

    function defineDifficulty(e) {
        switch (e) {
            case 0:
                store.dispatch(setDifficultyLevel(0));
                return 'Hellish';
            case 1:
                store.dispatch(setDifficultyLevel(1));
                return 'IPPT';
            case 2:
                store.dispatch(setDifficultyLevel(2));
                return 'Heavenly';
        }
    }

    return (
        <Card>
            <Grid container spacing={1} direction="column" alignItems="center">
                <Grid item style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
                    <Typography variant="h4">
                        {defineDifficulty(difficulty)}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained"
                        style={{ minWidth: "6rem" }}
                        onClick={() => setDifficulty(2)}
                    >Heavenly</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained"
                        style={{ minWidth: "6rem" }}
                        onClick={() => setDifficulty(1)}>IPPT</Button>
                </Grid>
                <Grid item style={{ paddingBottom: "2rem" }}>
                    <Button variant="contained"
                        style={{ minWidth: "6rem" }}
                        onClick={() => setDifficulty(0)}>Hellish</Button>
                </Grid>
            </Grid>
        </Card>
    )
}

export default DifficultyPanel;
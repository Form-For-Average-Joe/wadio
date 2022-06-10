import {Button, Card, Grid, Typography} from '@mui/material';
import {useState} from 'react';
import {useDispatch} from "react-redux";
import {setDifficultyLevel} from "../features/exercise/exerciseSlice";

const DifficultyPanel = () => {
    const [difficulty, setDifficulty] = useState(1);
    const dispatch = useDispatch();

    function defineDifficulty(e) {
        switch (e) {
            case 0:
                dispatch(setDifficultyLevel(0));
                return 'Hellish';
            case 1:
                dispatch(setDifficultyLevel(1));
                return 'IPPT';
            case 2:
                dispatch(setDifficultyLevel(2));
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
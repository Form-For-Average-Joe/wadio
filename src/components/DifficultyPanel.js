import {Button, Card, Grid, Typography} from '@mui/material';
import React, {useState} from 'react';

const DifficultyPanel = () => {
    const [difficulty, setDifficulty] = useState(0);

    function defineDifficulty(e) {
        switch (e) {
            case 0:
                return 'Heavenly';
            case 1:
                return 'IPPT';
            case 2:
                return 'Hellish';
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
                        onClick={() => setDifficulty(0)}
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
                        onClick={() => setDifficulty(2)}>Hellish</Button>
                </Grid>
            </Grid>
        </Card>
    )
}

export default DifficultyPanel;
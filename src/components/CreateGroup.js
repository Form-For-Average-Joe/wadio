import { useState } from 'react';
import { Typography, Box, TextField, Button, Stack } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { isInvalidTextInput, isGroupCodePresent } from "../util";

export default function CreateGroup({createRelationBetweenGroupCodeAndUser}) {
    const [newCode, setNewCode] = useState("");
    const [leaderboardName, setLeaderboardName] = useState("");

    const isLeaderboardNameFormValid = () => {
        return !(isInvalidTextInput(leaderboardName));
    };

    const generateNewCode = async () => {
        let res = false;
        let possibleGroupCode;
        while (!res) {
            possibleGroupCode = uuidv4();
            res = await isGroupCodePresent(possibleGroupCode);
        }
        setNewCode(possibleGroupCode);
    }

    const submitNewCode = (e) => {
        if (isLeaderboardNameFormValid()) {
            createRelationBetweenGroupCodeAndUser(newCode, leaderboardName);
        } else {
            e.preventDefault();
        }
    }

    return (
        <>
            <Typography align="center" variant="h6" sx={{ paddingTop: "2rem", color: "#000000" }}>Create a New
                Leaderboard</Typography>
            {newCode ?
                <>
                    <Stack
                        component="form"
                        alignItems="center"
                        sx={{
                            paddingLeft: "1rem", paddingRight: "1rem", paddingBottom: "1rem",
                            backgroundColor: "#CCCCCC", margin: "auto", marginTop: "1rem"
                        }}
                        spacing={2}
                        autoComplete="off">
                        <Typography variant="h5">{newCode}</Typography>
                        <TextField
                            required
                            label="Leaderboard Name"
                            value={leaderboardName}
                            error={isInvalidTextInput(leaderboardName)}
                            variant="outlined"
                            type={'text'}
                            size="small"
                            sx={{ backgroundColor: "#FFFFFF", marginTop: "0.5rem" }}
                            onChange={(e) => {
                                setLeaderboardName(e.target.value);
                                // updateProfile(user, {displayName: e.target.value});
                            }}
                        />
                    </Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained"
                            type="submit"
                            label="Submit"
                            sx={{ backgroundColor: "#666666", '&:hover': { backgroundColor: "#FFA500" } }}
                            onClick={submitNewCode}>
                            Use Group Code
                        </Button>
                    </Box>
                </> : <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "1rem" }}>
                    <Button variant="contained"
                        sx={{ backgroundColor: "#666666", '&:hover': { backgroundColor: "#FFA500" } }}
                        onClick={generateNewCode}>
                        Generate Group Code
                    </Button>
                </Box>}
        </>
    );
}

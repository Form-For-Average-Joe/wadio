import { get } from "axios";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useState } from 'react';
import { Typography, Grid, Box, TextField, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid/non-secure';
import { useUser } from "reactfire";
import { associateGroupCodeToUserId, associateUserIdToGroupCode, isInvalidTextInput } from "../util";

export const CreateGroup = () => {
    const { status, data: user } = useUser();
    const [existingCode, setExistingCode] = useState("");
    const [newCode, setNewCode] = useState("");
    const [leaderboardName, setLeaderboardName] = useState("");
    const navigate = useNavigate();

    const isLeaderboardNameFormValid = () => {
        return !(isInvalidTextInput(leaderboardName));
    };

    // need to filter res by code

    // Make it an expiring group code

    const isGroupCodePresent = async (groupCode) => await get('https://13.228.86.60/isKeyPresent/' + groupCode);

    const createRelationBetweenGroupCodeAndUser = (codeToStore, leaderboardName) => {
        const ref = doc(getFirestore(), user.uid, 'groupCodes');
        getDoc(ref).then(async (docSnap) => {
            await associateGroupCodeToUserId(docSnap.data(), codeToStore, user.uid);
        })
            .then(async () => {
                await associateUserIdToGroupCode(codeToStore, user.uid, leaderboardName);
                navigate('/leaderboard');
            })
    }

    const generateNewCode = async () => {
        let res = false;
        let possibleGroupCode;
        while (!res) {
            possibleGroupCode = nanoid();
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
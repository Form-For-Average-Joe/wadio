import { get } from "axios";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useState } from 'react';
import { Typography, Grid, Box, TextField, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from "reactfire";
import { associateGroupCodeToUserId, associateUserIdToGroupCode, isInvalidTextInput } from "../util";

const JoinGroup = () => {
    const { status, data: user } = useUser();
    const [existingCode, setExistingCode] = useState("");
    const navigate = useNavigate();

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

    const addNewCodeToUser = async (e) => {
        let result;
        try {
            result = await isGroupCodePresent(existingCode);
        } catch (err) {
            e.preventDefault();
        }
        const { isKeyPresent } = result.data;
        if (isKeyPresent) {
            createRelationBetweenGroupCodeAndUser(existingCode, "");
        }
        else {
            e.preventDefault();
        }
        //else, download firestore leaderboard array, append and resend to firestore, replacing the previous version
        //then, goes to the leaderboard page, in which the new leaderboard should be included in the list
        //if not found, alert the user that the code is not found
    }

    return (
        <>
            <Typography align="center" variant="h6" sx={{ paddingTop: "2rem", color: "#000000" }}>Join a Private
                Leaderboard</Typography>
            <Stack
                component="form"
                alignItems="center"
                sx={{
                    width: "30ch",
                    backgroundColor: "#CCCCCC", margin: "auto", marginTop: "1rem"
                }}
                spacing={2}
                autoComplete="off"
            >
                <TextField
                    required
                    label="Group Code"
                    value={existingCode}
                    variant="outlined"
                    type={'text'}
                    size="small"
                    data-testid="add-group-code"
                    sx={{ backgroundColor: "#FFFFFF" }}
                    onChange={(e) => {
                        setExistingCode(e.target.value);
                    }}
                />
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "1rem" }}>
                <Button variant="contained"
                    type="submit"
                    label="Submit"
                    onClick={addNewCodeToUser}
                    sx={{ backgroundColor: "#666666", '&:hover': { backgroundColor: "#FFA500" } }}>
                    Join Group
                </Button>
            </Box>
        </>
    );
}

export default JoinGroup;
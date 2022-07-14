import { useState } from 'react';
import { Typography, Box, TextField, Button, Stack } from '@mui/material';
import { isGroupCodePresent } from "../util";

const JoinGroup = ({createRelationBetweenGroupCodeAndUser}) => {
    const [existingCode, setExistingCode] = useState("");

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
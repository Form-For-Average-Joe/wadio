import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useDispatch } from "react-redux";
import { setDifficultyLevel } from '../features/exercise/exerciseSlice';
import { Typography, Grid, Button } from '@mui/material';

const options = [
    'Hellish',
    'IPPT',
    'Heavenly',
];

export default function SimpleListMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        dispatch(setDifficultyLevel(index));
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Grid container direction="column" sx={{ backgroundColor: "#FFFFFF" }}>
                <Grid item margin="auto" sx={{ paddingTop: "0.5rem" }}>
                    <Typography margin="auto" variant="h4" sx={{ color: "#000000" }}>
                        {options[selectedIndex]}
                    </Typography>
                </Grid>
                <Grid item margin="auto">
                    <List
                        component="nav"
                        aria-label="Difficulty settings"
                        sx={{ backgroundColor: "#FFFFFF" }}
                    >
                        <ListItem>
                            <Button variant="contained" onClick={handleClickListItem}>
                                Select Difficulty
                            </Button>
                        </ListItem>
                    </List>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'lock-button',
                            role: 'listbox',
                        }}
                    >
                        {options.map((option, index) => (
                            <MenuItem
                                key={option}
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, index)}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </Grid>
            </Grid>
        </div>
    );
}

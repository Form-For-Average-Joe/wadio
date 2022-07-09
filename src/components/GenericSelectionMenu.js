import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import { useState } from "react";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    color: "#555555",
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const GenericSelectionMenu = ({nameOfVariable,
                                options,
                                variableSelected,
                                setVariableSelected,
                                handleSelectVariableCallback
                              }) => {
  const [anchorElVariable, setAnchorElVariable] = useState(null);
  const openVariable = Boolean(anchorElVariable);
  const handleClickVariable = (event) => {
    setAnchorElVariable(event.currentTarget);
  };
  const handleCloseVariable = () => {
    setAnchorElVariable(null);
  };
  const handleSelectVariable = (index) => {
    setVariableSelected(index);
    handleCloseVariable();
    handleSelectVariableCallback(index);
  };

  return (
    <>
      <Button
        id={nameOfVariable + "-selection-button"}
        aria-controls={openVariable ? nameOfVariable + '-selection-button' : undefined}
        aria-haspopup="true"
        aria-expanded={openVariable ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClickVariable}
        sx={{ backgroundColor: "#555555" }}
        endIcon={<KeyboardArrowDownIcon/>}
      >
        {options[variableSelected]}
      </Button>
      <StyledMenu
        id={nameOfVariable + "-selection-menu"}
        MenuListProps={{
          'aria-labelledby': nameOfVariable + '-selection-menu',
        }}
        anchorEl={anchorElVariable}
        open={openVariable}
        onClose={handleCloseVariable}
      >
        {options.map((option, index) =>
          <MenuItem key={option} selected={index === setVariableSelected} onClick={() => handleSelectVariable(index)}
                    disableRipple>
            {option}
          </MenuItem>
        )}
      </StyledMenu>
    </>
  );
}

export default GenericSelectionMenu;
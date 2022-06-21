import {Button} from '@mui/material';
import { styled } from '@mui/material/styles';

const GenericProfileButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#666666",
    color: "#FFFFFF",
    ':hover': {
        color: "#FFFFFF",
        backgroundColor: '#666666',
    },
}));

export default GenericProfileButton;
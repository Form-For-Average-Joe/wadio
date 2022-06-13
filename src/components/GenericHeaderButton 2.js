import {Button} from '@mui/material';
import { styled } from '@mui/material/styles';

const GenericHeaderButton = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    whiteSpace: 'nowrap' //whiteSpace nowrap renders button text on one line
}));

export default GenericHeaderButton;
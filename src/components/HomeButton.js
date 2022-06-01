import {Button} from '@mui/material';
import {Link} from 'react-router-dom';

const HomeButton = () => {
    return (
        <Button
            variant="contained"
            usage="header"
            component={Link} to="/"
        >
            Home
        </Button>
    )
}

export default HomeButton;
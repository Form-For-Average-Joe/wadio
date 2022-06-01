import {Button} from '@mui/material';
import {Link} from 'react-router-dom';

const DashboardButton = () => {
    return (
        <Button
            variant="contained"
            usage="header"
            component={Link} to="/dashboard"
        >
            Profile
        </Button>
    )
}

export default DashboardButton;
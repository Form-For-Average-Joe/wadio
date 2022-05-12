import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        color: 'white',
        margin: 0,
        paddingTop: 30,
        paddingBottom: 30,
        background: 'rgba(0, 0, 0, 1)',
    },
    container: {
        backgroundColor: theme.palette.background.teal,
        padding: theme.spacing(8, 0, 6),
    },
    buttons: {
        marginTop: '40px',
        background: 'rgba(20, 140, 20, 1)',
        color: "white",
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%',
    },
    cardContent: {
        flexGrow: 1,
        background: 'rgba(100, 100, 100, 1)',
        color: 'white',
    }
}));

export default useStyles;
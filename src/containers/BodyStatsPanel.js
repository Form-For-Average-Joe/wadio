import {Typography, Card, List, ListItem} from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ScaleIcon from '@mui/icons-material/Scale';
import HeightIcon from '@mui/icons-material/Height';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';

const BodyStatsPanel = ({stats}) => {
    const weightToPrint = stats.weight + ' kg';
    const heightToPrint = stats.height + ' cm';
    const bmiToPrint = parseFloat(weightToPrint) / ((parseFloat(heightToPrint) / 100) * (parseFloat(heightToPrint) / 100)) || 0;

    return (
        <Card sx={{paddingLeft: "1rem", paddingRight:"1rem"}}>
            <Typography variant="h6" align="center" style={{ paddingTop: "1rem" }}>
                Your Body Measurements
            </Typography>
            <Card style={{ marginBottom: "1rem" }}>
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <ScaleIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={weightToPrint} secondary="Weight" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <HeightIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={heightToPrint} secondary="Height" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <MonitorWeightIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={bmiToPrint.toFixed(2)} secondary="Body Measurement Index" />
                    </ListItem>
                </List>
            </Card>
        </Card>
    );
}

export default BodyStatsPanel;
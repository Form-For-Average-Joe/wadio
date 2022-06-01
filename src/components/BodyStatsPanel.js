import {Typography, Card, List, ListItem} from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ScaleIcon from '@mui/icons-material/Scale';
import HeightIcon from '@mui/icons-material/Height';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';

const weight = 30;
const height = 140;
const bmi = 18.2;

const BodyStatsPanel = () => {
    const weightToPrint = weight + ' kg';
    const heightToPrint = height + ' cm';
    const bmiToPrint = bmi + ' BMI';

    return (
        <Card>
            <Typography variant="h6" align="center" style={{ paddingTop: "1rem" }}>
                Your Body Measurements
            </Typography>
            <Card style={{ paddingLeft: "1rem" }}>
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
                        <ListItemText primary={bmiToPrint} secondary="Body Measurement Index" />
                    </ListItem>
                </List>
            </Card>
        </Card>
    );
}

export default BodyStatsPanel;
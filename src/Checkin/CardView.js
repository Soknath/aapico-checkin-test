import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import history from '../history';
import Typography from '@material-ui/core/Typography';
import AppBar from '../appBar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useGeolocation} from './GPSBackground';
import {API_URL} from '../constants';
import Loading from '../Loading';

const useStyles = makeStyles({
  root: {
    width: 450,
    marginTop: 65
  },
  media: {
    height: 300,
  },
});
export default function MediaCard(props) {
    const classes = useStyles();
    const state = useGeolocation();
    let user = JSON.parse(localStorage.getItem('user'));
    const { dataUri } = history.location.state;
    const [userAddress, setUserAddress] = useState("");
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    function dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
    }

    useEffect( () => {
        async function fetchData() {
            try {
                let address = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${state.latitude}&lon=${state.longitude}&accept-language=th`).then(res => res.json());
                setUserAddress(address.address);
            } catch (error) {
                console.log(error)
            }
        }
        if (state.latitude && state.longitude && !userAddress) fetchData();
    })

  async function submitData () {
        // alert(JSON.stringify(user));
        setLoading(true)
        let formData = new FormData();
        let blob = dataURItoBlob(dataUri);
        let file = new File( [blob], 'selfie.jpg', { type: 'image/jpeg' } )
        formData.append("files.avatar", file);
        formData.append("data", JSON.stringify({
            "empID": user.empID,
            "lastName": user.lastName,
            "firstName": user.firstName,
            "birthday": new Date(user.birthday),
            "tel": user.tel,
            "email": user.email,
            "gender": user.gender,
            "latitude": state.latitude,
            "longitude": state.longitude,
            "address": Object.values(userAddress).join (" "),
            "department": user.department,
            "company": user.company
        }));

        
        const rawResponse = await fetch(`${API_URL}/staff-locations`,{
            method: 'POST',
            body: formData
        });

        const content = await rawResponse.json();
        // alert(JSON.stringify(content));
        setLoading(false);
        if (content.statusCode && content.statusCode !== 200) {
            return setError(content.error)
        } else {
            return setOpen(true)
        }
        return content;
  }

  if (loading) {return(<Loading />)} 
  else {
    return (
        <>
            <AppBar back={true} title={"Re-Check & Submit"}/>
            
            <Grid container 
                justify="center"
                alignItems="center"
            >
            <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={dataUri}
                    title="Contemplative Reptile"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    <strong>{user.firstName + ' ' + user.lastName}</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Lat <strong>{state.latitude}</strong>
                    <br />
                    Lon <strong>{state.longitude}</strong>
                    <br />
                    Address: <strong>{Object.values(userAddress).join (" ")}</strong>
                    <br />
                    Employment ID: {user.empID}
                    <br />
                    Gender: {user.gender}
                    <br />
                    Tel: {user.tel}
                    <br />
                    Email: {user.email}
                    <br />
                    Birthday: {new Date(user.birthday).toLocaleDateString()}
                    <br />
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{display: "flex", justifyContent: "space-between"}}>
                <Button size="small" color="primary" onClick={() => history.goBack()} >
                Go Back
                </Button>
                <Button size="small" color="primary" onClick={() => submitData()} >
                Submit
                </Button>
            </CardActions>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Check in information"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {!error?"Successfully!!!":"Problems in submission"}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={() => {
                        setOpen(false);
                        return !error?history.push('./checkin'):null;
                    }} color="primary" autoFocus>
                    OK
                </Button>
                </DialogActions>
            </Dialog>
            
            </Grid>
        </>
    )};          
}
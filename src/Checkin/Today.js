import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ErrorIcon from '@material-ui/icons/Error';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import {API_URL} from '../constants';
import moment from 'moment';
import Loading from '../Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function InsetList() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem('user');

  const [data, setData] = useState(null);
  const startOfDay = moment().startOf('day').format();
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/staff-locations?empID=${user?JSON.parse(user).empID:""}&createdAt_gte=${startOfDay}`)
      .then(res => res.json())
      .then(response => {
        setData(response);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, []);


  if (loading) {
    return (<Loading />)
  } else {
    return (
        <List component="nav" className={classes.root} aria-label="contacts">
            {data?data.map((text, index) => (
            <ListItem key={text}>
                <ListItemIcon>
                    <AlarmOnIcon />
                </ListItemIcon>
                <ListItemText primary={new Date(text.createdAt).toLocaleDateString()} secondary={new Date(text.createdAt).toLocaleTimeString()}/>
            </ListItem>
            )):
            <ListItem button key={"error"}>
                <ListItemIcon><ErrorIcon /></ListItemIcon>
                <ListItemText primary={"no record found"} />
            </ListItem>
            }
        </List>
    )};
}
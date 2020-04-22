import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import SmsIcon from '@material-ui/icons/Sms';
import CardActions from '@material-ui/core/CardActions';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import history from '../history';
import CompanyList from '../Company/companyList';
import AppBar from '../appBar';
import Motion from '../motion';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '100%',
    margin: '15px',
  },
  media: {
    height: 140,
    paddingTop: '56.25%', // 16:9
  },
  appBarSpacer: theme.mixins.toolbar,
  rightButton: {
    marginLeft: 'auto !important',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const { data, index, filterCompany } = history.location.state;

  const openSMSMobile = (e) => {           
    window.open(`sms:${data.tel}`, '_top');
    return false;
  }

  if (document.activeElement instanceof HTMLElement){
    document.activeElement.blur()
  }

  if (data){
    return (
      <Motion>
      <div style={{overflowY: 'scroll', height: '100%'}}>
      <AppBar info={false} back={true} index={index} filterCompany={filterCompany}/>
      <div className={classes.appBarSpacer}/>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {data.name[0]}
            </Avatar>
          }
          title={data.name}
          subheader={data.position}
        />
        <CardMedia
          className={classes.media}
          image={data.img}
          title={data.name}
        >
        </CardMedia>
        <CardActions>
          <Typography variant="body2" color="textSecondary" component="p">
            Phone <br />
            {data.tel}
          </Typography>
          <div className={classes.rightButton}>
          <IconButton aria-label="make a call">
            <a href={`mailto:${data.email}`}><MailIcon /></a>
          </IconButton>
          <IconButton aria-label="sent a message" onClick={openSMSMobile} >
            <SmsIcon />
          </IconButton>
          <IconButton aria-label="make a call">
            <a href={`tel:${data.tel}`}><PhoneIcon /></a>
          </IconButton>
          </div>
        </CardActions>
      </Card>
      
      <Card className={classes.card}>
        <CompanyList company={data.company} />
      </Card>
      </div>
      </Motion>
    );
  } else {
    return null;
  }
}
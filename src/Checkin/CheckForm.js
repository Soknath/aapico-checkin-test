import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { withStyles, useTheme } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import NavigationIcon from '@material-ui/icons/Navigation';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import MapGL, {FlyToInterpolator, NavigationControl, GeolocateControl } from 'react-map-gl';
import Card from '@material-ui/core/Card';
import Motion from '../motion';
import AppBar from '../appBar';
import history from '../history';
import { Alert, AlertTitle } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import Drawer from './Drawer';
import Today from "./Today";

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    checkinButton: {
        position: 'absolute',
        bottom: 60
    },
    content: {
      display: 'flex',
      flexDirection: 'column'
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      padding: 10,
      textAlign: 'center'
    },
    margin: {
      margin: theme.spacing(2),
    },
    large: {
      width: '80px',
      height: '80px',
      boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'
    }
  });

const geolocateStyle = {
  position: 'absolute',
  top: 115,
  left: 0,
  margin: 10
};

const navStyle = {
  position: 'absolute',
  top: 50,
  left: 0,
  padding: '10px'
};


const navRightStyle = {
  position: 'absolute',
  top: 65,
  right: 50,
  padding: '10px'
};

const todayListStyle = {
  position: 'absolute',
  top: 130,
  right: 0,
  padding: '0px',
  boxShadow: '0 19px 38px rgba(0,0,0,0.30)'
};

class CheckForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      language: 'en',
      companyName: null,
      data: props.data,
      viewport: {
        latitude: 14,
        longitude: 100,
        zoom: 6,
        bearing: 0,
        pitch: 0,
        alert: false,
        drawerOpen: false
      }
    };
  }
  
  _handleChange = (event, newValue) => {
    this.setState({
      language: newValue
    });
  };

  _onViewportChange = viewport =>{
    const {width, height, ...etc} = viewport
    this.setState({viewport: etc})
  }

  _goToViewport = (company) => {
    this.setState({popupInfo: company});
    this.setState({
      viewport: {...this.state.viewport, 
        latitude: parseFloat(company.lat_lng.split(',')[0]),
        longitude: parseFloat(company.lat_lng.split(',')[1]),
        zoom: 12,
        transitionInterpolator: new FlyToInterpolator({speed: 2}),
        transitionDuration: 'auto'
      }
    });
  };

  _updateViewport = (viewport) => {
    viewport.zoom=14 //Whatever zoom level you want
    this.setState({ viewport })
  }

  openDrawer = () => {
    this.setState({
      openDrawer: !this.state.openDrawer
    })
  }
  render() {
    const {viewport, settings, openDrawer} = this.state;
    const {classes} = this.props;
    let user = localStorage.getItem('user');
    return (
      <Motion>
      {openDrawer?<Drawer drawerClose={() => this.openDrawer()}/>:null}
      <AppBar info={true} history={true} drawerOpen={() => this.openDrawer()} title={"CHECK IN"}/><div className={classes.appBarSpacer}/>
      <div>
        <MapGL
          attributionControl={true}
          mapOptions={
            {
              customAttribution: 'Powered by POWERMAP </a>'
            }
          }
          {...viewport}
          width="100%"
          height={'calc(100vh - 110px)'}
          mapStyle={this.state.language ==='en'?
            "https://search.map.powermap.in.th/api/v2/map/vtile/styles?name=thailand_en&access_token=b378c575291af30a29f59919fd7e7e4c012d45c4"
            :"https://search.map.powermap.in.th/api/v2/map/vtile/styles?name=thailand_th&access_token=b378c575291af30a29f59919fd7e7e4c012d45c4"
          }
          onViewportChange={this._onViewportChange}
          dragToRotate={false}
          // mapboxApiAccessToken={MAPBOX_TOKEN}
        >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: false}}
          trackUserLocation={true}
          onViewportChange={this._updateViewport}
        />
        <div style={navStyle}>
          <NavigationControl showCompass={false}/>
        </div>
        </MapGL>
          
        <div style={navRightStyle}>
        <Grid container className="language-control-panel" spacing={2} direction="column">
          <Grid item>
            <ToggleButtonGroup size="small" value={this.state.language} exclusive onChange={this._handleChange} variant="contained">
              <ToggleButton key={1} value="en" active>
                EN
              </ToggleButton>,
              <ToggleButton key={2} value="th">
                TH
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        </div>
        <Snackbar open={this.state.alert} anchorOrigin={{ vertical:'top', horizontal:'right' }}
          autoHideDuration={6000} 
          onClose={() => this.setState({alert:false})} >
        <Alert onClose={() => this.setState({alert:false})} severity="error">
          Please make sure you have created your profile — <strong>Profile not found!</strong>
        </Alert></Snackbar>
        <Grid container justify="center" className={classes.checkinButton} >
          <IconButton onClick={()=> {
            if(user){
              history.push({
              pathname: './CardView'})
            } else {
              this.setState({alert: true})
            }
          }} 
          >
            <Avatar rounded circle alt="Checkin" src="/aapico-checkin/images/Button.png" className={classes.large} />
          </IconButton>
        </Grid>
        <div style={todayListStyle}>
          <Today />
        </div>

      </div>
      </Motion>
    );
  }
}


export default withStyles(styles)(CheckForm);

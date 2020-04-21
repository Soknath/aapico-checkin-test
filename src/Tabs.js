import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PeopleIcon from '@material-ui/icons/People';
import RoomIcon from '@material-ui/icons/Room';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SettingsIcon from '@material-ui/icons/Settings';
// import Loading from './Loading';

import CardView from './Checkin/CardView';
import CheckForm from './Checkin/CheckForm';
import TakePhoto from './Checkin/TakePhoto';
import Employees from './Employee/employeeViews';
import Companies from './Company/companyViews';
import EmployeeDetails from './Employee/employeeDetails';
import CompanyDetails from './Company/companyDetails';
import PersonalInfo from './Setting/PersonalInfo';
import history from './history';
import PWAPrompt from 'react-ios-pwa-prompt';
import Tabletop from 'tabletop';
import Loading from './Loading';

const styles = theme => ({
  root: {
    width: 500,
  },
  appBarSpacer: theme.mixins.toolbar,
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: theme.palette.background.paper,
  },
});

class TabView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      componentName: props.location.pathname?props.location.pathname.replace('/',''):'checkin',
      showInstallMessage: false,
      data: null,
      filterData: null,
      companies: null,
      companyData: null
    }
  }

  // componentDidMount() {
  //   Tabletop.init({
  //     key: '18g3_Nasyq-dFwFqnilywZSWwVBKP5r5BUnLA0j5AEHg',
  //     callback: googleData => {
  //       let companies = [...new Set(googleData.map(({company})=>company))]
  //       this.setState({
  //         data: googleData,
  //         filterData: googleData,
  //         companies: ['All', ...companies]
  //       })
  //     },
  //     simpleSheet: true
  //   });
    
  //   Tabletop.init({
  //     key: '1JHSCA1kWtmrgWIIGgVtOgjkBfw-IBV_gS0ZDvrDxwg8',
  //     callback: googleData => {
  //       this.setState({
  //         companyData: googleData
  //       })
  //     },
  //     simpleSheet: true
  //   });
  // }

  handleChange = (event, newValue) => {
    this.setState({
      componentName: newValue
    })
    history.push(`/${newValue}`)
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      componentName: nextProps.location.pathname.replace('/', '')
    })
  }

  render(){
    const { classes } = this.props;
    const { data, filterData, companies, companyData} = this.state;
      let components = {
        "companies": <Companies data={companyData}/>, 
        "employees": <Employees filterData={filterData} companies={companies} data={data}/>,
        "employeeDetails": <EmployeeDetails />, 
        "companyDetails": <CompanyDetails />, 
        "checkin" : <CheckForm />, 
        "personalinfo" : <PersonalInfo />,
        "takePhoto" : <TakePhoto />,
        "CardView" : <CardView />
      };
    let componentName = history.location.pathname.replace('/', '')||'checkin';
    let activeComponent = components[componentName];
    // if (!data || !companyData){return(<Loading />)};
    return (
    <>
      {activeComponent}
      <div className={classes.appBarSpacer}/>
      <BottomNavigation value={this.state.componentName} onChange={this.handleChange} className={classes.stickToBottom} >
        {/* <BottomNavigationAction label="AAPICO" value="companies" icon={<HomeWorkIcon />}/>
        <BottomNavigationAction label="Employees" value="employees" icon={<PeopleIcon />} /> */}
        <BottomNavigationAction label="Check-in" value="checkin" icon={<RoomIcon />} />
        <BottomNavigationAction label="Setting" value="personalinfo" icon={<SettingsIcon />} />
      </BottomNavigation>
      {/* <PWAPrompt promptOnVisit={1} timesToShow={3} copyClosePrompt="Close" permanentlyHideOnDismiss={false}/> */}
      </>
    );
  }
}

export default withStyles(styles)(TabView);
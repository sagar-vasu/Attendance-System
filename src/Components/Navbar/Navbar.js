import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DeleteIcon from '@material-ui/icons/Delete';
import ClassIcon from '@material-ui/icons/Class';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import { Link } from 'react-router-dom'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';

import { logout } from '../../Config/Functions/Functions'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ backgroundColor: '#212121' }}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {props.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>

          {/* Dashboard */}
          <Link to='/home'>
            <ListItem button onClick={() => localStorage.setItem('path', JSON.stringify("/home"))} >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItem>
          </Link>


          {/* Attendance */}
          <Link to='/attendance'>
            <ListItem button onClick={() => localStorage.setItem('path', JSON.stringify("/attendance"))}>
              <ListItemIcon>
                <AssignmentTurnedInIcon />
              </ListItemIcon>
              <ListItemText primary='Attendance' />
            </ListItem>
          </Link>

          {/* late-attendance */}
          <Link to='/late-attendance'>
            <ListItem button onClick={() => localStorage.setItem('path', JSON.stringify("/late-attendance"))}>
              <ListItemIcon>
                <PermContactCalendarIcon />
              </ListItemIcon>
              <ListItemText primary='Late Attendance' />
            </ListItem>
          </Link>



          {/* Add Class */}
          <Link to='/add-class'>
            <ListItem button onClick={() => localStorage.setItem('path', JSON.stringify("/add-class"))}>
              <ListItemIcon>
                <ClassIcon />
              </ListItemIcon>
              <ListItemText primary='Add Class' />
            </ListItem>
          </Link>

          {/* Add Student */}
          <Link to='/add-student'>
            <ListItem button onClick={() => localStorage.setItem('path', JSON.stringify("/add-student"))}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary='Add Student' />
            </ListItem>
          </Link>


        </List>
        <Divider />
        <List>
           {/* Delete Class */}
           <Link to='/check-status'>
            <ListItem button onClick={() => localStorage.setItem('path', JSON.stringify("/check-status"))}>
              <ListItemIcon>
                <LocalLibraryIcon />
              </ListItemIcon>
              <ListItemText primary='Check  Status' />
            </ListItem>
          </Link>

          
          {/* Delete Class */}
          <Link to='/delete-class'>
            <ListItem button onClick={() => localStorage.setItem('path', JSON.stringify("/delete-class"))}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary='Delete Class' />
            </ListItem>
          </Link>

          {/* Delete Student */}
          <Link to='/delete-student'>
            <ListItem button onClick={() => localStorage.setItem('path', JSON.stringify("/delete-student"))}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary='Delete Student' />
            </ListItem>
          </Link>

        </List>


        {/* User Logout */}

        <ListItem button onClick={() => logout()} >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>


      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.component}
      </main>
    </div>
  );
}
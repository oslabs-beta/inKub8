import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
//import logo from '../assets/transparent_logo.png';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }
  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1 }} color="#111217">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={this.state.anchorEl}
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Link
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>Home</MenuItem>
              </Link>

              <Link
                to="/grafana"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>Grafana</MenuItem>
              </Link>

              <Link
                to="/prom"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>Prometheus</MenuItem>
              </Link>

              {/* <MenuItem>My Account</MenuItem>
              <a
                href="/auth/logout"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>Logout</MenuItem>
              </a> */}
            </Menu>

              <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%'
              }}>
                <img src='/img/transparent_logo2.png' height="25"/>
              </div>
            {/* <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              InKub8
            </Typography> */}
            
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export default Navbar;
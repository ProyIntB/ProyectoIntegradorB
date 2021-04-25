import React, { useState } from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from './SidebarData'
import './Navbar.css'
import { IconContext } from 'react-icons'

/*intento*/
import {AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, makeStyles} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';

const Navbar = (props) => {

    const [sidebar, setSidebar] = useState(false);

    const showSidebar= () => setSidebar(!sidebar)

/*modificacion*/
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open  = Boolean(anchorEl);

    const handleClose = () =>{
        localStorage.removeItem('user');
        props.setUserState();
        setAnchorEl(null);
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
        <IconContext.Provider value={{color: 'white'}}>
            <div className="navbar">
              <Link to="#" className="menu-bars">
                <FaIcons.FaBars onClick={showSidebar}/>
             </Link>
                <div>
                    
                </div>
                {auth && (
                        <div>
                            <IconButton 
                              aria-label="account of current user"
                              aria-controls="menu-appbar"
                              aria-haspopup="true"
                              onClick={handleMenu}
                              color="inherit" 
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                              id="menu-appbar"
                              anchorEl={anchorEl}
                              anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                              }}
                              keepMounted
                              transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                              }}
                              open={open}
                              onClose={handleClose}
                              >
                                  <MenuItem>Profile</MenuItem>
                                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                              </Menu>
                        </div>
                    )}
            </div>
            <nav className={ sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
                <li className='navbar-toggle'>
                    <Link to="#" className='menu-bars'>
                        <AiIcons.AiOutlineClose />
                    </Link>
                </li>
                {SidebarData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon }
                                <span>{item.title}</span>
                            </Link>
                        </li>
                        )

                }
                  
                )}
            </ul>  
            </nav>
            </IconContext.Provider>

        
        </>



    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menubackgroud: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%',
    },
    title: {
        flexGrow: 1
    }
}));

export default Navbar

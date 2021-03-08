import React from 'react'
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
export const SidebarData = [
    {
        title: 'Home', 
        path: '/',
        icon: <AiIcons.AiFillHome size={40}/>,
        cName: 'nav-text'
    },
    {
        title: 'Clientes',
        path: '/Clientes',
        icon: <AiIcons.AiOutlineUser size={40}/>,
        cName: 'nav-text'
    },
    {
        title: 'Vehiculos',
        path: '/Vehiculos',
        icon: <AiIcons.AiFillCar size={40}/>,
        cName: 'nav-text'
    },
    {
        title: 'Remisiones',
        path: '/Remisiones',
        icon: <BiIcons.BiTask size={40}/>,
        cName: 'nav-text'
    },
    {
        title: 'Facturas',
        path: '/Facturas',
        icon: <RiIcons.RiBillFill size={40}/>,
        cName: 'nav-text'
    },
    {
        title: 'Historiales',
        path: '/Historiales',
        icon: <RiIcons.RiFolderHistoryLine size={40}/>,
        cName: 'nav-text'
    },
]

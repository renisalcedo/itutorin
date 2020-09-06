import React,{useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GrIcons from 'react-icons/gr';
import * as FiIcons from 'react-icons/fi';



export const SidebarData = [
    {
        title:'Home',
        path:'/',
        icon:<AiIcons.AiFillHome />,
        cname:'nav-text'
    },
    {
        title:'select',
        path:'/',
        icon:<GrIcons.GrSelect />,
        cname:'nav-text'
    },
    {
        title:'Line',
        path:'/',
        icon:<AiIcons.AiOutlineExpandAlt />,
        cname:'nav-text'
    },
    {
        title:'Message',
        path:'/message',
        icon:<FaIcons.FaEnvelopeOpenText />,
        cname:'nav-text'
    },
    {
        title:'Settings',
        path:'/settings',
        icon:<FiIcons.FiSettings />,
        cname:'nav-text'
    }
    
]


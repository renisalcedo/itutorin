import React,{useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from "react-router-dom";
import { SidebarData } from './SidebarData';
import "./Navbar.css";
import { IconContext } from 'react-icons';



function Navbar() {
    const [sidebar,setSideBar] = useState(false);
    const showsideBars = ()=>setSideBar(!sidebar);
    return (
        <>
        <IconContext.Provider value={{color:'#fff'}}>

        </IconContext.Provider>
           
            <nav className='nav-menu-active'>
                <ul className="nav-menu-items">
                    
                    {SidebarData.map((item,index)=>{
                        return(
                            <li key={index} className={item.cname}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            
        </>
    )
}

export default Navbar;

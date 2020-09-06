import React,{useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from "react-router-dom";
import { SidebarData } from './SidebarData';
import "./Navbar.css";
import { IconContext } from 'react-icons';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Flash from "./Flash";



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

                            <Button variant="outline-info"><li key={index} className={item.cname}>
                                    {item.icon} {item.title}
                            </li></Button>
                        )
                    })}
                    <Button className="quiz" variant="info">Quiz</Button>
                    <Flash />
                </ul>
            </nav>
            
        </>
    )
}

export default Navbar;

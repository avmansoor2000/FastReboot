import React from 'react'
import Dashboard from '../../assets/img/icons/menu-icon-01.svg'
import logouticon from '../../assets/img/icons/logout.svg'
import Doctors from '../../assets/img/icons/menu-icon-02.svg'
import Posts from '../../assets/img/icons/menu-icon-03.svg'
import settings from '../../assets/img/icons/menu-icon-16.svg'
import Bankicon from '../../assets/img/icons/menu-icon-04.svg'
// import Company from '../../assets/img/icons/company.png'
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <>
    <div className="sidebar" id="sidebar">
    <div className="sidebar-inner slimscroll">
                <div id="sidebar-menu" className="sidebar-menu">
                <ul>
                        <li className="menu-title">Main</li>
						<li className="submenu">
							<a href="#"><span className="menu-side"><img src={Dashboard} alt=""/></span> <span> Dashboard </span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
								{/* <li><a className="active" href="index.html">Admin Dashboard</a></li>
								<li><a href="doctor-dashboard.html">Doctor Dashboard</a></li>
								<li><a href="patient-dashboard.html">Patient Dashboard</a></li> */}
							</ul>
						</li>
						<li className="submenu">
							<a href="#"><span className="menu-side"><img src={Doctors} alt=""/></span> <span>User Managment</span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
                            <li><Link to="/users">Add Users</Link></li>
                            
							</ul>
						</li>
                        <li className="submenu">
							<a href="#"><span className="menu-side"><img src={Doctors} alt=""/></span> <span>Mentors</span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
                            <li><Link to="/mentors">Add Mentors</Link></li>
                            
							</ul>
						</li>
                        <li className="submenu">
							<a href="#"><span className="menu-side"><img src={Doctors} alt=""/></span> <span>Banner</span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
                            <li><Link to="/banner">Add Banner</Link></li>
                            
							</ul>
						</li>
                        <li className="submenu">
							<a href="#"><span className="menu-side"><img src={Doctors} alt=""/></span> <span>Video Managment</span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
                            <li><Link to="/videos">Add Videos</Link></li>
                            
							</ul>
						</li>

                        <li className="submenu">
							<a href="#"><span className="menu-side"><img src={Doctors} alt=""/></span> <span>Audio Managment</span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
                            <li><Link to="/audios">Add Audios</Link></li>
                            
							</ul>
						</li>
                      
                    </ul>
					<div className="logout-btn">
						<a href="login.html"><span className="menu-side"><img src={logouticon} alt=""/></span> <span>Logout</span></a>
					</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Sidebar
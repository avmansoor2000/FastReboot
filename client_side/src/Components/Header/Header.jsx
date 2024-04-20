import React from 'react'

import search from '../../assets/img/icons/search-normal.svg'
import menu1 from '../../assets/img/icons/bar-icon.svg'
import menu2 from '../../assets/img/icons/bar-icon.svg'
import book from '../../assets/img/icons/note-icon-02.svg'
import user from '../../assets/img/profiles/avatar-03.jpg'
import notification from '../../assets/img/icons/note-icon-01.svg'
import settings from '../../assets/img/icons/setting-icon-01.svg'
const Header = () => {
  return (
    <>
    <div className="header">
{/* logo */}
    <a id="toggle_btn" href="javascript:void(0);"><img src={menu1}  alt=""/></a>
    <a id="mobile_btn" className="mobile_btn float-start" href="#sidebar"><img src={menu2}  alt=""/></a>
    <div className="top-nav-search mob-view">
        <form>
            <input type="text" className="form-control" placeholder="Search here"/>
            <a className="btn" ><img src={search} alt=""/></a>
        </form>
    </div>
    {/* <ul className="nav user-menu float-end">
        <li className="nav-item dropdown d-none d-md-block">
            <a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown"><img src={book} alt=""/><span className="pulse"></span> </a>
            <div className="dropdown-menu notifications">
                <div className="topnav-dropdown-header">
                    <span>Notifications</span>
                </div>
                <div className="drop-scroll">
                    <ul className="notification-list">
                        <li className="notification-message">
                            <a href="activities.html">
                                <div className="media">
                                    <span className="avatar">
                                        <img alt="John Doe" src={user} className="img-fluid"/>
                                    </span>
                                    <div className="media-body">
                                        <p className="noti-details"><span className="noti-title">John Doe</span> added new task <span className="noti-title">Patient appointment booking</span></p>
                                        <p className="noti-time"><span className="notification-time">4 mins ago</span></p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="notification-message">
                            <a href="activities.html">
                                <div className="media">
                                    <span className="avatar">V</span>
                                    <div className="media-body">
                                        <p className="noti-details"><span className="noti-title">Tarah Shropshire</span> changed the task name <span className="noti-title">Appointment booking with payment gateway</span></p>
                                        <p className="noti-time"><span className="notification-time">6 mins ago</span></p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="notification-message">
                            <a href="activities.html">
                                <div className="media">
                                    <span className="avatar">L</span>
                                    <div className="media-body">
                                        <p className="noti-details"><span className="noti-title">Misty Tison</span> added <span className="noti-title">Domenic Houston</span> and <span className="noti-title">Claire Mapes</span> to project <span className="noti-title">Doctor available module</span></p>
                                        <p className="noti-time"><span className="notification-time">8 mins ago</span></p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="notification-message">
                            <a href="activities.html">
                                <div className="media">
                                    <span className="avatar">G</span>
                                    <div className="media-body">
                                        <p className="noti-details"><span className="noti-title">Rolland Webber</span> completed task <span className="noti-title">Patient and Doctor video conferencing</span></p>
                                        <p className="noti-time"><span className="notification-time">12 mins ago</span></p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="notification-message">
                            <a href="activities.html">
                                <div className="media">
                                    <span className="avatar">V</span>
                                    <div className="media-body">
                                        <p className="noti-details"><span className="noti-title">Bernardo Galaviz</span> added new task <span className="noti-title">Private chat module</span></p>
                                        <p className="noti-time"><span className="notification-time">2 days ago</span></p>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="topnav-dropdown-footer">
                    <a href="activities.html">View all Notifications</a>
                </div>
            </div>
        </li>
        <li className="nav-item dropdown d-none d-md-block">
            <a href="javascript:void(0);" id="open_msg_box" className="hasnotifications nav-link"><img src={notification} alt=""/><span className="pulse"></span> </a>
        </li>
        <li className="nav-item dropdown has-arrow user-profile-list">
            <a href="#" className="dropdown-toggle nav-link user-link" data-bs-toggle="dropdown">
                <div className="user-names">
                    <h5>shahid </h5>
                    <span>Admin</span>
                </div>
                <span className="user-img">
                    <img  src={user}alt="Admin"/>
                </span>
            </a>
            <div className="dropdown-menu">
                <a className="dropdown-item" href="profile.html">My Profile</a>
                <a className="dropdown-item" href="edit-profile.html">Edit Profile</a>
                <a className="dropdown-item" href="settings.html">Settings</a>
                <a className="dropdown-item" href="login.html">Logout</a>
            </div>
        </li>
        <li className="nav-item ">
            <a href="settings.html"  className="hasnotifications nav-link"><img src={settings} alt=""/> </a>
        </li>
    </ul> */}
    <div className="dropdown mobile-user-menu float-end">
        <a href="#" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-ellipsis-vertical"></i></a>
        <div className="dropdown-menu dropdown-menu-end">
            <a className="dropdown-item" href="profile.html">My Profile</a>
            <a className="dropdown-item" href="edit-profile.html">Edit Profile</a>
            <a className="dropdown-item" href="settings.html">Settings</a>
            <a className="dropdown-item" href="login.html">Logout</a>
        </div>
    </div>
</div>

</>
  )
}

export default Header
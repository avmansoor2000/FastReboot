import React,{ lazy, Suspense } from 'react';
import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const Banner = lazy(()=> import ('./Components/Banner/Banner'));
const Mentors =lazy(()=> import('./Components/Mentors/Mentors'));
const User =lazy(()=> import('./Components/User/User'));
// const Dashboard = lazy(() => import('./Components/Pages/Dashboard'));
const Video = lazy(()=> import('./Components/VideoManagment/Video'))
const Audio = lazy(()=> import('./Components/AudioManagment/Audio'))

const App = () => {
  return (

  <Router>
    <div className="main-wrapper">
       <Header/>
       <Sidebar/> 
       
       <div className="page-wrapper">
       <div className="content">
       <Suspense fallback={<div>Loading...</div>}>
       <Routes>
       {/* <Route path="/" element={<Dashboard/>} /> */}
       <Route path="/users" element={<User/>} />
       <Route path="/mentors" element={<Mentors/>} />
       <Route path="/banner" element={<Banner/>} />
       <Route path="/videos" element={<Video/>} />
       <Route path="/audios" element={<Audio/>} />
       </Routes>
       </Suspense>
       </div>
      </div>
    </div>
    <div className="sidebar-overlay" data-reff=""></div>
 </Router>
  );
};

export default App;
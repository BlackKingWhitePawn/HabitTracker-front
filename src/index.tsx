import { Example } from 'components';
import React, { Profiler } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss'
import StartPage from 'pages/start';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Layout from 'components/Layout';
import ProfilePage from 'pages/Profile';
import VideoPage from 'pages/Video';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


function Wrapper() {
  return (
    <>
      <Outlet />
    </>
  )
}



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Wrapper />} >
          <Route index element={<StartPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/videos' element={<VideoPage />} />
          <Route path='/analysis' element={<StartPage />} />
          <Route path="*" element={<Layout children={<></>} />} />
        </Route>
      </Routes></>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
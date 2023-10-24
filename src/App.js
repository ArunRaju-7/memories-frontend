import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Container} from '@material-ui/core';
import Navbar from './component/NavBar/Navbar';
import Home from './component/Home/Home';
import Auth from './component/Auth/Auth';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PostDetails from './component/PostDetails/Postdetails';
import ForgetPassword from './component/Auth/forgetPassword';
import ResetPassword from './component/Auth/resetPassword';

const App = () =>{
  const user = JSON.parse(localStorage.getItem('profile'));
  return(
    <BrowserRouter >
      <Container maxWidth="lg">
        <Navbar />
        <Routes> 
          <Route path="/" exact element={<Navigate to="/posts" />} />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />}/>
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
          <Route path="/auth" exact element={(!user ? <Auth /> : <Navigate to="/posts" />)} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;

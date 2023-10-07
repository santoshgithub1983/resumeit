
import './App.css';
import {BrowserRouter , Routes, Route , Navigate } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Templates from './pages/templates';
import Cookies from 'js-cookie';



function App() {
 
  return (
   
    <div className="App">
        <BrowserRouter>
          <Routes>

            <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
            <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
            <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
            <Route path='/templates/:id' element={<ProtectedRoute><Templates /></ProtectedRoute>}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
        
          </Routes>
        </BrowserRouter>
       
    </div>
  );
}

export default App;

export function ProtectedRoute(props){
  // const userDataString = Cookies.get('resumeit-user');
  // const user = JSON.parse(userDataString);
  if(Cookies.get('resumeit-user')){
    console.log('inside cookie check condition of App.js ')
    const userDataString = Cookies.get('resumeit-user');
    // console.log(userDataString)
    return props.children
  }
else {
  return <Navigate to='/login' />
}
    
}

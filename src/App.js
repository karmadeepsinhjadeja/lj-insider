import React from "react";
import './App.css';
import Sidebar from "./components/views/Sidebar";
import Feed from "./components/views/Feed";
import Widgets from "./components/views/Widgets";
import Auth from "./components/views/Auth";
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from "./database/firebase"

function App() {
  const [user] = useAuthState(auth);
  if (user){
    return (
      //BEM convention
      <div className="App">
       {/*Sidebar */}
         <Sidebar/>
  
         {/*Feed */}
         <Feed/>
  
          {/*Widgets*/}
          <Widgets/>
         </div>
    );
  }
  else{
    return(
      <Auth/>
    )
  }


  
}

export default App;

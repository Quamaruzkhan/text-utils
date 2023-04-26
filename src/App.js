import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TextArea from './components/TextArea';
import ModeAlert from './components/ModeAlert';

function App() {
  const [mode, setMode] = useState('light')
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type)=>{
    
  setAlert({
      message: message,
      type: type
    })
  setTimeout(()=>{
      setAlert(null)
    },1500)
  }

  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark')
      showAlert("Dark mode has been enabled", "success")
      document.body.style.backgroundColor = '#0c4c50'
    }else{
      setMode('light')
      showAlert("Light mode has been enabled", "success")
      document.body.style.backgroundColor = 'white'
    }
  }

  return (
   <>
      <Navbar title = "Text Utility" about = "About us" mode = {mode} toggleMode = {toggleMode}/>
      <ModeAlert alert = {alert}/>
      <div className="container my-3">
          <TextArea heading = "Enter the text to analyze below"mode = {mode} showAlert={showAlert}/>
      </div>
   </>
  );
}
export default App;
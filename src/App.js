import { useState } from 'react';
import './App.css';
import MainTextUtil from './MainTextUtil';
function App() {
  const [mode,setMode]=useState('light')
  function toggleMode(){
    if(mode==='light'){
      setMode('dark')
      document.body.style.background='#212529'
    }
    else{
      document.body.style.background='white'
      setMode('light')
    }
  }

  return (
    <>
      <MainTextUtil mode={mode} toggleMode={toggleMode} />
    </>
  );
}

export default App;

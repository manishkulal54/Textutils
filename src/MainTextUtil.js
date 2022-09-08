import React, { useState } from 'react'
import Footer from './pages/Footer'
import './index.css'
import logo from './icons/logo.png'
import Alert from './pages/Alert';

export default function MainTextUtil(props) {

    const [text, setText] = useState('')
    const [localTextValue, setLocalTextValue] = useState(localStorage.getItem('textUtilsData')===null || localStorage.getItem('textUtilsData')===' '?'Store to device':'Get from device')
    const [warning,setWarning]=useState('')
    const [alertDisplay,setAlertDisplay]=useState('d-none')

    function uppercase() {
        let upperText = text.toUpperCase()
        setText(upperText)
        setWarning('UpperCase converted')
        setAlertDisplay('d-block')
        resetAlert()
    }   
    function lowercase() {
        let lowerText = text.toLowerCase()
        setText(lowerText)
        setWarning('LowerCase converted')
        setAlertDisplay('d-block')
        resetAlert()
    }
    function reset() {
        setText('')
        setWarning('Reseted to default')
        setAlertDisplay('d-block')
        resetAlert()
    }
    function copy2CB() {
        navigator.clipboard.writeText(text)
        setWarning('Copied to clipbopard')
        setAlertDisplay('d-block')
        resetAlert()
    }
    function saveDltLS(){
        let localText=localStorage.getItem('textUtilsData')

        if (localText===null || localText===' '){
            localStorage.setItem('textUtilsData', text)
            setLocalTextValue('Get from device')
            
            setWarning('Stored in your device')
            setAlertDisplay('d-block')
            resetAlert()
        }
        else{
            setText(text.concat(' ').concat(localText))
            localStorage.setItem('textUtilsData', ' ')
            setLocalTextValue('Store to device')
            setWarning('copied from your device')
            setAlertDisplay('d-block')
            resetAlert()
        }
        
    }
    function resetAlert(){
        setInterval(() => {
            setWarning('')
        setAlertDisplay('d-none')
      }, 5000);
    }
    

    return (
        <div  className={`bg-${props.mode==='dark'?'dark':'light'}`}>
            <a className="navbar-brand" href="https://manishkulal.netlify.app" target={'blank'}>
                <img src={logo} alt="" width="100" height="100" className="d-inline-block align-text-top" />
            </a>
            <div className="form-check form-switch position-absolute top-0 end-0 me-3">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.toggleMode} />
                <label className={`form-check-label text-${props.mode==='dark'?'light':'dark'}`} htmlFor="flexSwitchCheckDefault" style={{width:'maxContent',marginRight:'0',textAlign:'end'}}>{`Enable ${props.mode==='dark'?'light':'dark'} mode`}</label>
            </div>
            <div className={`container bg-${props.mode==='dark'?'dark':'light'}`} style={{marginBottom:'10vh'}} >
                
                <h1 className={`text-center mb-3 text-${props.mode==='light'?'dark':'light'}`}>Text Utils</h1>
                <div className='container text-center'>
                    <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        className={`mb-3 h-50 d-inline-block bg-${props.mode==='dark'?'dark text-light ':'light text-dark '}`}
                        placeholder='Enter your text here'
                        style={{ width: '70vw' }}
                        onChange={e => { setText(e.target.value) }}
                        value={text}
                    ></textarea>
                    <div className="container d-flex justify-content-center mb-5 mt-3">
                        <p className={`me-5 ${props.mode==='dark'?'text-light':'text-dark'}`}>Total Letters={text.length}</p>
                        <p className={`me-5 ${props.mode==='dark'?'text-light':'text-dark'}`}>Words={text.split(" ").filter(elem => { return elem.length !== 0 }).length}</p>
                    </div>
                    <div className="buttons text-center d-flex justify-content-center align-item-center flex-wrap">
                        <button type="button" disabled={text.length === 0} className="ms-3 mb-3 btn btn-info" onClick={uppercase}>UpperCase</button>
                        <button type="button" disabled={text.length === 0} className="ms-3 mb-3 btn btn-info"  onClick={lowercase}>LowerCase</button>
                        <button type="button" disabled={text.length === 0} className="ms-3 mb-3 btn btn-info"  onClick={reset}>Reset</button>
                        <button type="button" disabled={text.length === 0} className="ms-3 mb-3 btn btn-info"  onClick={copy2CB}>Copy to clipboard</button>
                        <button type="button" disabled={text.length === 0 && localTextValue==='Store to device'} className="ms-3 mb-3 btn btn-info" onClick={saveDltLS}>{localTextValue}</button>
                    </div>
                </div>
            </div>
            <Footer mode={props.mode} toggleMode={props.toggleMode}/>
            <Alert message={warning} alertDisplay={alertDisplay}/>
        </div>
    )
}
// inform what happenning in the device using a alert function

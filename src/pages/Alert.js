import React from 'react'
import './Alert.css'

export default function Alert(props) {
    return (
        <>
            <div className={`alert alert-success alertStyle ${props.alertDisplay}`} role="alert">
                {props.message}
            </div>
        </>
    )
}

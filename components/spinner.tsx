import React from 'react'
import styles from './spinner.module.css'

function Spinner() {
  return (
    <div className={styles['lds-hourglass']}></div>
  )
}

export default Spinner

import React from 'react'
import styles from "./css/showError.module.css"

export default function ShowError({message}) {
  return message &&(
    <div className={styles.container}>
        <p className={styles.message}>{message}</p>
    </div>
  )
}

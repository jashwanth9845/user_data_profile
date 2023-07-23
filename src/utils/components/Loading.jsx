import React from 'react'
import styles from "./css/loading.module.css"

export default function Loading() {
  return (
    <div className={styles.container}>
        <img src={'/assets/svgs/loading.svg'}/>
    </div>
  )
}

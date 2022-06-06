import React from 'react'
import styles from './Settings.module.css'
import Form from './Form/Form'
import { useSelector } from 'react-redux'

const Settings = () => {
  const { user } = useSelector((state) => state?.auth)

  return (
    <div className={styles.pageContainer}>
      <section className={styles.hero}>
        <h1>Profile Settings</h1>
        <div className={styles.paragraph}>
          <p>Edit your business profile</p>
        </div>
      </section>
      <section className={styles.stat}>
        <Form user={user} />
      </section>
    </div>
  )
}

export default Settings

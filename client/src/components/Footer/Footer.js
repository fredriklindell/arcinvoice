import styles from './Footer.module.css'
import FabButton from '../Fab/Fab'
import { useSelector } from 'react-redux'

const Footer = () => {
  const { user } = useSelector((state) => state?.auth)

  return (
    <footer>
      <div className={styles.footerText}>
        ©Panshak Solomon | Made with ♥ in 🇳🇬{' '}
        <span>
          <a
            href="https://github.com/Panshak/arcinvoice"
            target="_blank"
            rel="noopener noreferrer"
          >
            [Download source code]
          </a>
        </span>
      </div>
      {user && <FabButton />}
    </footer>
  )
}

export default Footer

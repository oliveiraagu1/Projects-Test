import Link from 'next/Link';
import styles from './styles.module.scss';

export function SupportButton() {

    return(
        <div className={styles.donateContainer}>
            <Link href='/donate'>
               <button>Apoiar</button>
            </Link>
        </div>
    )
}
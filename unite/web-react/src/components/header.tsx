import logo from '../../public/vite.svg';
import { NavLink } from './nav-link';

export const Header = () => {
    return (
        <header className='flex items-center gap-5 py-2'>
            <img src={logo} />

            <nav className='flex items-center gap-5'>
                <NavLink href='/eventos'>Eventos</NavLink>
                <NavLink href='/participantes'>Participantes</NavLink>
            </nav>
        </header>
    )
}

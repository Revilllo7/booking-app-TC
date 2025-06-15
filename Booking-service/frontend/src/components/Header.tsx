import { Link } from 'react-router-dom';
import '../index.css';

const Header = () => (
    <header className="site-header">
        <nav className="site-nav">
            <ul className="site-nav-list">
                <li>
                    <Link to="/" className="site-nav-link">Home</Link>
                </li>
                <li>
                    <Link to="/bookings" className="site-nav-link">Bookings</Link>
                </li>
                <li>
                    <Link to="/login" className="site-nav-link">Login</Link>
                </li>
                <li>
                    <Link to="/register" className="site-nav-link">Register</Link>
                </li>
                <li>
                    <Link to="/project" className="site-nav-link">Project Info</Link>
                </li>
            </ul>
        </nav>
    </header>
);

export default Header;
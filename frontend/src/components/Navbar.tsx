import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <Link to="/">Home</Link>
      <Link to="/my-outputs">My outputs</Link>
      <Link to="/read-public-outputs">Read public outputs</Link>
    </nav>
  );
};

export default Navbar;

import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function AppShell() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  function handleLogout() {
    logout();
    navigate('/auth');
  }

  return (
    <div className="app-layout">
      <header className="topbar">
        <div>
          <p className="eyebrow">Modern Commerce</p>
          <h1 className="brand">Northstar</h1>
        </div>
        <nav className="nav-links">
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart ({itemCount})</NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
        </nav>
        <div className="topbar-user">
          <div>
            <p className="user-name">{user?.name}</p>
            <p className="user-email">{user?.email}</p>
          </div>
          <button className="secondary-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <main className="page-shell">
        <Outlet />
      </main>
    </div>
  );
}

export default AppShell;

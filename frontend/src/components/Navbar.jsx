import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((item) => (
          <li key={item}>
            <NavLink to={`/${item.toLowerCase()}`} className={({ isActive }) => (isActive ? "text-black font-bold" : "text-gray-700")}>
              {item}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="" className="w-5 cursor-pointer" />
        <Link to="/login">
          <img src={assets.profile_icon} alt="profile" className="w-5 cursor-pointer" />
        </Link>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img src={assets.menu_icon} alt="menu" className="w-5 cursor-pointer sm:hidden" onClick={() => setVisible(!visible)} />
      </div>

      {/* Sidebar menu */}
      <div className={`absolute top-0 right-0 bottom-0 bg-white transition-all duration-300 overflow-hidden ${visible ? 'w-full' : 'w-0'}`}>
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <img src={assets.dropdown_icon} alt="back" className="h-4 rotate-180" />
            <p className="font-semibold">Back</p>
          </div>
          {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((item) => (
            <NavLink key={item} onClick={() => setVisible(false)} className="py-2 pl-6 border" to={`/${item.toLowerCase()}`}>
              {item}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

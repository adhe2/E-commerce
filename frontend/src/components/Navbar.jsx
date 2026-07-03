import { Logout, reset } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogoutUser = () => {
    dispatch(Logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide">MyApp</div>

          {/* Menu */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            <li>
              <button
                onClick={LogoutUser}
                className="bg-white text-black hover:bg-blue-500 hover:text-white transition p-2 rounded-md"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

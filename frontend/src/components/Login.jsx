import { useSelector, useDispatch } from "react-redux";
import { LoginUser, reset } from "../features/authSlice.js";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/beranda");
    }
    dispatch(reset());
  }, [user, dispatch, navigate, isSuccess]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
    console.log(user);
  };

  return (
    <div>
      <form onSubmit={Auth}>
        <div className="flex justify-center pb-20 min-h-screen items-center">
          <div className=" shadow-2xl py-24 px-4 rounded-xl">
            <div className="m-4 flex justify-center text-2xl font-bold">
              <h1>Sign in</h1>
            </div>
            <div>{isError && <p>{message}</p>}</div>
            <div className="m-4">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="p-2 bg-slate-200 rounded-md w-90"
              />
            </div>
            <div className="m-4">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
                className="p-2 bg-slate-200 rounded-md w-90"
              />
            </div>
            <div className="m-4 flex justify-center">
              <button type="submit" className="bg-blue-500 rounded-md p-2 text-lg text-white font-medium w-90">
                {isLoading ? "Loading.." : "Login"}
              </button>
            </div>
            <div className="flex justify-center">
              <span>
                doesn't have an account?{" "}
                <Link to="/registrasi" className=" font-medium text-blue-500 hover:text-blue-600">
                  Registrasi
                </Link>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

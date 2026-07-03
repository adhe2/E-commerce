import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const FormRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const navigate = useNavigate();

  const RegistrasiUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={RegistrasiUser}>
        <div className="flex justify-center pb-20 min-h-screen items-center">
          <div className="shadow-2xl py-14 px-4 rounded-xl">
            <div className="m-4 flex justify-center text-2xl font-bold">
              <h1>Registrasi</h1>
            </div>
            <div className="m-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
                className="p-2 bg-slate-200 rounded-md w-90"
              />
            </div>
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
                placeholder="Password"
                className="p-2 bg-slate-200 rounded-md w-90"
              />
            </div>
            <div className="m-4">
              <input
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                type="password"
                placeholder="Confirm Password"
                className="p-2 bg-slate-200 rounded-md w-90"
              />
            </div>
            <div className="m-4 flex justify-center">
              <button type="submit" className="bg-blue-500 rounded-md p-2 text-lg text-white font-medium w-90">
                Register
              </button>
            </div>
            <div className="flex justify-center">
              <span>
                Have an account?{" "}
                <Link to="/" className=" font-medium text-blue-500 hover:text-blue-600">
                  Sign in
                </Link>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormRegistration;

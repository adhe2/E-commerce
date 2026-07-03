import Layoat from "./Layout.jsx";
import Beranda from "../components/Beranda.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../features/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BerandaPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layoat>
      <Beranda />
    </Layoat>
  );
};

export default BerandaPages;

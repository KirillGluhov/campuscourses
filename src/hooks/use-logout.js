import axios from "axios";
import { baseUrl } from "../const/const-urls";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    axios
      .post(
        `${baseUrl}/logout`,
        { data: "" },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        localStorage.clear();
        navigate("/login/");
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/login/");
      });
  };

  return logout;
}

export default useLogout;

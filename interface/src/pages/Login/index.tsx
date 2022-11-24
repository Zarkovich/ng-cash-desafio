import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/Connect";
import Loading from "../../assets/Loading";
import FormUser from "../../Components/FormUser";
import { IRegister } from "../../types";

function Login() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function login({ username, password }: IRegister) {
    setLoading(true);

    api
      .post("/login", {
        username,
        password,
      })
      .then((res) => {
        if (res.data.status === "Error") {
          alert(res.data.message);
          setLoading(false);
        } else {
          localStorage.setItem("token", res.data.token);
          navigate("/");
        }
      });
  }

  return (
    <>
      <FormUser
        title={"LOGIN"}
        action={loading ? () => {} : login}
        button={loading ? <Loading /> : "Login"}
      />
    </>
  );
}
export default Login;

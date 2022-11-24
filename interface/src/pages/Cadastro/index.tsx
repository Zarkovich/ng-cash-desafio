import { useState } from "react";
import FormUser from "../../Components/FormUser";
import { IRegister } from "../../types";
import api from "../../Api/Connect";
import { useNavigate } from "react-router-dom";
import Loading from "../../assets/Loading";

function Cadastro() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function register({ username, password }: IRegister) {
    setLoading(true);

    api
      .post("/cadastrar", {
        username,
        password,
      })
      .then((res) => {
        if (res.data.status === "Error") {
          alert(res.data.message);
          setLoading(false);
        } else navigate("/login");
      });
  }

  return (
    <>
      <FormUser
        title={"FAÇA SEU CADASTRO"}
        action={loading ? () => {} : register}
        button={loading ? <Loading /> : "Cadastrar"}
      />
    </>
  );
}
export default Cadastro;

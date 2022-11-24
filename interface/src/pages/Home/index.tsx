import { useEffect, useState } from "react";
import api from "../../Api/Connect";
import { useNavigate } from "react-router-dom";
import styled from "./style.module.scss";
import CreateTransaction from "../../Components/Transactions/CreateTransaction";
import ListTransactions from "../../Components/Transactions/ListTransaction";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import LogoNG from "/images/logo_ng.png";

function Home() {
  const [user, setUser] = useState<any[] | null>(null);
  const [createTransactions, setCreateTransactions] = useState(false);
  const [listTransaction, setListTransaction] = useState(false);
  const [visibly, setVisibly] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = "Barrel " + localStorage.getItem("token");

    api({
      method: "get",
      url: "/sync",
      headers: {
        Authorization: token,
      },
    }).then((res) => setUser(res.data));
  }, [createTransactions]);

  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <>
      {user ? (
        <div className={styled.Container}>
          <div className={styled.User}>
            <h1>{`Olá ${user[0]}`}</h1>
            <button onClick={logout}>Logout</button>
          </div>
          <div className={styled.UserData}>
            <p>Saldo disponível</p>
            <div>
              {visibly
                ? ` R$ ${parseFloat(user[1].balance)
                    .toFixed(2)
                    .replace(".", ",")}`
                : "*****"}
              <span onClick={() => setVisibly(!visibly)}>
                {visibly ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </div>
          <nav className={styled.Nav}>
            <a onClick={() => setCreateTransactions(true)}>
              Fazer uma transferência
            </a>{" "}
            |{" "}
            <a onClick={() => setListTransaction(true)}>
              Lista de Transferências
            </a>
          </nav>
          <div>
            {createTransactions && (
              <CreateTransaction
                isOpen={createTransactions}
                setIsOpen={setCreateTransactions}
              />
            )}
            {listTransaction && (
              <ListTransactions
                isOpen={listTransaction}
                setIsOpen={setListTransaction}
              />
            )}
          </div>
        </div>
      ) : (
        <div className={styled.Container}>
          <img src={LogoNG} alt="Logo NG" />
          <h1 className={styled.Welcome}>BEM-VINDO!</h1>
          <br />
          <h3>A CARTEIRA DA NOVA GERAÇÃO</h3>
          <br />
          <div className={styled.Buttons}>
            <button onClick={() => navigate("/login")}>Fazer Login</button>
            <button onClick={() => navigate("/cadastro")}>
              Fazer Cadastro
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default Home;

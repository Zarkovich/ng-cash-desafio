import RoutesNG from "./Routes"
import './App.scss'
import LogoNG from '/images/logo_ng.png'
import { useNavigate } from "react-router-dom"

function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="HeaderBar"><img src={LogoNG} alt="Logo NG" onClick={()=> navigate('/')}/></div>
      <RoutesNG/>
      </div>
  )
}
export default App
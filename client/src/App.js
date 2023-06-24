
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path = "/login" exact Component={Login}/>
          <Route path = "/register" exact Component={Register}/>
          <Route path = "/url" exact Component={Navbar}/>
        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;

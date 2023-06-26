
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import UrlHandler from "./components/UrlHandler";
import { BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path = "/" Component={LandingPage}/>
          <Route path = "/login" exact Component={Login}/>
          <Route path = "/register" exact Component={Register}/>
          <Route path = "/url" exact Component={UrlHandler}/>
        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;

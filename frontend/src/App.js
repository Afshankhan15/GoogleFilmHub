import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Dash from "./Components/Dashboard/Dash";
import RegPage from "./Components/RegPage/RegPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dash" element={<Dash />} />
          <Route path="/Regpage" element={<RegPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import Login from "./Login";
import Signup from "./Signup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
}
from "react-router-dom";
import Welcome from "./Welcome";
import { Board } from "./Board";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/dashboard" element={<Board/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;

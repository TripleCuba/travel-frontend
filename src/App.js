import { Route, Routes } from "react-router-dom";
import "./App.css";
import Destinations from "./components/Destinations";
import Destination from "./components/Destination";
import Town from "./components/Town";
import Navbar from "./components/Navbar";
import Registration from "./components/accounts/Registration";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="destinations" element={<Destinations />} />

        <Route path="destinations/:destination" element={<Destination />} />
        <Route path="town/:town" element={<Town />} />
        <Route path="register" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;

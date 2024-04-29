import { Routes, Route } from "react-router-dom";
import Wrapper from "./views/Wrapper";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Wrapper />} />
    </Routes>
  );
}

export default App;

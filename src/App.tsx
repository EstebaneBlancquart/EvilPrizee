import { Routes, Route } from "react-router-dom";
import EvilView from "./views/EvilView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EvilView />} />
    </Routes>
  );
}

export default App;

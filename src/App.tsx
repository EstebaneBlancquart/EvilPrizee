import { Routes, Route } from "react-router-dom";
import FirstOpenView from "./views/FirstOpenView";
import EvilView from "./views/EvilView";

const isFirstOpening = localStorage.getItem("evil-prizee") !== "true";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={isFirstOpening ? <FirstOpenView /> : <EvilView />}
      />
    </Routes>
  );
}

export default App;

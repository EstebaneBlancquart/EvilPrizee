import { Routes, Route } from "react-router-dom";
import { isFirstOpening } from "./helpers/localstorage.helper";
import FirstOpenView from "./views/FirstOpenView";
import EvilView from "./views/EvilView";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={isFirstOpening() ? <FirstOpenView /> : <EvilView />}
      />
    </Routes>
  );
}

export default App;

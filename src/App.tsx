import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterDetail from "./Components/CharacterDetail";
import CharacterList from "./Components/CharacterList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

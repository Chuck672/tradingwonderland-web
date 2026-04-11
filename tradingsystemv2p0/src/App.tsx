import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import StepDetail from "./components/StepDetail";
import SummaryPage from "./components/SummaryPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/step/:slug" element={<StepDetail />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </HashRouter>
  );
}

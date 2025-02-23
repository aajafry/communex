import { Authentication, Chat, NotFound } from "@/pages";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { withLayout } from "@/templates";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/" element={withLayout(Chat)} />
        <Route path="/chat" element={withLayout(Chat)} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

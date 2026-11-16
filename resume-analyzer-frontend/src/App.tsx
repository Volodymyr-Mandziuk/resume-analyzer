import { Routes, Route } from 'react-router-dom';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import './index.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
    </Routes>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ResearchGrupoTx from './pages/ResearchGrupoTx';
import ResearchBgfg from './pages/ResearchBgfg';
import ResearchFgin from './pages/ResearchFgin';
import ResearchMsft from './pages/ResearchMsft';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/research/grupo-tx" element={<ResearchGrupoTx />} />
        <Route path="/research/bgfg" element={<ResearchBgfg />} />
        <Route path="/research/fgin" element={<ResearchFgin />} />
        <Route path="/research/msft" element={<ResearchMsft />} />
      </Routes>
    </BrowserRouter>
  );
}

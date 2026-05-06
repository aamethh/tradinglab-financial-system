import Hero from '../components/Hero';
import Analysis from '../components/Analysis';
import Capabilities from '../components/Capabilities';
import Portfolio from '../components/Portfolio';
import About from '../components/About';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-slate-100 font-sans">

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid opacity-100" />
        <div
          className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.055) 0%, transparent 60%)' }}
        />
        <div
          className="absolute bottom-[-10%] -left-48 w-[600px] h-[600px] rounded-full animate-blob-slow"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.04) 0%, transparent 60%)' }}
        />
      </div>

      <div className="relative z-10">
        <main>
          <Hero />
          <Analysis />
          <Capabilities />
          <Portfolio />
          <About />
          <Contact />
        </main>
      </div>

    </div>
  );
}

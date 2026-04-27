import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LINKS = [
  { label: 'Análisis', href: '#analisis' },
  { label: 'Capacidades', href: '#capacidades' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Acerca', href: '#acerca' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 0.03, 0.26, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0F19]/85 backdrop-blur-lg border-b border-white/[0.05]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="w-7 h-7 rounded border border-blue-500/40 bg-blue-500/10 flex items-center justify-center">
            <span className="text-blue-400 text-xs font-bold tracking-tight">TL</span>
          </div>
          <span className="text-slate-100 text-sm font-semibold tracking-wide">
            TradingLab
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-400 hover:text-slate-100 text-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/aamethh/tradinglab-financial-system"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-100 text-sm transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href="#analisis"
            className="px-4 py-1.5 rounded border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium hover:bg-blue-500/20 hover:border-blue-400/40 transition-all duration-200"
          >
            Ver análisis
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-slate-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/[0.05] bg-[#0B0F19]/95 backdrop-blur-lg px-6 py-4 flex flex-col gap-4"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-slate-400 hover:text-slate-100 text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}

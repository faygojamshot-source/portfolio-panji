import { useState, useRef, useEffect } from "react";
import "./App.css";
import profileImg from "./assets/profile.png";
import panjiLogo from "./assets/panji-logo.png";
 
// ─── DATA ────────────────────────────────────────────────────────────────────
 
const skills = [
  { name: "HTML & CSS",   icon: "🎨" },
  { name: "JavaScript",  icon: "⚡" },
  { name: "React",        icon: "⚛️" },
  { name: "PHP",          icon: "🐘" },
  { name: "Node.js",      icon: "🟢" },
  { name: "Express.js",   icon: "🚀" },
  { name: "PostgreSQL",   icon: "🗄️" },
  { name: "REST API",     icon: "🔌" },
  { name: "Git",          icon: "🔀" },
  { name: "Linux/KaliLinux", icon: "🐧" },
];
 
const contacts = [
  {
    label: "Email",
    value: "fugakushiren@gmail.com",
    icon: "📧",
    href: "mailto:fugakushiren@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/panjiprasetya",
    icon: "💻",
    href: "https://github.com/panjiprasetya",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/panji-prasetyaa",
    icon: "🔗",
    href: "https://www.linkedin.com/in/panji-prasetya-95999340a",
  },
  {
    label: "Universitas",
    value: "AMIKOM Yogyakarta",
    icon: "🎓",
    href: "#",
  },
];
 
// ─── CHAT HOOK ───────────────────────────────────────────────────────────────
 
const aiResponses = [
  "Panji adalah seorang mahasiswa Teknik Informatika di Universitas AMIKOM Yogyakarta angkatan 2025. Saya sangat tertarik tentang web development dan backend 🚀",
  "Saya saat ini sedang aktif mempelajari React.js, Node, PostgreSQL. Saya juga familiar dengan Linux dan Git untuk workflow development. 💻",
  "Pendekatan belajar saya bersifat hands-on — saya percaya cara terbaik belajar programming adalah dengan langsung membangun project nyata. Salah satunya adalah portofolio ini! ✨",
  "Saya tinggal di Yogyakarta, Indonesia. Selain kuliah di AMIKOM 📚",
  "Untuk menghubungi saya, kamu bisa kirim email atau cek profil GitHub dan LinkedIn di bagian Contact di halaman ini. 📩",
];

function useChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Halo! 👋 Saya asisten virtual Panji Prasetya. Tanyakan apa saja tentang Panji — background, skill, atau cara menghubunginya!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const responseIndex = useRef(0);

  const sendMessage = (userInput) => {
    if (!userInput.trim() || loading) return;
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    setLoading(true);

    setTimeout(() => {
      const reply = aiResponses[responseIndex.current % aiResponses.length];
      responseIndex.current++;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setLoading(false);
    }, 1200);
  };

  return { messages, loading, sendMessage };
}
 
// ─── COMPONENTS ──────────────────────────────────────────────────────────────
 
function ChatPanel({ onClose }) {
  const { messages, loading, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
 
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
 
  const handleSend = () => {
    if (!input.trim() || loading) return;
    sendMessage(input);
    setInput("");
  };
 
  return (
    <div className="chat-panel">
      <div className="chat-panel-header">
        <div className="chat-avatar">PP</div>
        <div>
          <div className="chat-panel-title">Tanya tentang Panji</div>
          <div className="chat-panel-status">
            <span className="dot" />
            AI Assistant · Online
          </div>
        </div>
        <button className="chat-close" onClick={onClose} aria-label="Tutup chat">
          ✕
        </button>
      </div>
 
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg ${m.role}`}>
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="chat-msg assistant typing-dots">
            <span />
            <span />
            <span />
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
 
      <div className="chat-input-area">
        <input
          className="chat-input"
          placeholder="Tanyakan sesuatu tentang Panji..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          className="chat-send-btn"
          onClick={handleSend}
          disabled={loading || !input.trim()}
          aria-label="Kirim pesan"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
 
// ─── APP ─────────────────────────────────────────────────────────────────────
 
export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
 
  return (
    <>
      {/* Background Glow Blobs */}
      <div
        className="glow-blob"
        style={{
          top: "-5%",
          right: "0%",
          width: 560,
          height: 560,
          background:
            "radial-gradient(circle, rgba(139,114,248,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="glow-blob"
        style={{
          bottom: "20%",
          left: "-8%",
          width: 460,
          height: 460,
          background:
            "radial-gradient(circle, rgba(79,142,247,0.05) 0%, transparent 70%)",
        }}
      />
 
      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="navbar-brand">
          <img src={panjiLogo} alt="Panji Logo" className="navbar-logo" />
            Panji<span>.dev</span>
        </div>
        <div className="navbar-links">
          <a href="#home">Home</a>
          <span className="nav-separator" />
          <a href="#about">About</a>
          <span className="nav-separator" />
          <a href="#skills">Skills</a>
          <span className="nav-separator" />
          <a href="#contact">Contact</a>
        </div>
      </nav>
 
      {/* ── HERO ── */}
      <section id="home" className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-tag fade-in">
              Full-Stack Developer · Indonesia
            </div>
            <h1 className="hero-title fade-in fade-in-delay-1">
              Hello, my name is{" "}
              <span className="accent">Panji</span> — an independent programmer
              from Indonesia.
            </h1>
            <p className="hero-description fade-in fade-in-delay-2">
              I want to share my services as a programmer to help companies or
              individual businesses to realize their products and ideas.
            </p>
            <div className="hero-buttons fade-in fade-in-delay-3">
              <button className="btn-resume">Resume</button>
              <a href="#contact" className="btn-secondary">
                Contact me
              </a>
            </div>
          </div>
 
          <div className="hero-image-wrapper fade-in">
            <img
              src={profileImg}
              alt="Panji Prasetya"
              className="hero-image"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.style.background =
                  "linear-gradient(135deg, #13121a, #1a1828)";
                e.target.parentElement.style.display = "flex";
                e.target.parentElement.style.alignItems = "center";
                e.target.parentElement.style.justifyContent = "center";
                e.target.parentElement.innerHTML =
                  '<div style="font-size:3rem;font-weight:600;color:rgba(139,114,248,0.35);font-family:DM Mono,monospace">PP</div>';
              }}
            />
          </div>
        </div>
      </section>
 
      {/* ── ABOUT ── */}
      <section id="about" className="section">
        <div className="section-header">
          <span className="section-number">01.</span>
          <h2 className="section-title">About me</h2>
          <div className="section-line" />
        </div>
 
        <p className="section-text">
          Halo! Saya{" "}
          <strong style={{ color: "#f0eff4", fontWeight: 500 }}>
            Panji Prasetya
          </strong>
          , mahasiswa aktif Teknik Informatika di{" "}
          <span className="highlight">Universitas AMIKOM Yogyakarta</span>{" "}
        </p>
 
        <div className="about-grid">
          <p className="about-text">
            Saya memiliki passion besar di bidang{" "}
            <strong>web development</strong> dan{" "}
            <strong>backend engineering</strong>. Saat ini saya sedang membangun
            fondasi yang kuat dengan mempelajari teknologi modern dari dasar,
            mulai dari HTML/CSS hingga REST API.
          </p>
          <p className="about-text">
            Pendekatan belajar saya bersifat <em>hands-on</em> — saya percaya
            cara terbaik belajar programming adalah dengan langsung membangun
            project nyata. Saya juga aktif mengeksplorasi tools seperti Linux,
            Git.
          </p>
        </div>
 
        <div className="stats-row">
          {[
            { value: "12+",  label: "Mata Kuliah Aktif" },
            { value: "10+",  label: "Tech Stack Dipelajari" },
            { value: "100%", label: "Semangat Belajar" },
          ].map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── SKILLS ── */}
      <section id="skills" className="section">
        <div className="section-header">
          <span className="section-number">02.</span>
          <h2 className="section-title">Skills</h2>
          <div className="section-line" />
        </div>
 
        <p className="section-text" style={{ marginBottom: "1.25rem" }}>
          Teknologi yang sedang saya pelajari dan kembangkan:
        </p>
 
        <div className="skills-grid">
          {skills.map((skill) => (
            <span key={skill.name} className="skill-badge">
              <span className="icon">{skill.icon}</span>
              {skill.name}
            </span>
          ))}
        </div>
 
        <div className="learning-box">
          <div className="learning-label">Currently learning</div>
          <div className="learning-tags">
            {["React.js", "Docker", "TypeScript", "Cloud Deployment"].map(
              (item) => (
                <span key={item} className="learning-tag">
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>
 
      {/* ── CONTACT ── */}
      <section id="contact" className="section">
        <div className="section-header">
          <span className="section-number">03.</span>
          <h2 className="section-title">Contact</h2>
          <div className="section-line" />
        </div>
 
        <p className="section-text" style={{ marginBottom: "1.25rem" }}>
          Terbuka untuk kolaborasi, diskusi, atau sekadar ngobrol soal
          teknologi!
        </p>
 
        <div className="contact-grid">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="contact-card"
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span className="contact-icon">{c.icon}</span>
              <div>
                <div className="contact-label">{c.label}</div>
                <div className="contact-value">{c.value}</div>
              </div>
              <span className="contact-arrow">→</span>
            </a>
          ))}
        </div>
      </section>
 
      {/* ── FOOTER ── */}
      <footer className="footer">
        Built with ❤️ by Panji Prasetya · 2026
      </footer>
 
      {/* ── CHAT WIDGET ── */}
      <button
        className="chat-fab"
        onClick={() => setChatOpen((o) => !o)}
        aria-label={chatOpen ? "Tutup chat" : "Buka chat"}
      >
        {chatOpen ? "✕" : "💬"}
      </button>
 
      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
    </>
  );
}
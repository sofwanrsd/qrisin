import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") enableDark();
  }, []);

  // Enable Dark Mode
  const enableDark = () => {
    setDarkMode(true);
    document.body.classList.add("bg-dark", "text-light");
    localStorage.setItem("theme", "dark");
  };

  // Disable Dark Mode
  const disableDark = () => {
    setDarkMode(false);
    document.body.classList.remove("bg-dark", "text-light");
    localStorage.setItem("theme", "light");
  };

  const toggleDark = () => {
    darkMode ? disableDark() : enableDark();
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`navbar navbar-expand-lg shadow-sm ${
          darkMode ? "navbar-dark bg-dark" : "navbar-light bg-white"
        }`}
      >
        <div className="container d-flex justify-content-between">
          {/* QRISin → Kembali ke Home */}
          <a
            className="navbar-brand fw-bold fs-4"
            href="/"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <span style={{ color: "#0d6efd" }}>QRIS</span>in
          </a>

          <div className="d-flex gap-2">
            <a href="/docs" className="btn btn-outline-primary">
              Dokumentasi
            </a>

            <button className="btn btn-secondary" onClick={toggleDark}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main
        className="container d-flex justify-content-center align-items-start"
        style={{
          minHeight: "calc(100vh - 130px)",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <div className="w-100">{children}</div>
      </main>

      {/* FOOTER */}
      <footer
        className={`text-center py-3 border-top ${
          darkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        <small>
          QRISin — Created by{" "}
          <a
            href="https://github.com/sofwanrsd/"
            target="_blank"
            className="fw-bold"
            style={{ textDecoration: "none" }}
          >
            Wanndev
          </a>{" "}
          © 2025
        </small>
      </footer>
    </>
  );
}

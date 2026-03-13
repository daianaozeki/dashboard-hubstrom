import { useState } from "react";
import { login } from "./auth.js";

const COLORS = {
    bg: "#0B1120",
    card: "#111827",
    border: "#1F2D45",
    accent: "#F59E3F",
    text: "#E2E8F0",
    muted: "#64748B",
};

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!username.trim() || !password.trim()) {
                setError("Preencha todos os campos");
                setLoading(false);
                return;
        }

        try {
                const result = await login(username, password);
                if (result.success) {
                          onLogin(result.user);
                } else {
                          setError(result.error);
                }
        } catch (err) {
                setError("Erro ao processar login. Tente novamente.");
        }

        setLoading(false);
  };

  return (
        <div style={{
                background: COLORS.bg,
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
                padding: 20,
        }}>
                <div style={{
                  background: COLORS.card,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 16,
                  padding: "40px 36px",
                  width: "100%",
                  maxWidth: 420,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}>
                  {/* Logo/Header */}
                          <div style={{ textAlign: "center", marginBottom: 32 }}>
                                      <div style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${COLORS.accent}, #FBBF24)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                      fontSize: 28,
        }}>
                                                    🔐
                                      </div>div>
                                      <h1 style={{
                      margin: 0,
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#F1F5F9",
                      letterSpacing: "-0.02em",
        }}>
                                                    HubStrom
                                      </h1>h1>
                                      <p style={{
                      margin: "8px 0 0",
                      fontSize: 13,
                      color: COLORS.muted,
        }}>
                                                    Acesse o painel de análise comercial
                                      </p>p>
                          </div>div>

                  {/* Form */}
                          <form onSubmit={handleSubmit}>
                            {/* Username */}
                                      <div style={{ marginBottom: 18 }}>
                                                    <label style={{
                        display: "block",
                        fontSize: 12,
                        fontWeight: 600,
                        color: COLORS.muted,
                        marginBottom: 6,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
        }}>
                                                                    Usuário
                                                    </label>label>
                                                    <input
                                                                    type="text"
                                                                    value={username}
                                                                    onChange={(e) => setUsername(e.target.value)}
                                                                    placeholder="Digite seu usuário"
                                                                    autoComplete="username"
                                                                    style={{
                                                                                      width: "100%",
                                                                                      padding: "12px 14px",
                                                                                      background: "#0F1823",
                                                                                      border: `1px solid ${error ? "#F87171" : COLORS.border}`,
                                                                                      borderRadius: 8,
                                                                                      color: COLORS.text,
                                                                                      fontSize: 14,
                                                                                      outline: "none",
                                                                                      transition: "border-color 0.2s",
                                                                                      boxSizing: "border-box",
                                                                                      fontFamily: "inherit",
                                                                    }}
                                                                    onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                                                                    onBlur={(e) => e.target.style.borderColor = error ? "#F87171" : COLORS.border}
                                                                  />
                                      </div>div>

                            {/* Password */}
                                      <div style={{ marginBottom: 24 }}>
                                                    <label style={{
                        display: "block",
                        fontSize: 12,
                        fontWeight: 600,
                        color: COLORS.muted,
                        marginBottom: 6,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
        }}>
                                                                    Senha
                                                    </label>label>
                                                    <div style={{ position: "relative" }}>
                                                                    <input
                                                                                      type={showPassword ? "text" : "password"}
                                                                                      value={password}
                                                                                      onChange={(e) => setPassword(e.target.value)}
                                                                                      placeholder="Digite sua senha"
                                                                                      autoComplete="current-password"
                                                                                      style={{
                                                                                                          width: "100%",
                                                                                                          padding: "12px 42px 12px 14px",
                                                                                                          background: "#0F1823",
                                                                                                          border: `1px solid ${error ? "#F87171" : COLORS.border}`,
                                                                                                          borderRadius: 8,
                                                                                                          color: COLORS.text,
                                                                                                          fontSize: 14,
                                                                                                          outline: "none",
                                                                                                          transition: "border-color 0.2s",
                                                                                                          boxSizing: "border-box",
                                                                                                          fontFamily: "inherit",
                                                                                        }}
                                                                                      onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                                                                                      onBlur={(e) => e.target.style.borderColor = error ? "#F87171" : COLORS.border}
                                                                                    />
                                                                    <button
                                                                                      type="button"
                                                                                      onClick={() => setShowPassword(!showPassword)}
                                                                                      style={{
                                                                                                          position: "absolute",
                                                                                                          right: 10,
                                                                                                          top: "50%",
                                                                                                          transform: "translateY(-50%)",
                                                                                                          background: "none",
                                                                                                          border: "none",
                                                                                                          color: COLORS.muted,
                                                                                                          cursor: "pointer",
                                                                                                          fontSize: 16,
                                                                                                          padding: 4,
                                                                                        }}
                                                                                    >
                                                                      {showPassword ? "🙈" : "👁️"}
                                                                    </button>button>
                                                    </div>div>
                                      </div>div>
                          
                            {/* Error */}
                            {error && (
                      <div style={{
                                      background: "#F8717115",
                                      border: "1px solid #F8717140",
                                      borderRadius: 8,
                                      padding: "10px 14px",
                                      marginBottom: 18,
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 8,
                      }}>
                                    <span style={{ fontSize: 14 }}>⚠️</span>span>
                                    <span style={{ fontSize: 13, color: "#F87171" }}>{error}</span>span>
                      </div>div>
                                    )}
                          
                            {/* Submit */}
                                    <button
                                                  type="submit"
                                                  disabled={loading}
                                                  style={{
                                                                  width: "100%",
                                                                  padding: "13px 20px",
                                                                  background: loading ? COLORS.muted : `linear-gradient(135deg, ${COLORS.accent}, #FBBF24)`,
                                                                  border: "none",
                                                                  borderRadius: 8,
                                                                  color: "#0B1120",
                                                                  fontSize: 15,
                                                                  fontWeight: 700,
                                                                  cursor: loading ? "not-allowed" : "pointer",
                                                                  transition: "all 0.2s",
                                                                  fontFamily: "inherit",
                                                                  letterSpacing: "0.02em",
                                                  }}
                                                >
                                      {loading ? "Autenticando..." : "Entrar"}
                                    </button>button>
                          </form>form>
                
                  {/* Security badge */}
                        <div style={{
                    marginTop: 24,
                    paddingTop: 20,
                    borderTop: `1px solid ${COLORS.border}`,
                    textAlign: "center",
        }}>
                                  <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      fontSize: 11,
                      color: COLORS.muted,
        }}>
                                              <span>🔒</span>span>
                                              <span>Protegido com criptografia SHA-256</span>span>
                                  </div>div>
                                  <div style={{
                      fontSize: 10,
                      color: "#334155",
                      marginTop: 8,
        }}>
                                              HubStrom Dashboard · Acesso Seguro
                                  </div>div>
                        </div>div>
                </div>div>
        </div>div>
      );
}</button>

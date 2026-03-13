import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from "recharts";

const COLORS = {
  amanda: "#F59E3F",
  isabela: "#6EE7B7",
  fernanda: "#60A5FA",
  michelle: "#F472B6",
  bg: "#0B1120",
  card: "#111827",
  border: "#1F2D45",
  accent: "#F59E3F",
  text: "#E2E8F0",
  muted: "#64748B",
};

const closerColors = {
  Amanda: COLORS.amanda,
  Isabela: COLORS.isabela,
  Fernanda: COLORS.fernanda,
  Michelle: COLORS.michelle,
};

const closerData = [
  { name: "Amanda", total: 30, contratado: 16, desistente: 9, pendente: 5, gerado: 0, conversao: 53.3, valor: 18185.92, clientes_conv: 2525, clientes_total: 7275 },
  { name: "Isabela", total: 33, contratado: 15, desistente: 5, pendente: 11, gerado: 2, conversao: 45.5, valor: 13208.01, clientes_conv: 1900, clientes_total: 6597 },
  { name: "Fernanda", total: 31, contratado: 12, desistente: 9, pendente: 6, gerado: 4, conversao: 38.7, valor: 7278.70, clientes_conv: 1250, clientes_total: 3775 },
  { name: "Michelle", total: 28, contratado: 9, desistente: 9, pendente: 9, gerado: 1, conversao: 32.1, valor: 5867.45, clientes_conv: 800, clientes_total: 4100 },
];

const tamanhoData = [
  { faixa: "Até 50",   Amanda: 6, Isabela: 6, Fernanda: 5, Michelle: 8 },
  { faixa: "51-100",   Amanda: 7, Isabela: 11, Fernanda: 13, Michelle: 8 },
  { faixa: "101-150",  Amanda: 4, Isabela: 3, Fernanda: 9, Michelle: 7 },
  { faixa: "151-200",  Amanda: 7, Isabela: 5, Fernanda: 3, Michelle: 2 },
  { faixa: "201-300",  Amanda: 1, Isabela: 5, Fernanda: 1, Michelle: 0 },
  { faixa: "301-500",  Amanda: 2, Isabela: 1, Fernanda: 0, Michelle: 3 },
  { faixa: "500+",     Amanda: 3, Isabela: 2, Fernanda: 0, Michelle: 0 },
];

const motivosData = [
  { motivo: 'Timing / "Agora não"', count: 8 },
  { motivo: "Sem retorno / Ghost", count: 4 },
  { motivo: "Funcionalidade ausente", count: 3 },
  { motivo: "Preço / Financeiro", count: 3 },
  { motivo: "Fechou c/ concorrente", count: 2 },
  { motivo: "Decisão bloqueada", count: 2 },
];

const planoMix = [
  { name: "Professional", value: 61 },
  { name: "Enterprise", value: 60 },
];

const contratoMix = [
  { name: "Novo", value: 109 },
  { name: "Upsell", value: 8 },
  { name: "Indicação", value: 4 },
];

const META = 70000;
const TOTAL = 50637.93;
const ASSINADOS = 44540.08;
const GERADOS = 6097.85;
const PENDENTES = 44827.00;
const DESISTENTES = 44622.60;

function MetaBar({ value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ background: "#1a2535", borderRadius: 6, overflow: "hidden", height: 8 }}>
      <div style={{ width: `${pct}%`, background: color, height: "100%", borderRadius: 6, transition: "width 1s ease" }} />
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: COLORS.card,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 12,
      padding: "20px 22px",
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <div style={{ width: 3, height: 18, background: COLORS.accent, borderRadius: 2 }} />
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", color: "#94A3B8", textTransform: "uppercase" }}>{children}</span>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#1E2D40", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "10px 14px" }}>
        <p style={{ color: COLORS.text, fontSize: 12, margin: 0, marginBottom: 6, fontWeight: 600 }}>{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.fill || p.color, fontSize: 12, margin: 0 }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [activeCloser, setActiveCloser] = useState(null);
  const metaPct = ((TOTAL / META) * 100).toFixed(1);

  const filteredTamanho = activeCloser
    ? tamanhoData.map((d) => ({ faixa: d.faixa, [activeCloser]: d[activeCloser] }))
    : tamanhoData;

  return (
    <div style={{
      background: COLORS.bg,
      minHeight: "100vh",
      color: COLORS.text,
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      padding: "28px 24px",
    }}>
      

      {/* Header */}
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.12em", color: COLORS.muted, textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>
            HubStrom · Meta Diária
          </div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", color: "#F1F5F9" }}>
            Análise Comercial — <span style={{ color: COLORS.accent }}>Março 2026</span>
          </h1>
          <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 4 }}>
            Período: 02/03 – 13/03 · 4 closers · 122 oportunidades
          </div>
        </div>
        <div style={{
          background: "#0F2027",
          border: `1px solid ${COLORS.border}`,
          borderRadius: 8,
          padding: "10px 18px",
          textAlign: "right",
        }}>
          <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 2 }}>Meta do Mês</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 22, fontWeight: 500, color: COLORS.accent }}>
            R$ {META.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 14, marginBottom: 22 }}>
        {[
          { label: "Total Gerado", value: TOTAL, color: COLORS.accent, note: `${metaPct}% da meta` },
          { label: "Assinados", value: ASSINADOS, color: "#6EE7B7", note: "Contratos fechados" },
          { label: "Em Geração", value: GERADOS, color: "#60A5FA", note: "Aguardando assinatura" },
          { label: "Pendentes", value: PENDENTES, color: "#A78BFA", note: "Pipeline ativo" },
          { label: "Desistentes", value: DESISTENTES, color: "#F87171", note: "Valor perdido" },
        ].map((kpi) => (
          <Card key={kpi.label} style={{ padding: "16px 18px" }}>
            <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6, fontWeight: 500 }}>{kpi.label}</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 18, fontWeight: 500, color: kpi.color, marginBottom: 6 }}>
              R$ {kpi.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
            <MetaBar value={kpi.value} max={META} color={kpi.color} />
            <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 5 }}>{kpi.note}</div>
          </Card>
        ))}
      </div>

      {/* Meta Progress */}
      <Card style={{ marginBottom: 22, padding: "18px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <SectionTitle>Progresso da Meta</SectionTitle>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 20, color: parseFloat(metaPct) >= 70 ? "#6EE7B7" : COLORS.accent, fontWeight: 600 }}>
            {metaPct}%
          </span>
        </div>
        <div style={{ background: "#1a2535", borderRadius: 8, overflow: "hidden", height: 14 }}>
          <div style={{
            width: `${metaPct}%`,
            height: "100%",
            borderRadius: 8,
            background: "linear-gradient(90deg, #F59E3F, #FBBF24)",
            transition: "width 1s ease",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", right: 0, top: 0, bottom: 0, width: 2,
              background: "rgba(255,255,255,0.4)", borderRadius: 2,
            }} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: COLORS.muted }}>
          <span>R$ 0</span>
          <span style={{ color: "#6EE7B7" }}>✓ R$ {TOTAL.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} atingido</span>
          <span>Meta: R$ {META.toLocaleString("pt-BR")}</span>
        </div>
      </Card>

      {/* Main 2-col grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

        {/* Ranking Closers */}
        <Card>
          <SectionTitle>Ranking de Closers</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {closerData.map((c, i) => (
              <div
                key={c.name}
                onClick={() => setActiveCloser(activeCloser === c.name ? null : c.name)}
                style={{
                  padding: "14px 16px",
                  borderRadius: 10,
                  border: `1px solid ${activeCloser === c.name ? closerColors[c.name] : COLORS.border}`,
                  background: activeCloser === c.name ? `${closerColors[c.name]}15` : "#0F1823",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: closerColors[c.name],
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 700, color: "#0B1120",
                    }}>{i + 1}</div>
                    <span style={{ fontWeight: 600, fontSize: 15, color: COLORS.text }}>{c.name}</span>
                  </div>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 14, fontWeight: 600,
                    color: closerColors[c.name],
                  }}>{c.conversao}%</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
                  {[
                    { l: "Total", v: c.total, col: COLORS.muted },
                    { l: "Fechados", v: c.contratado, col: "#6EE7B7" },
                    { l: "Perdidos", v: c.desistente, col: "#F87171" },
                    { l: "Pendentes", v: c.pendente, col: "#A78BFA" },
                  ].map((s) => (
                    <div key={s.l} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: s.col }}>{s.v}</div>
                      <div style={{ fontSize: 9, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: COLORS.muted }}>
                    Receita: <span style={{ color: closerColors[c.name], fontFamily: "'DM Mono', monospace" }}>
                      R$ {c.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                  </span>
                  <span style={{ fontSize: 11, color: COLORS.muted }}>
                    Clientes conv.: <span style={{ color: "#F1F5F9" }}>{c.clientes_conv.toLocaleString("pt-BR")}</span>
                  </span>
                </div>
                <div style={{ marginTop: 8 }}>
                  <MetaBar value={c.contratado} max={c.total} color={closerColors[c.name]} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tamanho das Contabilidades */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 0 }}>
            <SectionTitle>
              {activeCloser ? `Faixa de Clientes — ${activeCloser}` : "Faixa de Clientes por Closer"}
            </SectionTitle>
            {activeCloser && (
              <button
                onClick={() => setActiveCloser(null)}
                style={{
                  background: "none", border: `1px solid ${COLORS.border}`,
                  color: COLORS.muted, borderRadius: 6, padding: "3px 10px",
                  fontSize: 11, cursor: "pointer",
                }}
              >✕ Todos</button>
            )}
          </div>
          <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 14 }}>
            {activeCloser
              ? `Clique na legenda ou no card da closer para ver outras`
              : `Clique em uma closer para filtrar · Quantidade de oportunidades por faixa de clientes atendidos`}
          </div>
          <ResponsiveContainer width="100%" height={310}>
            <BarChart data={filteredTamanho} barGap={2} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2D45" vertical={false} />
              <XAxis dataKey="faixa" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={{ stroke: "#1F2D45" }} />
              <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: 10, fontSize: 12 }}
                formatter={(v) => <span style={{ color: closerColors[v] }}>{v}</span>}
              />
              {(!activeCloser ? ["Amanda", "Isabela", "Fernanda", "Michelle"] : [activeCloser]).map((name) => (
                <Bar key={name} dataKey={name} fill={closerColors[name]} radius={[3, 3, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>

        {/* Motivos de Desistência */}
        <Card>
          <SectionTitle>Motivos de Desistência</SectionTitle>
          <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 14 }}>Total: {motivosData.reduce((a, b) => a + b.count, 0)} desistências com motivo registrado</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {motivosData.map((m, i) => {
              const pct = (m.count / 8) * 100;
              const colors = ["#F87171", "#FB923C", "#FBBF24", "#A78BFA", "#60A5FA", "#6EE7B7"];
              return (
                <div key={m.motivo}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: COLORS.text }}>{m.motivo}</span>
                    <span style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: colors[i] }}>{m.count}</span>
                  </div>
                  <div style={{ background: "#1a2535", borderRadius: 4, overflow: "hidden", height: 5 }}>
                    <div style={{ width: `${pct}%`, background: colors[i], height: "100%", borderRadius: 4 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Mix de Planos */}
        <Card>
          <SectionTitle>Mix de Planos</SectionTitle>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <ResponsiveContainer width={130} height={130}>
              <PieChart>
                <Pie data={planoMix} cx="50%" cy="50%" innerRadius={38} outerRadius={58} dataKey="value" paddingAngle={3}>
                  <Cell fill="#F59E3F" />
                  <Cell fill="#60A5FA" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {planoMix.map((p, i) => (
                <div key={p.name} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? "#F59E3F" : "#60A5FA" }} />
                      <span style={{ fontSize: 13, color: COLORS.text }}>{p.name}</span>
                    </div>
                    <span style={{ fontSize: 13, color: i === 0 ? "#F59E3F" : "#60A5FA", fontFamily: "'DM Mono', monospace" }}>{p.value}</span>
                  </div>
                  <MetaBar value={p.value} max={121} color={i === 0 ? "#F59E3F" : "#60A5FA"} />
                  <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 3 }}>
                    {((p.value / 121) * 100).toFixed(1)}% das oportunidades
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 18, paddingTop: 16, borderTop: `1px solid ${COLORS.border}` }}>
            <SectionTitle>Origem dos Contratos</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {contratoMix.map((c, i) => {
                const colors2 = ["#6EE7B7", "#F59E3F", "#F472B6"];
                return (
                  <div key={c.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: colors2[i] }} />
                      <span style={{ fontSize: 13, color: COLORS.text }}>{c.name}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ background: "#1a2535", borderRadius: 4, overflow: "hidden", height: 5, width: 80 }}>
                        <div style={{ width: `${(c.value / 121) * 100}%`, background: colors2[i], height: "100%" }} />
                      </div>
                      <span style={{ fontSize: 12, color: colors2[i], fontFamily: "'DM Mono', monospace", minWidth: 28, textAlign: "right" }}>{c.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Receita por Closer */}
        <Card>
          <SectionTitle>Receita Fechada por Closer</SectionTitle>
          <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 12 }}>Valor com desconto · Apenas contratos assinados</div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={closerData} layout="vertical" barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2D45" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip formatter={(v) => [`R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, "Receita"]} />
              <Bar dataKey="valor" radius={[0, 4, 4, 0]}>
                {closerData.map((d) => <Cell key={d.name} fill={closerColors[d.name]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${COLORS.border}` }}>
            <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
              Média de clientes/oportunidade
            </div>
            {closerData.map((c) => (
              <div key={c.name} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: closerColors[c.name] }}>{c.name}</span>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: 12, color: COLORS.text, fontFamily: "'DM Mono', monospace" }}>
                    {Math.round(c.clientes_total / c.total)} clientes/opor.
                  </span>
                  <span style={{ fontSize: 11, color: COLORS.muted, marginLeft: 8 }}>
                    ({c.clientes_total.toLocaleString("pt-BR")} total)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Insights */}
      <Card>
        <SectionTitle>Insights & Alertas Estratégicos</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
          {[
            {
              icon: "🏆", color: "#F59E3F",
              title: "Amanda lidera em conversão",
              text: "53.3% de taxa — a melhor da equipe. Recebe as maiores contas (3 oportunidades 500+ clientes) e tem o maior ticket médio de clientes convertidos (2.525).",
            },
            {
              icon: "⚠️", color: "#F87171",
              title: "Michelle com 32% de conversão",
              text: "9 desistências e 9 pendentes para apenas 9 fechamentos. Alta proporção de 'Timing/Agora não'. Foco em contabilidades menores (até 100 clientes predomina).",
            },
            {
              icon: "📊", color: "#A78BFA",
              title: "Timing é o principal obstáculo",
              text: "8 de 22 desistências categorizadas (36%) são 'Agora não' — indica falta de urgência criada na apresentação. Oportunidade para trabalhar FOMO e deadline nas abordagens.",
            },
            {
              icon: "💼", color: "#6EE7B7",
              title: "Isabela: maior pipeline de pendentes",
              text: "11 pendentes no ativo — maior da equipe. Alto potencial de conversão nas próximas semanas. Prioridade: follow-up com Claudinei (200 cli.), Ingri (300 cli.), Rikelme (700 cli.).",
            },
            {
              icon: "🎯", color: "#60A5FA",
              title: "Meta: faltam R$ 19.362,07",
              text: `72.3% da meta atingida até 13/03. Com R$ 44.827 em pendentes, há margem para superar 100% se 43% das pendências fecharem. Fernanda precisa aumentar ritmo (38.7%).`,
            },
            {
              icon: "📈", color: "#FBBF24",
              title: "Professional x Enterprise empatados",
              text: "61 vs 60 oportunidades — equilíbrio saudável. Upsell representa apenas 7% dos contratos (8/121), indicando espaço para crescer essa modalidade no base atual.",
            },
          ].map((ins) => (
            <div key={ins.title} style={{
              padding: "14px 16px",
              borderRadius: 10,
              border: `1px solid ${ins.color}30`,
              background: `${ins.color}08`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 16 }}>{ins.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: ins.color }}>{ins.title}</span>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: "#94A3B8", lineHeight: 1.6 }}>{ins.text}</p>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: "#334155" }}>
        Dashboard HubStrom · Análise de Meta Diária Março 2026 · 122 oportunidades processadas
      </div>
    </div>
  );
}

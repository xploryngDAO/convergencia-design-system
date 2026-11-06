import { useState, type ReactNode } from 'react';
import { Badge, Button, cx, type Tone } from './atoms';
import { Alert } from './feedback';
import { TextField } from './fields';

/**
 * Blocos de domínio da Convergência.
 *
 * Composições opiniativas sobre os átomos do design system para as superfícies
 * que todo produto do ecossistema precisa: aprovação, custo, confiança,
 * proveniência e compatibilidade. Não decidem política; exibem o estado que o
 * kernel/harness/kit já decidiram.
 */

export type CapabilityEffect = 'read' | 'write' | 'external' | 'destructive';
export type TrustState = 'verified' | 'rejected' | 'unknown' | 'warning';
export type TruthClass = 'observed' | 'inferred' | 'unknown' | 'governance-index' | 'contract-spec';

const EFFECT_TONE: Record<CapabilityEffect, Tone> = {
  read: 'neutral',
  write: 'warning',
  external: 'accent',
  destructive: 'danger',
};

const TRUST_TONE: Record<TrustState, Tone> = {
  verified: 'success',
  rejected: 'danger',
  unknown: 'neutral',
  warning: 'warning',
};

export function EffectBadge({ effect }: { effect: CapabilityEffect }) {
  return <Badge tone={EFFECT_TONE[effect]}>efeito: {effect}</Badge>;
}

export function ApprovalGate({
  title = 'Aprovação necessária',
  kind = 'tool',
  tool,
  effect = 'destructive',
  egress = [],
  reasons = [],
  onApprove,
  onDeny,
  busy = false,
  children,
}: {
  title?: string;
  kind?: 'tool' | 'policy' | 'release' | 'package';
  tool?: string;
  effect?: CapabilityEffect;
  egress?: string[];
  reasons?: string[];
  onApprove?: () => void;
  onDeny?: () => void;
  busy?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="cv-block cv-approval" aria-label={title} aria-busy={busy || undefined}>
      <header className="cv-block-head">
        <div>
          <span className="cv-block-kicker">{kind}</span>
          <h3 className="cv-block-title">{title}</h3>
        </div>
        <EffectBadge effect={effect} />
      </header>
      {tool && <p className="cv-block-muted">ferramenta: {tool}</p>}
      {egress.length > 0 && (
        <p className="cv-block-muted">egress: {egress.join(', ')}</p>
      )}
      {reasons.length > 0 && (
        <ul className="cv-block-list">
          {reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      )}
      {children}
      <footer className="cv-block-actions">
        <Button variant="ghost" onClick={onDeny} disabled={busy}>
          Negar
        </Button>
        <Button variant="primary" onClick={onApprove} loading={busy}>
          Aprovar
        </Button>
      </footer>
    </section>
  );
}

export function CostMeter({
  debit = 0,
  budget = 0,
  costUsd = 0,
  label = 'Consumo',
}: {
  debit?: number;
  budget?: number;
  costUsd?: number;
  label?: string;
}) {
  const ratio = budget > 0 ? Math.min(1, Math.max(0, debit / budget)) : 0;
  const percent = Math.round(ratio * 100);
  return (
    <section className="cv-block cv-cost" aria-label={label}>
      <header className="cv-block-head">
        <h3 className="cv-block-title">{label}</h3>
        <span className="cv-block-value">{debit} / {budget}</span>
      </header>
      <div
        className={cx('cv-cost-track', ratio >= 0.8 && 'cv-cost-track--warning')}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={budget}
        aria-valuenow={debit}
        aria-label={`${label}: ${percent}%`}
      >
        <span className="cv-cost-fill" style={{ width: `${percent}%` }} />
      </div>
      <p className="cv-block-muted">{percent}% do orçamento · custo do provedor US$ {costUsd.toFixed(4)}</p>
    </section>
  );
}

export function TrustBadge({
  status = 'unknown',
  detail,
  label = 'confiança',
}: {
  status?: TrustState;
  detail?: string;
  label?: string;
}) {
  return (
    <span className="cv-block cv-trust">
      <span className="cv-block-kicker">{label}</span>
      <Badge tone={TRUST_TONE[status]}>{status}</Badge>
      {detail && <span className="cv-block-muted">{detail}</span>}
    </span>
  );
}

export function ProvenanceTag({
  source,
  reference,
  truthClass = 'observed',
}: {
  source: string;
  reference?: string;
  truthClass?: TruthClass;
}) {
  return (
    <span className="cv-block cv-provenance">
      <span className="cv-block-kicker">proveniência</span>
      <code>{source}</code>
      {reference && <code className="cv-block-muted">{reference}</code>}
      <Badge tone={truthClass === 'observed' ? 'success' : 'neutral'}>{truthClass}</Badge>
    </span>
  );
}

export type CompatStatus = 'proven' | 'declared' | 'unproven' | 'pending-adoption' | 'forbidden';

export function CompatMatrix({
  rows,
  title = 'Compatibilidade',
}: {
  rows: { pair: string; from: string; to: string; status: CompatStatus }[];
  title?: string;
}) {
  const tone: Record<CompatStatus, Tone> = {
    proven: 'success',
    declared: 'accent',
    unproven: 'warning',
    'pending-adoption': 'warning',
    forbidden: 'danger',
  };
  return (
    <section className="cv-block cv-compat" aria-label={title}>
      <h3 className="cv-block-title">{title}</h3>
      <table>
        <thead>
          <tr>
            <th scope="col">par</th>
            <th scope="col">de</th>
            <th scope="col">para</th>
            <th scope="col">estado</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.pair}>
              <td>{row.pair}</td>
              <td>{row.from}</td>
              <td>{row.to}</td>
              <td>
                <Badge tone={tone[row.status]}>{row.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function ScoreBadge({ score = 0, label = 'score' }: { score?: number; label?: string }) {
  const value = Math.max(0, Math.min(100, Math.round(score)));
  const tone: Tone = value >= 90 ? 'success' : value >= 70 ? 'warning' : 'danger';
  return (
    <span className="cv-block cv-score">
      <span className="cv-block-kicker">{label}</span>
      <Badge tone={tone}>{value}/100</Badge>
    </span>
  );
}

export type EvidenceItem = {
  id: string;
  kind: string;
  environment: string;
  passed: boolean;
  detail: string;
  digest?: string;
};

export function EvidencePanel({
  title = 'Evidência',
  items = [],
}: {
  title?: string;
  items?: EvidenceItem[];
}) {
  return (
    <section className="cv-block cv-evidence" aria-label={title}>
      <h3 className="cv-block-title">{title}</h3>
      {items.length === 0 ? (
        <p className="cv-block-muted">Sem evidência registrada.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <Badge tone={item.passed ? 'success' : 'danger'}>{item.passed ? 'passou' : 'falhou'}</Badge>
              <span className="cv-evidence-kind">{item.kind}</span>
              <span className="cv-block-muted">{item.environment}</span>
              <span className="cv-evidence-detail">{item.detail}</span>
              {item.digest && <code>{item.digest.slice(0, 12)}…</code>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function PackageReport({
  title = 'Pacote assinado',
  name,
  version,
  publisher,
  digest,
  status = 'verified',
  checks = [],
}: {
  title?: string;
  name: string;
  version: string;
  publisher?: string;
  digest?: string;
  status?: TrustState;
  checks?: { id: string; passed: boolean; detail: string }[];
}) {
  return (
    <section className="cv-block cv-package" aria-label={title}>
      <header className="cv-block-head">
        <div>
          <span className="cv-block-kicker">{title}</span>
          <h3 className="cv-block-title">
            {name} <span className="cv-block-muted">v{version}</span>
          </h3>
        </div>
        <TrustBadge status={status} label="assinatura" />
      </header>
      {publisher && <p className="cv-block-muted">publisher: {publisher}</p>}
      {digest && <p className="cv-block-muted">digest: <code>{digest.slice(0, 16)}…</code></p>}
      {checks.length > 0 && (
        <ul className="cv-block-list">
          {checks.map((check) => (
            <li key={check.id}>
              {check.passed ? 'ok' : 'falhou'} · {check.id}: {check.detail}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export type SurfaceName = 'landing' | 'login' | 'app' | 'embed' | 'mobile';

export function SurfaceFrame({
  surface = 'app',
  title,
  subtitle,
  actions,
  children,
}: {
  surface?: SurfaceName;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="cv-surface" data-surface={surface} aria-label={title}>
      <header className="cv-surface-head">
        <div>
          <span className="cv-block-kicker">superfície: {surface}</span>
          <h2 className="cv-surface-title">{title}</h2>
          {subtitle && <p className="cv-block-muted">{subtitle}</p>}
        </div>
        {actions}
      </header>
      <div className="cv-surface-body">{children}</div>
    </section>
  );
}

export function WorkspaceFrame({
  rail,
  topbar,
  children,
}: {
  rail?: ReactNode;
  topbar?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="cv-workspace">
      {rail && <aside className="cv-workspace-rail">{rail}</aside>}
      <div className="cv-workspace-main">
        {topbar && <header className="cv-workspace-topbar">{topbar}</header>}
        <div className="cv-workspace-content">{children}</div>
      </div>
    </div>
  );
}

export function PanelSection({
  title,
  subtitle,
  actions,
  children,
  scroll = false,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children?: ReactNode;
  scroll?: boolean;
}) {
  return (
    <section className="cv-panel-section" aria-label={title}>
      <header className="cv-panel-head">
        <div>
          <h3 className="cv-panel-title">{title}</h3>
          {subtitle && <p className="cv-block-muted">{subtitle}</p>}
        </div>
        {actions}
      </header>
      <div className={cx('cv-panel-body', scroll && 'cv-panel-body--scroll')}>{children}</div>
    </section>
  );
}

export function StatStrip({
  items = [],
}: {
  items?: { label: string; value: string | number; tone?: Tone }[];
}) {
  return (
    <dl className="cv-stat-strip">
      {items.map((item) => (
        <div key={item.label} className="cv-stat-strip-item">
          <dt className="cv-block-kicker">{item.label}</dt>
          <dd className={cx('cv-stat-value', item.tone && `cv-tone--${item.tone}`)}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function QueueRow({
  title,
  subtitle,
  meta,
  badges,
  active = false,
  onClick,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  badges?: ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={cx('cv-queue-row', active && 'cv-queue-row--active')}
      aria-current={active ? 'true' : undefined}
      onClick={onClick}
    >
      <span className="cv-queue-row-main">
        <span className="cv-queue-row-title">{title}</span>
        {subtitle && <span className="cv-queue-row-subtitle">{subtitle}</span>}
        {meta && <span className="cv-queue-row-meta">{meta}</span>}
      </span>
      {badges && <span className="cv-queue-row-badges">{badges}</span>}
    </button>
  );
}

export function MetaRow({
  label,
  value,
  mono = true,
}: {
  label: string;
  value: ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="cv-meta-row">
      <span className="cv-block-kicker">{label}</span>
      <span className={cx('cv-meta-value', mono && 'cv-mono')}>{value}</span>
    </div>
  );
}

export function SlaPill({
  deadline,
  tone = 'ok',
  prefix,
}: {
  deadline: string;
  tone?: 'ok' | 'warn' | 'danger';
  prefix?: string;
}) {
  const mapped: Tone = tone === 'ok' ? 'success' : tone === 'warn' ? 'warning' : 'danger';
  return (
    <span className={cx('cv-sla', `cv-tone--${mapped}`)} role="status">
      <span className="cv-status-dot" aria-hidden="true" />
      {prefix && <span className="cv-block-kicker">{prefix}</span>}
      {deadline}
    </span>
  );
}

export type Channel = 'amazon' | 'meli' | 'shopee' | (string & {});

const CHANNEL_TONE: Record<string, Tone> = { amazon: 'warning', meli: 'accent', shopee: 'rose' };

export function ChannelBadge({ channel, label }: { channel: Channel; label?: string }) {
  return <Badge tone={CHANNEL_TONE[channel] ?? 'neutral'}>{label ?? channel}</Badge>;
}

export function AgentDock({
  items = [],
  activeId,
  onSelect,
  onAgent,
  agentLabel = 'Agente',
}: {
  items?: { id: string; label: string; icon?: ReactNode }[];
  activeId?: string;
  onSelect?: (id: string) => void;
  onAgent?: () => void;
  agentLabel?: string;
}) {
  const middle = Math.floor(items.length / 2);
  const before = items.slice(0, middle);
  const after = items.slice(middle);
  const renderItem = (item: { id: string; label: string; icon?: ReactNode }) => (
    <button
      key={item.id}
      type="button"
      className={cx('cv-dock-item', activeId === item.id && 'cv-dock-item--active')}
      aria-current={activeId === item.id ? 'page' : undefined}
      onClick={() => onSelect?.(item.id)}
    >
      <span className="cv-dock-icon" aria-hidden="true">{item.icon ?? '◇'}</span>
      <span className="cv-dock-label">{item.label}</span>
    </button>
  );
  return (
    <nav className="cv-dock" aria-label="Navegação do app">
      {before.map(renderItem)}
      <button type="button" className="cv-dock-agent" onClick={onAgent} aria-label={agentLabel}>
        <span className="cv-dock-agent-symbol" aria-hidden="true">◆</span>
        <span>{agentLabel}</span>
      </button>
      {after.map(renderItem)}
    </nav>
  );
}

export type NavEntry = {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: number | string;
};

export function RailNav({
  items = [],
  sections = [],
  activeId,
  onSelect,
  brand,
  footer,
  wide = false,
  label = 'Navegação',
}: {
  items?: NavEntry[];
  sections?: { label: string; items: NavEntry[] }[];
  activeId?: string;
  onSelect?: (id: string) => void;
  brand?: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
  label?: string;
}) {
  const renderItem = (item: NavEntry) => {
    const active = item.id === activeId;
    return (
      <li key={item.id}>
        <button
          type="button"
          className={cx('cv-rail-item', active && 'cv-rail-item--active')}
          aria-current={active ? 'page' : undefined}
          title={item.label}
          onClick={() => onSelect?.(item.id)}
        >
          {item.icon && <span className="cv-rail-icon" aria-hidden="true">{item.icon}</span>}
          <span className="cv-rail-label">{item.label}</span>
          {item.badge != null && <span className="cv-rail-badge">{item.badge}</span>}
        </button>
      </li>
    );
  };

  return (
    <nav className={cx('cv-rail', wide && 'cv-rail--wide')} aria-label={label}>
      {brand && <div className="cv-rail-brand">{brand}</div>}
      <ul className="cv-rail-list">
        {items.map(renderItem)}
        {sections.map((section) => (
          <li key={section.label} className="cv-rail-section">
            <span className="cv-rail-section-label">{section.label}</span>
            <ul className="cv-rail-sublist">{section.items.map(renderItem)}</ul>
          </li>
        ))}
      </ul>
      {footer && <div className="cv-rail-footer">{footer}</div>}
    </nav>
  );
}

export type LauncherItem = {
  id: string;
  label: string;
  hint?: string;
  icon?: ReactNode;
};

export function LauncherMenu({
  title = 'Menu',
  placeholder = 'Buscar destinos, projetos e agentes…',
  shortcuts = [],
  recents = [],
  sections = [],
  onSelect,
  fluid = false,
}: {
  title?: string;
  placeholder?: string;
  shortcuts?: LauncherItem[];
  recents?: LauncherItem[];
  sections?: { title: string; items: LauncherItem[] }[];
  onSelect?: (id: string) => void;
  fluid?: boolean;
}) {
  const [query, setQuery] = useState('');
  const term = query.trim().toLowerCase();
  const matches = (item: LauncherItem) => `${item.label} ${item.hint ?? ''}`.toLowerCase().includes(term);
  const all = [...shortcuts, ...recents, ...sections.flatMap((section) => section.items)];
  const empty = term.length > 0 && !all.some(matches);

  return (
    <div className={cx('cv-launcher', fluid && 'cv-launcher--fluid')} role="dialog" aria-label={title}>
      <header className="cv-launcher-head">
        <div className="cv-launcher-title">
          <span className="cv-block-kicker">launcher de espaços</span>
          <h2>{title}</h2>
        </div>
        <kbd className="cv-launcher-kbd">⌘ K</kbd>
      </header>

      <label className="cv-launcher-search">
        <span aria-hidden="true">⌕</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          aria-label="Buscar no menu"
        />
      </label>

      <div className="cv-launcher-body">
        {shortcuts.length > 0 && (
          <section className="cv-launcher-section">
            <h3>Atalhos</h3>
            <div className="cv-launcher-shortcuts">
              {shortcuts.filter(matches).map((item) => (
                <button key={item.id} type="button" className="cv-launcher-shortcut" onClick={() => onSelect?.(item.id)}>
                  <span className="cv-launcher-icon" aria-hidden="true">{item.icon ?? '◇'}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {recents.length > 0 && (
          <section className="cv-launcher-section">
            <h3>Recentes</h3>
            <ul className="cv-launcher-recents">
              {recents.filter(matches).map((item) => (
                <li key={item.id}>
                  <button type="button" onClick={() => onSelect?.(item.id)}>
                    <span>{item.label}</span>
                    {item.hint && <small>{item.hint}</small>}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {sections.map((section) => {
          const items = section.items.filter(matches);
          if (items.length === 0) return null;
          return (
            <section key={section.title} className="cv-launcher-section">
              <h3>{section.title}</h3>
              <ul className="cv-launcher-list">
                {items.map((item) => (
                  <li key={item.id}>
                    <button type="button" onClick={() => onSelect?.(item.id)}>
                      <span className="cv-launcher-icon" aria-hidden="true">{item.icon ?? '◇'}</span>
                      <span className="cv-launcher-copy">
                        <strong>{item.label}</strong>
                        {item.hint && <small>{item.hint}</small>}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        {empty && <p className="cv-launcher-empty">Nada encontrado para “{query}”.</p>}
      </div>

      <footer className="cv-launcher-foot">
        <span><kbd>↑</kbd><kbd>↓</kbd> navegar</span>
        <span><kbd>↵</kbd> abrir</span>
        <span><kbd>esc</kbd> fechar</span>
      </footer>
    </div>
  );
}


export type AuthMode = 'login' | 'register' | 'recover';

export type AuthValues = {
  email: string;
  password: string;
  name?: string;
  tenantName?: string;
};

const AUTH_COPY: Record<AuthMode, { title: string; subtitle: string; action: string }> = {
  login: { title: 'Entrar no seu espaço', subtitle: 'Use seu e-mail corporativo para continuar.', action: 'Entrar' },
  register: { title: 'Criar sua conta', subtitle: 'Comece com um workspace e convide sua equipe.', action: 'Criar conta' },
  recover: { title: 'Recuperar acesso', subtitle: 'Enviaremos um link de uso único para o seu e-mail.', action: 'Enviar link' },
};

export function AuthScreen({
  brand = 'Convergência',
  mode: initialMode = 'login',
  loading = false,
  error,
  notice,
  allowRegister = true,
  demo,
  onSubmit,
  onModeChange,
}: {
  brand?: string;
  mode?: AuthMode;
  loading?: boolean;
  error?: string;
  notice?: string;
  allowRegister?: boolean;
  demo?: string;
  onSubmit?: (values: AuthValues, mode: AuthMode) => void | Promise<void>;
  onModeChange?: (mode: AuthMode) => void;
}) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [tenantName, setTenantName] = useState('');

  const changeMode = (next: AuthMode) => {
    setMode(next);
    onModeChange?.(next);
  };
  const copy = AUTH_COPY[mode];

  return (
    <div className="cv-auth">
      <aside className="cv-auth-brand">
        <div className="cv-auth-brand-top">
          <span className="cv-auth-mark" aria-hidden="true">◇</span>
          <span>{brand}</span>
        </div>
        <div>
          <p className="cv-auth-kicker">acesso governado</p>
          <h1>Identidade única.<br />Contexto em cada ação.</h1>
          <p className="cv-auth-lede">
            Sessão, tenant, política e auditoria no mesmo lugar. O backend decide,
            o produto só apresenta.
          </p>
        </div>
        <ul className="cv-auth-points">
          <li><span>01</span> Login com sessão curta e refresh rotativo</li>
          <li><span>02</span> Tenant ativo e membership vigente</li>
          <li><span>03</span> 2FA, recuperação e trilha de auditoria</li>
        </ul>
        <p className="cv-auth-brand-foot">Convergência · design system</p>
      </aside>

      <main className="cv-auth-panel">
        <div className="cv-auth-card">
          <header className="cv-auth-head">
            <Badge tone="accent">ambiente seguro</Badge>
            <h2>{copy.title}</h2>
            <p>{copy.subtitle}</p>
          </header>

          {allowRegister && (
            <div className="cv-auth-tabs" role="tablist" aria-label="Modo de acesso">
              <button type="button" role="tab" aria-selected={mode === 'login'} onClick={() => changeMode('login')}>
                Entrar
              </button>
              <button type="button" role="tab" aria-selected={mode === 'register'} onClick={() => changeMode('register')}>
                Criar conta
              </button>
            </div>
          )}

          <form
            className="cv-auth-form"
            onSubmit={(event) => {
              event.preventDefault();
              void onSubmit?.({ email, password, name, tenantName }, mode);
            }}
          >
            {mode === 'register' && (
              <>
                <TextField label="Seu nome" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
                <TextField
                  label="Nome do workspace"
                  hint="Opcional; cria um tenant com você como owner."
                  value={tenantName}
                  onChange={(event) => setTenantName(event.target.value)}
                  autoComplete="organization"
                />
              </>
            )}
            <TextField
              label="E-mail"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="voce@empresa.com"
            />
            {mode !== 'recover' && (
              <TextField
                label="Senha"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                hint={mode === 'register' ? 'Mínimo de 12 caracteres.' : undefined}
              />
            )}

            {error && <Alert tone="danger" title="Não foi possível continuar">{error}</Alert>}
            {notice && <Alert tone="success" title="Tudo certo">{notice}</Alert>}

            <Button type="submit" variant="primary" disabled={loading} className="cv-auth-submit">
              {loading ? 'Processando…' : copy.action}
            </Button>

            <div className="cv-auth-links">
              {mode !== 'recover' ? (
                <button type="button" onClick={() => changeMode('recover')}>Esqueci minha senha</button>
              ) : (
                <button type="button" onClick={() => changeMode('login')}>Voltar para o login</button>
              )}
              {demo && <span className="cv-auth-demo">{demo}</span>}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

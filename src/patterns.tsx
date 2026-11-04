import React, { useState, type ReactNode } from 'react';
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Heading,
  Icon,
  IconButton,
  Progress,
  Text,
  cx,
  type IconName,
  type Tone,
} from './atoms';
import { Navigation, BottomNav, type NavItem } from './navigation';
import { Dialog } from './feedback';
export function Stack({
  children,
  gap = 16,
  direction = 'column',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { gap?: number; direction?: 'row' | 'column' }) {
  return (
    <div
      {...props}
      className={cx('cv-stack', props.className)}
      style={{ ...props.style, gap, flexDirection: direction }}
    >
      {children}
    </div>
  );
}
export function Grid({
  children,
  min = 240,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { min?: number }) {
  return (
    <div
      {...props}
      className={cx('cv-grid', props.className)}
      style={{
        ...props.style,
        gridTemplateColumns: `repeat(auto-fit,minmax(min(100%,${min}px),1fr))`,
      }}
    >
      {children}
    </div>
  );
}
export function Card({
  children,
  footer,
  ...props
}: React.HTMLAttributes<HTMLElement> & { footer?: ReactNode }) {
  return (
    <section {...props} className={cx('cv-card', props.className)}>
      {children}
      {footer && <footer>{footer}</footer>}
    </section>
  );
}
export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <header className="cv-page-header">
      <div>
        {eyebrow && <span className="cv-eyebrow">{eyebrow}</span>}
        <Heading level={1}>{title}</Heading>
        {description && <Text muted>{description}</Text>}
      </div>
      {actions && <div className="cv-actions">{actions}</div>}
    </header>
  );
}
export function Toolbar({
  children,
  label = 'Ferramentas',
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="cv-toolbar" role="group" aria-label={label}>
      {children}
    </div>
  );
}
export function AgentCard({
  name,
  role,
  selected,
  onSelect,
  src,
}: {
  name: string;
  role: string;
  selected?: boolean;
  onSelect: () => void;
  src?: string;
}) {
  return (
    <button
      className={cx('cv-agent-card', selected && 'is-selected')}
      type="button"
      aria-pressed={!!selected}
      onClick={onSelect}
    >
      <Avatar name={name} src={src} size="lg" />
      <strong>{name}</strong>
      <small>{role}</small>
      {selected && <Icon name="spark" size={16} />}
    </button>
  );
}
export function AgentRoster({
  agents,
  selected,
  onSelect,
}: {
  agents: { name: string; role: string; src?: string }[];
  selected: string;
  onSelect: (name: string) => void;
}) {
  return (
    <div className="cv-agent-roster" role="group" aria-label="Escolher agente">
      {agents.map((a) => (
        <AgentCard
          {...a}
          key={a.name}
          selected={selected === a.name}
          onSelect={() => onSelect(a.name)}
        />
      ))}
    </div>
  );
}
export function Composer({
  agent = 'Jarvis',
  onSend,
  disabled = false,
  placeholder = 'O que vamos construir hoje?',
  context,
}: {
  agent?: string;
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
  context?: ReactNode;
}) {
  const [text, setText] = useState('');
  return (
    <form
      className="cv-composer"
      onSubmit={(e) => {
        e.preventDefault();
        if (text.trim() && !disabled) {
          onSend(text.trim());
          setText('');
        }
      }}
    >
      <div className="cv-composer-context">
        <Avatar name={agent} size="sm" />
        <span>Conversar com {agent}</span>
        {context}
      </div>
      <textarea
        aria-label="Mensagem para o agente"
        placeholder={placeholder}
        value={text}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="cv-composer-footer">
        <span className="cv-muted">Revise antes de enviar</span>
        <Button type="submit" variant="primary" icon="arrow" disabled={disabled || !text.trim()}>
          Enviar
        </Button>
      </div>
    </form>
  );
}
export function Message({
  author,
  children,
  human = false,
  time,
}: {
  author: string;
  children: ReactNode;
  human?: boolean;
  time?: string;
}) {
  return (
    <article
      className={cx('cv-message', human && 'cv-message--human')}
      aria-label={`Mensagem de ${author}`}
    >
      <header>
        <Avatar name={author} size="sm" />
        <strong>{author}</strong>
        {time && <time>{time}</time>}
      </header>
      <div>{children}</div>
    </article>
  );
}
export function ArtifactCard({
  title,
  description,
  icon = 'file',
  onOpen,
}: {
  title: string;
  description: string;
  icon?: IconName;
  onOpen: () => void;
}) {
  return (
    <button type="button" className="cv-artifact" onClick={onOpen}>
      <span className="cv-artifact-icon">
        <Icon name={icon} />
      </span>
      <span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
      <Icon name="chevron" size={16} />
    </button>
  );
}
export function ProjectCard({
  title,
  description,
  status = 'Em andamento',
  progress = 0,
  members = [],
  onOpen,
}: {
  title: string;
  description: string;
  status?: string;
  progress?: number;
  members?: string[];
  onOpen: () => void;
}) {
  return (
    <Card
      className="cv-project-card"
      footer={
        <>
          <AvatarGroup names={members} />
          <Button onClick={onOpen} icon="arrow">
            Abrir projeto
          </Button>
        </>
      }
    >
      <div className="cv-card-top">
        <span className="cv-artifact-icon">
          <Icon name="folder" />
        </span>
        <Badge tone="accent">{status}</Badge>
      </div>
      <Heading level={2}>{title}</Heading>
      <Text muted>{description}</Text>
      <Progress label="Progresso" value={progress} />
    </Card>
  );
}
export function StatCard({
  label,
  value,
  detail,
  icon = 'chart',
}: {
  label: string;
  value: string;
  detail?: string;
  icon?: IconName;
}) {
  return (
    <Card className="cv-stat">
      <div>
        <Text muted>{label}</Text>
        <strong>{value}</strong>
        {detail && <small>{detail}</small>}
      </div>
      <Icon name={icon} />
    </Card>
  );
}
export function DataTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: { key: string; label: string }[];
  rows: Record<string, ReactNode>[];
}) {
  return (
    <div className="cv-table-scroll" tabIndex={0} role="region" aria-label={caption}>
      <table className="cv-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {columns.map((c) => (
                <td key={c.key}>{r[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function Timeline({
  items,
}: {
  items: { title: string; detail: string; time: string; tone?: Tone }[];
}) {
  return (
    <ol className="cv-timeline">
      {items.map((i, n) => (
        <li key={n}>
          <span className={cx('cv-timeline-dot', `cv-tone--${i.tone || 'accent'}`)} />
          <div>
            <strong>{i.title}</strong>
            <Text muted>{i.detail}</Text>
            <time>{i.time}</time>
          </div>
        </li>
      ))}
    </ol>
  );
}
export function ApprovalCard({
  title,
  description,
  onApprove,
  onReject,
  pending = false,
}: {
  title: string;
  description: string;
  onApprove: () => void;
  onReject: () => void;
  pending?: boolean;
}) {
  return (
    <Card className="cv-approval">
      <Badge tone="warning">Sua decisão</Badge>
      <Heading level={3}>{title}</Heading>
      <Text muted>{description}</Text>
      <div className="cv-actions">
        <Button onClick={onReject} disabled={pending}>
          Revisar
        </Button>
        <Button variant="primary" onClick={onApprove} loading={pending}>
          Aprovar proposta
        </Button>
      </div>
    </Card>
  );
}
export function CanvasNode({
  title,
  description,
  kind = 'Etapa',
  selected,
  onSelect,
}: {
  title: string;
  description: string;
  kind?: string;
  selected?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={cx('cv-canvas-node', selected && 'is-selected')}
      aria-pressed={!!selected}
      onClick={onSelect}
    >
      <Badge>{kind}</Badge>
      <strong>{title}</strong>
      <span>{description}</span>
    </button>
  );
}
export function CalendarEvent({
  title,
  time,
  tone = 'accent',
  onOpen,
}: {
  title: string;
  time: string;
  tone?: Tone;
  onOpen: () => void;
}) {
  return (
    <button type="button" className={cx('cv-calendar-event', `cv-tone--${tone}`)} onClick={onOpen}>
      <time>{time}</time>
      <strong>{title}</strong>
    </button>
  );
}
export function WorkspaceSwitcher({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (s: string) => void;
}) {
  return (
    <label className="cv-workspace">
      <Icon name="grid" />
      <span className="cv-sr-only">Espaço de trabalho</span>
      <select
        aria-label="Espaço de trabalho"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
export function AppShell({
  brand = 'SuperJarvis',
  items,
  active,
  onNavigate,
  children,
  inspector,
  header,
  workspace,
}: {
  brand?: string;
  items: NavItem[];
  active: string;
  onNavigate: (s: string) => void;
  children: ReactNode;
  inspector?: ReactNode;
  header?: ReactNode;
  workspace?: ReactNode;
}) {
  const [assistantOpen, setAssistantOpen] = useState(false);
  return (
    <div className="cv-app-shell">
      <a className="cv-skip" href="#cv-main">
        Ir para o conteúdo
      </a>
      <aside className="cv-rail">
        <a className="cv-wordmark" href="#home">
          <Icon name="spark" size={30} />
          {brand}
        </a>
        {workspace}
        <Navigation items={items} active={active} onNavigate={onNavigate} />
        <div className="cv-rail-footer">
          Convergência <Badge>0.1</Badge>
        </div>
      </aside>
      <div className="cv-app-frame">
        <header className="cv-topbar">
          <span>{brand}</span>
          <div className="cv-topbar-actions">
            {header}
            {inspector && (
              <Button
                className="cv-mobile-assistant"
                icon="chat"
                onClick={() => setAssistantOpen(true)}
              >
                Agente
              </Button>
            )}
          </div>
        </header>
        <div className={cx('cv-app-workspace', !!inspector && 'has-inspector')}>
          <main id="cv-main" tabIndex={-1}>
            {children}
          </main>
          {inspector && (
            <aside className="cv-inspector" aria-label="Assistente contextual">
              {inspector}
            </aside>
          )}
        </div>
      </div>
      <BottomNav items={items.slice(0, 5)} active={active} onNavigate={onNavigate} />
      {inspector && (
        <Dialog
          title="Assistente contextual"
          description="Continue com o agente neste contexto."
          open={assistantOpen}
          onOpenChange={setAssistantOpen}
        >
          {assistantOpen ? inspector : null}
        </Dialog>
      )}
    </div>
  );
}

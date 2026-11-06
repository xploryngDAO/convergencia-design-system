import { type ReactNode } from 'react';
import { Badge, Button, cx, type Tone } from './atoms';

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

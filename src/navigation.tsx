import React, { type ReactNode } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as MenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Button, Icon, cx, type IconName } from './atoms';
import { useTheme } from './provider';
export type TabItem = { value: string; label: string; content: ReactNode; disabled?: boolean };
/** Arrow keys navigate; disabled tabs are skipped; panels own their accessible linkage. */
export function Tabs({
  items,
  label,
  value,
  onValueChange,
}: {
  items: TabItem[];
  label: string;
  value?: string;
  onValueChange?: (v: string) => void;
}) {
  return (
    <TabsPrimitive.Root
      className="cv-tabs"
      defaultValue={items.find((i) => !i.disabled)?.value}
      value={value}
      onValueChange={onValueChange}
    >
      <TabsPrimitive.List className="cv-tab-list" aria-label={label}>
        {items.map((i) => (
          <TabsPrimitive.Trigger
            className="cv-tab"
            key={i.value}
            value={i.value}
            disabled={i.disabled}
          >
            {i.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {items.map((i) => (
        <TabsPrimitive.Content className="cv-tab-panel" key={i.value} value={i.value}>
          {i.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
export function SegmentedControl({
  label,
  options,
  value,
  onValueChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onValueChange: (v: string) => void;
}) {
  return (
    <div className="cv-segmented" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          type="button"
          key={o.value}
          aria-pressed={value === o.value}
          onClick={() => onValueChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
export type NavItem = { id: string; label: string; icon: IconName; href?: string; count?: number };
export function Navigation({
  items,
  active,
  onNavigate,
  label = 'Navegação principal',
  compact = false,
}: {
  items: NavItem[];
  active: string;
  onNavigate?: (id: string) => void;
  label?: string;
  compact?: boolean;
}) {
  return (
    <nav className={cx('cv-navigation', compact && 'cv-navigation--compact')} aria-label={label}>
      {items.map((item) => (
        <a
          className="cv-nav-item"
          key={item.id}
          href={item.href || `#${item.id}`}
          aria-current={active === item.id ? 'page' : undefined}
          onClick={
            onNavigate
              ? (e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }
              : undefined
          }
        >
          <Icon name={item.icon} />
          <span>{item.label}</span>
          {item.count !== undefined && <small>{item.count}</small>}
        </a>
      ))}
    </nav>
  );
}
export function BottomNav(props: React.ComponentProps<typeof Navigation>) {
  return (
    <div className="cv-bottom-nav">
      <Navigation {...props} label={props.label || 'Navegação móvel'} />
    </div>
  );
}
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Caminho" className="cv-breadcrumbs">
      <ol>
        {items.map((i, n) => (
          <li key={n}>
            {n > 0 && <Icon name="chevron" size={12} />}
            {i.href ? (
              <a href={i.href}>{i.label}</a>
            ) : (
              <span aria-current={n === items.length - 1 ? 'page' : undefined}>{i.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
export function Pagination({
  page,
  total,
  onPageChange,
}: {
  page: number;
  total: number;
  onPageChange: (n: number) => void;
}) {
  return (
    <nav className="cv-pagination" aria-label="Paginação">
      <Button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Anterior
      </Button>
      <span aria-live="polite">
        {page} / {Math.max(total, 1)}
      </span>
      <Button disabled={page >= total} onClick={() => onPageChange(page + 1)}>
        Próxima
      </Button>
    </nav>
  );
}
export function DropdownMenu({
  label,
  items,
}: {
  label: string;
  items: { label: string; onSelect: () => void; disabled?: boolean; danger?: boolean }[];
}) {
  const theme = useTheme();
  return (
    <MenuPrimitive.Root>
      <MenuPrimitive.Trigger asChild>
        <Button icon="down">{label}</Button>
      </MenuPrimitive.Trigger>
      <MenuPrimitive.Portal>
        <MenuPrimitive.Content className="cv-root cv-menu" data-theme={theme} sideOffset={6}>
          {items.map((i, n) => (
            <MenuPrimitive.Item
              key={n}
              className={cx('cv-menu-item', i.danger && 'cv-danger')}
              onSelect={i.onSelect}
              disabled={i.disabled}
            >
              {i.label}
            </MenuPrimitive.Item>
          ))}
        </MenuPrimitive.Content>
      </MenuPrimitive.Portal>
    </MenuPrimitive.Root>
  );
}
export function Tooltip({ content, children }: { content: string; children: React.ReactElement }) {
  const theme = useTheme();
  return (
    <TooltipPrimitive.Provider delayDuration={250}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className="cv-root cv-tooltip"
            data-theme={theme}
            sideOffset={8}
          >
            {content}
            <TooltipPrimitive.Arrow className="cv-tooltip-arrow" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="cv-stepper" aria-label="Etapas">
      {steps.map((s, i) => (
        <li key={s} aria-current={current === i ? 'step' : undefined}>
          <span aria-hidden="true">{i < current ? <Icon name="check" size={14} /> : i + 1}</span>
          <span>
            {s}
            {i < current && <span className="cv-sr-only"> concluída</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}

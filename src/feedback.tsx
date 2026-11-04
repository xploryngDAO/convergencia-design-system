import React, { type ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useTheme } from './provider';
import { Icon, IconButton, Heading, Text, cx, type Tone, type IconName } from './atoms';
export function Alert({
  title,
  children,
  tone = 'accent',
}: {
  title: string;
  children?: ReactNode;
  tone?: Tone;
}) {
  return (
    <div
      className={cx('cv-alert', `cv-tone--${tone}`)}
      role={tone === 'danger' ? 'alert' : 'status'}
    >
      <Icon name={tone === 'success' ? 'check' : 'bell'} />
      <div>
        <strong>{title}</strong>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}
export function Toast({ children, onDismiss }: { children: ReactNode; onDismiss?: () => void }) {
  return (
    <div className="cv-toast" role="status" aria-live="polite">
      <Icon name="check" />
      <span>{children}</span>
      {onDismiss && (
        <IconButton
          label="Dispensar notificação"
          icon="close"
          variant="ghost"
          onClick={onDismiss}
        />
      )}
    </div>
  );
}
export function EmptyState({
  title,
  description,
  icon = 'folder',
  action,
}: {
  title: string;
  description: string;
  icon?: IconName;
  action?: ReactNode;
}) {
  return (
    <section className="cv-empty">
      <span className="cv-empty-icon">
        <Icon name={icon} size={28} />
      </span>
      <Heading level={2}>{title}</Heading>
      <Text muted>{description}</Text>
      {action}
    </section>
  );
}
/** One responsive surface: centered on desktop, bottom-anchored on mobile. */
export function Dialog({
  title,
  description,
  trigger,
  children,
  footer,
  open,
  onOpenChange,
}: {
  title: string;
  description: string;
  trigger?: React.ReactElement;
  children: ReactNode;
  footer?: ReactNode;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
}) {
  const theme = useTheme();
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="cv-overlay" />
        <DialogPrimitive.Content className="cv-root cv-dialog" data-theme={theme}>
          <header>
            <div>
              <DialogPrimitive.Title className="cv-dialog-title">{title}</DialogPrimitive.Title>
              <DialogPrimitive.Description className="cv-muted">
                {description}
              </DialogPrimitive.Description>
            </div>
            <DialogPrimitive.Close asChild>
              <IconButton variant="ghost" label="Fechar painel" icon="close" />
            </DialogPrimitive.Close>
          </header>
          <div className="cv-dialog-body">{children}</div>
          {footer && <footer>{footer}</footer>}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
export const Sheet = Dialog;
export function Accordion({ items }: { items: { title: string; content: ReactNode }[] }) {
  return (
    <div className="cv-accordion">
      {items.map((i) => (
        <details key={i.title}>
          <summary>
            {i.title}
            <Icon name="down" size={16} />
          </summary>
          <div>{i.content}</div>
        </details>
      ))}
    </div>
  );
}

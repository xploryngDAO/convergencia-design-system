import React, {
  forwardRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { iconPaths, type IconName } from './icons/paths';
export type { IconName };
export const cx = (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(' ');
/** Native stroke icons from Convergência; decorative unless a title is supplied. */
export function Icon({
  name = 'spark',
  size = 20,
  title,
  ...props
}: { name?: IconName; size?: number; title?: string } & React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={cx('cv-icon', props.className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      aria-label={title}
    >
      {title && <title>{title}</title>}
      <g dangerouslySetInnerHTML={{ __html: iconPaths[name] }} />
    </svg>
  );
}
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: IconName;
};
/** One action. loading prevents repeated submissions and retains its accessible name. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'secondary',
    size = 'md',
    loading,
    icon,
    children,
    className,
    disabled,
    type = 'button',
    ...props
  },
  ref,
) {
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx('cv-button', `cv-button--${variant}`, `cv-button--${size}`, className)}
    >
      {loading ? <Spinner /> : icon && <Icon name={icon} size={17} />}
      <span>{children}</span>
    </button>
  );
});
export const IconButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'children'> & { label: string; icon: IconName }
>(function IconButton({ label, icon, className, ...props }, ref) {
  return (
    <Button
      {...props}
      ref={ref}
      className={cx('cv-icon-button', className)}
      aria-label={label}
      title={label}
      icon={icon}
    />
  );
});
export type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'rose';
export function Badge({
  tone = 'neutral',
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span {...props} className={cx('cv-badge', `cv-tone--${tone}`, props.className)}>
      {children}
    </span>
  );
}
export function Status({ tone = 'success', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={cx('cv-status', `cv-tone--${tone}`)}>
      <span className="cv-status-dot" aria-hidden="true" />
      {children}
    </span>
  );
}
/** Initials are the redistributable fallback. Product-owned MiniAv imagery is supplied by the consumer. */
export function Avatar({
  name,
  src,
  size = 'md',
}: {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={cx('cv-avatar', `cv-avatar--${size}`)} role="img" aria-label={name}>
      {src && !failed ? (
        <img src={src} alt="" onError={() => setFailed(true)} />
      ) : (
        name
          .trim()
          .split(/\s+/)
          .map((s) => s[0])
          .slice(0, 2)
          .join('')
      )}
    </span>
  );
}
export function AvatarGroup({ names }: { names: string[] }) {
  return (
    <div className="cv-avatar-group" aria-label="Participantes">
      {names.map((n) => (
        <Avatar key={n} name={n} size="sm" />
      ))}
    </div>
  );
}
export function Spinner({ label }: { label?: string }) {
  return (
    <span
      className="cv-spinner"
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
export function Skeleton({
  width = '100%',
  height = 16,
}: {
  width?: string | number;
  height?: number;
}) {
  return <span aria-hidden="true" className="cv-skeleton" style={{ width, height }} />;
}
export function Divider() {
  return <hr className="cv-divider" />;
}
export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="cv-kbd">{children}</kbd>;
}
export function Text({
  as: Tag = 'p',
  muted = false,
  children,
  ...props
}: HTMLAttributes<HTMLElement> & { as?: 'p' | 'span' | 'div'; muted?: boolean }) {
  return (
    <Tag {...props} className={cx('cv-text', muted && 'cv-muted', props.className)}>
      {children}
    </Tag>
  );
}
export function Heading({
  level = 2,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { level?: 1 | 2 | 3 | 4 }) {
  const Tag = `h${level}` as 'h1';
  return (
    <Tag {...props} className={cx('cv-heading', `cv-heading--${level}`, props.className)}>
      {children}
    </Tag>
  );
}
export function Link({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...props} className={cx('cv-link', props.className)}>
      {children}
    </a>
  );
}
export function Progress({ value, label }: { value: number; label: string }) {
  return (
    <div className="cv-progress">
      <div>
        <span>{label}</span>
        <strong>{Math.round(Math.max(0, Math.min(100, value)))}%</strong>
      </div>
      <progress max={100} value={Math.max(0, Math.min(100, value))} aria-label={label} />
    </div>
  );
}
export function Chip({
  children,
  onRemove,
  removeLabel,
}: {
  children: ReactNode;
  onRemove?: () => void;
  removeLabel?: string;
}) {
  return (
    <span className="cv-chip">
      {children}
      {onRemove && (
        <IconButton
          variant="ghost"
          icon="close"
          label={removeLabel || `Remover ${typeof children === 'string' ? children : 'filtro'}`}
          onClick={onRemove}
        />
      )}
    </span>
  );
}

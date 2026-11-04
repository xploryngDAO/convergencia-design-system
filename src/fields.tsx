import React, { useId, type ReactNode } from 'react';
import { cx, Icon } from './atoms';
type FieldMeta = { label: string; hint?: string; error?: string };
function FieldFrame({
  id,
  label,
  hint,
  error,
  children,
}: { id: string; children: ReactNode } & FieldMeta) {
  return (
    <div className="cv-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && (
        <span className="cv-field-hint" id={`${id}-hint`}>
          {hint}
        </span>
      )}
      {error && (
        <span className="cv-field-error" id={`${id}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
function description(id: string, hint?: string, error?: string, other?: string) {
  return (
    [other, hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  );
}
export function TextField({
  label,
  hint,
  error,
  id: provided,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & FieldMeta) {
  const auto = useId(),
    id = provided || auto;
  return (
    <FieldFrame {...{ id, label, hint, error }}>
      <input
        {...props}
        id={id}
        className={cx('cv-input', props.className)}
        aria-invalid={!!error || undefined}
        aria-describedby={description(id, hint, error, props['aria-describedby'])}
      />
    </FieldFrame>
  );
}
export function TextArea({
  label,
  hint,
  error,
  id: provided,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & FieldMeta) {
  const auto = useId(),
    id = provided || auto;
  return (
    <FieldFrame {...{ id, label, hint, error }}>
      <textarea
        rows={4}
        {...props}
        id={id}
        className={cx('cv-input', 'cv-textarea', props.className)}
        aria-invalid={!!error || undefined}
        aria-describedby={description(id, hint, error, props['aria-describedby'])}
      />
    </FieldFrame>
  );
}
export function Select({
  label,
  hint,
  error,
  options,
  id: provided,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> &
  FieldMeta & { options: { value: string; label: string; disabled?: boolean }[] }) {
  const auto = useId(),
    id = provided || auto;
  return (
    <FieldFrame {...{ id, label, hint, error }}>
      <select
        {...props}
        id={id}
        className={cx('cv-input', props.className)}
        aria-invalid={!!error || undefined}
        aria-describedby={description(id, hint, error, props['aria-describedby'])}
      >
        {options.map((o) => (
          <option key={o.value} {...o}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldFrame>
  );
}
export function Checkbox({
  label,
  hint,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & { label: string; hint?: string }) {
  const id = useId();
  return (
    <label className="cv-check">
      <input {...props} type="checkbox" aria-describedby={hint ? id : undefined} />
      <span>
        {label}
        {hint && <small id={id}>{hint}</small>}
      </span>
    </label>
  );
}
export function Switch({
  label,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & { label: string }) {
  return (
    <label className="cv-switch">
      <input {...props} type="checkbox" role="switch" />
      <span aria-hidden="true" className="cv-switch-track" />
      <span>{label}</span>
    </label>
  );
}
export function RadioGroup({
  label,
  name,
  options,
  value,
  onValueChange,
  disabled,
}: {
  label: string;
  name?: string;
  options: { value: string; label: string }[];
  value: string;
  onValueChange: (v: string) => void;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <fieldset className="cv-radio-group" disabled={disabled}>
      <legend>{label}</legend>
      {options.map((o) => (
        <label key={o.value} className="cv-check">
          <input
            type="radio"
            name={name || id}
            value={o.value}
            checked={o.value === value}
            onChange={() => onValueChange(o.value)}
          />
          {o.label}
        </label>
      ))}
    </fieldset>
  );
}
export function Range({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}) {
  const id = useId();
  return (
    <div className="cv-field">
      <label htmlFor={id}>
        {label} <output htmlFor={id}>{value}</output>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
export function SearchField({
  label = 'Buscar',
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & { label?: string }) {
  return (
    <div className="cv-search">
      <Icon name="search" size={18} />
      <TextField {...props} label={label} type="search" />
    </div>
  );
}
export function FileUpload({
  label,
  accept,
  multiple,
  onFiles,
}: {
  label: string;
  accept?: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
}) {
  return (
    <label className="cv-upload">
      <Icon name="file" />
      <strong>{label}</strong>
      <span className="cv-muted">Selecione um arquivo do dispositivo</span>
      <input
        type="file"
        aria-label={label}
        accept={accept}
        multiple={multiple}
        onChange={(e) => onFiles(Array.from(e.target.files || []))}
      />
    </label>
  );
}

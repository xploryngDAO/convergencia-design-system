import { useEffect, useState } from 'react';
import {
  AuthScreen,
  Badge,
  Button,
  Divider,
  MetaRow,
  type AuthMode,
  type AuthValues,
} from '../../../src/index';

interface SessionUser {
  id: string;
  email: string;
  name?: string;
  roles?: string[];
}

interface SessionState {
  user: SessionUser;
  tenant?: { id: string; name?: string; status?: string };
  session?: { id: string; expiresAt: number };
}

async function request(path: string, init?: RequestInit) {
  const response = await fetch(path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    ...init,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = body?.error?.message ?? 'Falha de autenticação';
    throw new Error(message);
  }
  return body;
}

export function App() {
  const [session, setSession] = useState<SessionState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [mode, setMode] = useState<AuthMode>('login');

  useEffect(() => {
    request('/auth/me')
      .then((data) => setSession(data as SessionState))
      .catch(() => setSession(null));
  }, []);

  async function handleSubmit(values: AuthValues, current: AuthMode) {
    setLoading(true);
    setError('');
    setNotice('');
    try {
      if (current === 'recover') {
        await request('/auth/forgot-password', {
          method: 'POST',
          body: JSON.stringify({ email: values.email }),
        });
        setNotice('Se o e-mail existir, enviamos um link de recuperação.');
        return;
      }
      if (current === 'register') {
        await request('/auth/signup', {
          method: 'POST',
          body: JSON.stringify(values),
        });
        setNotice('Conta criada. Entrando…');
      }
      const result = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: values.email, password: values.password }),
      });
      const me = await request('/auth/me');
      setSession((me as SessionState) ?? (result as SessionState));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Falha de autenticação');
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await request('/auth/logout', { method: 'POST' });
      setSession(null);
      setNotice('Sessão encerrada.');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Falha ao sair');
    } finally {
      setLoading(false);
    }
  }

  if (session) {
    return (
      <div className="auth-session">
        <div className="auth-session-card">
          <Badge tone="success">sessão ativa</Badge>
          <h1>Bem-vindo, {session.user.name ?? session.user.email}</h1>
          <p>Esta tela está autenticada pelo módulo convergencia-auth, com cookie HttpOnly e política de tenant.</p>
          <Divider />
          <MetaRow label="E-mail" value={session.user.email} />
          <MetaRow label="Tenant" value={session.tenant?.name ?? session.tenant?.id ?? '—'} />
          <MetaRow label="Sessão" value={session.session?.id ?? '—'} />
          <MetaRow label="Papéis" value={(session.user.roles ?? []).join(', ') || '—'} />
          <Divider />
          <div className="auth-session-actions">
            <Button variant="secondary" onClick={() => request('/auth/me').then((data) => setSession(data as SessionState))}>
              Recarregar sessão
            </Button>
            <Button variant="ghost" onClick={logout} disabled={loading}>Sair</Button>
          </div>
          {notice && <p className="auth-note">{notice}</p>}
          {error && <p className="auth-error">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <AuthScreen
      mode={mode}
      onModeChange={setMode}
      loading={loading}
      error={error}
      notice={notice}
      demo="demo: admin@demo.local / Change-me-123!"
      onSubmit={handleSubmit}
    />
  );
}

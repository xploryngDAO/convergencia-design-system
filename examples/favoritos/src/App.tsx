import { useState } from 'react';
import {
  AgentDock,
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Icon,
  Kbd,
  LauncherMenu,
  MetaRow,
  Progress,
  RailNav,
  ScoreBadge,
  TrustBadge,
} from '../../../src/index';

type Item = {
  id: string;
  title: string;
  description: string;
  tag: string;
  kind: string;
  score: number;
  source: string;
  savedAt: string;
};

const items: Item[] = [
  { id: 'f1', title: 'Designing Data-Intensive Applications', description: 'Notas de leitura sobre consistência, replicação e sistemas distribuídos.', tag: 'livro', kind: 'leitura', score: 96, source: 'favoritos.ai/livros', savedAt: 'há 2 dias' },
  { id: 'f2', title: 'Convergência Design System', description: 'Tokens, componentes e blocos usados nos produtos do ecossistema.', tag: 'sistema', kind: 'referência', score: 93, source: 'convergencia.design', savedAt: 'há 5 dias' },
  { id: 'f3', title: 'Padrões de agentes autônomos', description: 'Comparativo de loops, ferramentas, memória e avaliação.', tag: 'pesquisa', kind: 'artigo', score: 88, source: 'arxiv.org', savedAt: 'há 1 semana' },
  { id: 'f4', title: 'Receitas de cozinha rápida', description: 'Coleção pessoal de pratos de 20 minutos para a semana.', tag: 'pessoal', kind: 'coleção', score: 74, source: 'caderno', savedAt: 'há 2 semanas' },
  { id: 'f5', title: 'SuperJarvis — arquitetura', description: 'Anotações sobre superfícies, agente central e continuidade.', tag: 'produto', kind: 'referência', score: 91, source: 'superjarvis.app', savedAt: 'há 3 semanas' },
  { id: 'f6', title: 'Rotina de estudo de idiomas', description: 'Plano de 30 minutos por dia com repetição espaçada.', tag: 'pessoal', kind: 'plano', score: 81, source: 'caderno', savedAt: 'há 1 mês' },
];

const filters = ['todos', 'favoritos', 'lidos'];

export function App() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('todos');
  const [selectedId, setSelectedId] = useState('f1');
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = items.filter((item) => {
    const term = query.trim().toLowerCase();
    const matches = `${item.title} ${item.description} ${item.tag}`.toLowerCase().includes(term);
    return matches && (filter === 'todos' || filter === 'favoritos' || filter === 'lidos');
  });
  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  return (
    <div className="fav-shell">
      <aside className="fav-rail">
        <RailNav
          brand={<span className="fav-mark"><Icon name="book" size={20} /></span>}
          activeId="biblioteca"
          items={[
            { id: 'biblioteca', label: 'Biblioteca', icon: <Icon name="book" size={20} /> },
            { id: 'favoritos', label: 'Favoritos', icon: <Icon name="spark" size={20} /> },
            { id: 'lidos', label: 'Lidos', icon: <Icon name="check" size={20} /> },
            { id: 'tags', label: 'Tags', icon: <Icon name="list" size={20} /> },
            { id: 'pessoas', label: 'Pessoas', icon: <Icon name="users" size={20} /> },
            { id: 'ajustes', label: 'Ajustes', icon: <Icon name="sliders" size={20} /> },
          ]}
          footer={<Avatar name="Ana" size="sm" />}
        />
      </aside>
      <header className="fav-header">
        <div className="fav-brand">
          <span className="fav-mark"><Icon name="book" size={20} /></span>
          <div>
            <strong>FavoritosAI</strong>
            <small>biblioteca pessoal</small>
          </div>
        </div>
        <label className="fav-search">
          <Icon name="search" size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar na biblioteca…" />
        </label>
        <div className="fav-actions">
          <Button variant="secondary" size="sm" icon="list" onClick={() => setMenuOpen(true)}>Menu</Button>
          <Button variant="secondary" size="sm" icon="plus">Nova pasta</Button>
          <Avatar name="Ana" size="sm" />
        </div>
      </header>

      <div className="fav-body">
        <aside className="fav-side">
          <Card>
            <span className="fav-kicker">visão</span>
            <div className="fav-filters">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={filter === item ? 'is-active' : ''}
                  onClick={() => setFilter(item)}
                >
                  {item}
                  <span>{item === 'todos' ? items.length : item === 'favoritos' ? 3 : 2}</span>
                </button>
              ))}
            </div>
            <Divider />
            <span className="fav-kicker">tags</span>
            <div className="fav-tags">
              {['livro', 'sistema', 'pesquisa', 'pessoal', 'produto'].map((tag) => (
                <Badge key={tag} tone="neutral">{tag}</Badge>
              ))}
            </div>
            <Divider />
            <div className="fav-stat">
              <span>itens salvos</span>
              <strong>128</strong>
            </div>
            <div className="fav-stat">
              <span>lidos este mês</span>
              <strong>14</strong>
            </div>
          </Card>
        </aside>

        <main className="fav-main">
          <div className="fav-title">
            <div>
              <span className="fav-kicker">arquivo pessoal</span>
              <h1>Biblioteca</h1>
              <p>O que você salvou, leu e quer lembrar depois.</p>
            </div>
            <Badge tone="accent">128 itens</Badge>
          </div>

          <div className="fav-grid">
            {filtered.map((item) => (
              <Card key={item.id}>
                <button type="button" className="fav-item" onClick={() => setSelectedId(item.id)}>
                  <span className={`fav-cover fav-cover--${item.tag}`} aria-hidden="true" />
                  <span className="fav-item-copy">
                    <span className="fav-item-top">
                      <Badge tone="neutral">{item.tag}</Badge>
                      <span>{item.savedAt}</span>
                    </span>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                    <span className="fav-item-foot">
                      <span>{item.kind}</span>
                      <span>{item.source}</span>
                    </span>
                  </span>
                </button>
              </Card>
            ))}
          </div>
          <section className="fav-kit">
            <div className="fav-title">
              <div>
                <span className="fav-kicker">design system</span>
                <h2>Estados e componentes</h2>
                <p>Os mesmos átomos, campos, navegação e feedback usados em qualquer produto da Convergência.</p>
              </div>
              <Badge tone="accent">19 blocos · 60 componentes</Badge>
            </div>
            <div className="fav-kit-grid">
              <Card>
                <span className="fav-kicker">ações</span>
                <div className="fav-row">
                  <Button size="sm">Primária</Button>
                  <Button size="sm" variant="secondary">Secundária</Button>
                  <Button size="sm" variant="ghost">Ghost</Button>
                  <Button size="sm" variant="danger">Perigo</Button>
                </div>
              </Card>
              <Card>
                <span className="fav-kicker">tons e progresso</span>
                <div className="fav-row">
                  <Badge tone="success">ok</Badge>
                  <Badge tone="warning">atenção</Badge>
                  <Badge tone="danger">erro</Badge>
                  <Badge tone="accent">info</Badge>
                  <Badge tone="neutral">neutro</Badge>
                </div>
                <Progress value={64} />
              </Card>
              <Card>
                <span className="fav-kicker">pessoas e atalhos</span>
                <div className="fav-row">
                  <Avatar name="Ana" size="sm" />
                  <Avatar name="Lia" size="sm" />
                  <Avatar name="Atlas" size="sm" />
                  <Kbd>⌘</Kbd><Kbd>K</Kbd>
                </div>
              </Card>
              <Card>
                <span className="fav-kicker">feedback</span>
                <Alert tone="success" title="Sincronizado">128 itens salvos nesta biblioteca.</Alert>
              </Card>
            </div>
          </section>
        </main>


        <aside className="fav-detail">
          <Card>
            <span className="fav-kicker">detalhe</span>
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>
            <Divider />
            <MetaRow label="Tipo" value={selected.kind} />
            <MetaRow label="Fonte" value={selected.source} />
            <MetaRow label="Salvo" value={selected.savedAt} />
            <Divider />
            <div className="fav-detail-actions">
              <ScoreBadge score={selected.score} label="relevância" />
              <TrustBadge status="verified" detail="fonte verificada" />
            </div>
            <div className="fav-detail-buttons">
              <Button size="sm">Abrir item</Button>
              <Button size="sm" variant="ghost" icon="book">Marcar lido</Button>
            </div>
          </Card>
        </aside>
      </div>
      <div className="fav-dock">
        <AgentDock
          items={[
            { id: 'inicio', label: 'Início', icon: <Icon name="home" size={20} /> },
            { id: 'biblioteca', label: 'Biblioteca', icon: <Icon name="book" size={20} /> },
            { id: 'favoritos', label: 'Favoritos', icon: <Icon name="spark" size={20} /> },
            { id: 'lidos', label: 'Lidos', icon: <Icon name="check" size={20} /> },
          ]}
          activeId="biblioteca"
          onSelect={() => {}}
          onAgent={() => setMenuOpen(true)}
          agentLabel="Agente"
        />
      </div>

      {menuOpen && (
        <div className="fav-menu-overlay" role="presentation" onClick={() => setMenuOpen(false)}>
          <div className="fav-menu-panel" onClick={(event) => event.stopPropagation()}>
            <LauncherMenu
              title="Ir para"
              fluid
              shortcuts={[
                { id: 'biblioteca', label: 'Biblioteca', icon: <Icon name="book" size={18} /> },
                { id: 'favoritos', label: 'Favoritos', icon: <Icon name="spark" size={18} /> },
                { id: 'lidos', label: 'Lidos', icon: <Icon name="check" size={18} /> },
                { id: 'tags', label: 'Tags', icon: <Icon name="list" size={18} /> },
              ]}
              sections={[{ title: 'Biblioteca', items: [{ id: 'add', label: 'Adicionar item', hint: 'link, livro ou nota', icon: <Icon name="plus" size={18} /> }] }]}
              onSelect={() => setMenuOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AppShell,
  AgentRoster,
  Composer,
  Card,
  Grid,
  PageHeader,
  Button,
  Text,
  Heading,
  ProjectCard,
  Message,
  ApprovalCard,
  ArtifactCard,
  WorkspaceSwitcher,
  Status,
  Tabs,
  SearchField,
  DataTable,
  Badge,
  Dialog,
  TextField,
  Toast,
  CanvasNode,
  Icon,
  CalendarEvent,
  EmptyState,
  Alert,
  StatCard,
  Timeline,
} from '../src';
const nav = [
  { id: 'home', label: 'Início', icon: 'home' as const },
  { id: 'projects', label: 'Projetos', icon: 'folder' as const, count: 3 },
  { id: 'chat', label: 'Conversas', icon: 'chat' as const },
  { id: 'brain', label: 'Brain', icon: 'brain' as const },
  { id: 'apps', label: 'Apps', icon: 'grid' as const },
];
function Shell({ children, initial = 'home' }: { children: React.ReactNode; initial?: string }) {
  const [active, setActive] = useState(initial),
    [workspace, setWorkspace] = useState('personal');
  return (
    <AppShell
      items={nav}
      active={active}
      onNavigate={setActive}
      workspace={
        <WorkspaceSwitcher
          value={workspace}
          onChange={setWorkspace}
          options={[
            { value: 'personal', label: 'Meu espaço' },
            { value: 'team', label: 'Equipe Aurora' },
          ]}
        />
      }
      header={<Status>Ambiente de exemplo</Status>}
      inspector={
        <>
          <Heading level={3}>Seu contexto</Heading>
          <Text muted>
            Uma decisão por vez. Estes exemplos usam dados demonstrativos e não executam serviços
            externos.
          </Text>
          <Timeline
            items={[
              {
                title: 'Design compartilhado',
                detail: 'Mesmos tokens em todos os produtos.',
                time: 'Agora',
              },
              {
                title: 'Próximo passo',
                detail: 'Escolha um componente e valide o fluxo.',
                time: 'Quando você quiser',
              },
            ]}
          />
        </>
      }
    >
      {children}
    </AppShell>
  );
}
function HomeExample() {
  const [agent, setAgent] = useState('Jarvis'),
    [sent, setSent] = useState('');
  return (
    <Shell>
      <div className="demo-home">
        <div className="demo-welcome">
          <Badge tone="accent">Seu universo de possibilidades</Badge>
          <h1>O que vamos construir hoje?</h1>
          <p>Uma ideia, uma conversa, um próximo passo.</p>
        </div>
        <AgentRoster
          agents={[
            { name: 'Jarvis', role: 'Seu parceiro' },
            { name: 'Lia', role: 'Pesquisa' },
            { name: 'Atlas', role: 'Estratégia' },
            { name: 'Íris', role: 'Criação' },
          ]}
          selected={agent}
          onSelect={setAgent}
        />
        <Composer agent={agent} onSend={setSent} />
        {sent && <Alert title="Mensagem recebida no exemplo">{sent}</Alert>}
        <div className="demo-grid-label">
          <Heading level={2}>Continue de onde parou</Heading>
          <Badge>3 projetos</Badge>
        </div>
        <Grid>
          <ProjectCard
            title="Projeto Aurora"
            description="Transformar uma ideia em uma experiência que faz sentido."
            members={['Jarvis', 'Lia']}
            progress={64}
            onOpen={() => setSent('Projeto Aurora selecionado')}
          />
          <ProjectCard
            title="Meu próximo capítulo"
            description="Um espaço para organizar planos, referências e decisões."
            members={['Atlas']}
            progress={28}
            onOpen={() => setSent('Próximo capítulo selecionado')}
          />
        </Grid>
      </div>
    </Shell>
  );
}
function ProjectsExample() {
  const [open, setOpen] = useState(false),
    [name, setName] = useState(''),
    [names, setNames] = useState(['Aurora', 'Novo horizonte']),
    [query, setQuery] = useState('');
  return (
    <Shell initial="projects">
      <PageHeader
        title="Projetos"
        description="Ideias com contexto, pessoas e continuidade."
        actions={
          <Button variant="primary" icon="plus" onClick={() => setOpen(true)}>
            Novo projeto
          </Button>
        }
      />
      <SearchField
        label="Buscar projetos"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div style={{ height: 20 }} />
      <Grid>
        {names
          .filter((n) => n.toLowerCase().includes(query.toLowerCase()))
          .map((n) => (
            <ProjectCard
              key={n}
              title={n}
              description="Pesquisa, criação e decisão no mesmo lugar."
              members={['Lia', 'Atlas']}
              progress={42}
              onOpen={() => {
                setName(n);
                setOpen(true);
              }}
            />
          ))}
      </Grid>
      <Dialog
        title="Projeto"
        description="Exemplo local. Os dados são mantidos apenas durante esta demonstração."
        open={open}
        onOpenChange={setOpen}
        footer={
          <Button
            variant="primary"
            disabled={!name.trim()}
            onClick={() => {
              if (!names.includes(name.trim())) setNames([...names, name.trim()]);
              setName('');
              setOpen(false);
            }}
          >
            Salvar projeto
          </Button>
        }
      >
        <TextField
          label="Nome do projeto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Dialog>
    </Shell>
  );
}
function ChatExample() {
  const [messages, setMessages] = useState<string[]>([]),
    [decision, setDecision] = useState('');
  return (
    <Shell initial="chat">
      <div className="demo-chat">
        <PageHeader
          title="Conversa com Jarvis"
          description="Contexto preservado, decisões nas suas mãos."
        />
        <Message author="Jarvis" time="09:41">
          Podemos organizar suas referências e preparar um plano para o próximo passo.
        </Message>
        {messages.map((m, i) => (
          <Message key={i} author="Você" human>
            {m}
          </Message>
        ))}
        <ApprovalCard
          title="Organizar o próximo passo"
          description="Prévia de uma proposta demonstrativa. Aprovar muda somente o estado deste exemplo."
          onApprove={() => setDecision('Proposta aprovada no exemplo')}
          onReject={() => setDecision('Proposta devolvida para revisão')}
        />
        {decision && <Toast>{decision}</Toast>}
        <div style={{ height: 20 }} />
        <Composer onSend={(m) => setMessages([...messages, m])} />
      </div>
    </Shell>
  );
}
function WorkspaceExample() {
  const [query, setQuery] = useState(''),
    [notice, setNotice] = useState('');
  return (
    <Shell initial="apps">
      <PageHeader
        title="Meus materiais"
        description="Arquivos, referências e notas com a mesma linguagem visual."
      />
      <Tabs
        label="Visualização dos materiais"
        items={[
          {
            value: 'files',
            label: 'Arquivos',
            content: (
              <>
                <SearchField
                  label="Buscar materiais"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div style={{ height: 16 }} />
                <DataTable
                  caption="Arquivos recentes"
                  columns={[
                    { key: 'name', label: 'Nome' },
                    { key: 'type', label: 'Tipo' },
                    { key: 'status', label: 'Estado' },
                  ]}
                  rows={['Plano Aurora', 'Referências visuais', 'Notas da reunião']
                    .filter((n) => n.toLowerCase().includes(query.toLowerCase()))
                    .map((n) => ({
                      name: (
                        <Button variant="ghost" onClick={() => setNotice(n)}>
                          {n}
                        </Button>
                      ),
                      type: 'Documento',
                      status: <Badge tone="success">Disponível</Badge>,
                    }))}
                />
              </>
            ),
          },
          {
            value: 'notes',
            label: 'Notas',
            content: (
              <ArtifactCard
                title="Ideias para continuar"
                description="Nota de exemplo · hoje"
                onOpen={() => setNotice('Nota selecionada')}
              />
            ),
          },
          {
            value: 'activity',
            label: 'Atividade',
            content: (
              <EmptyState
                title="Tudo em dia"
                description="As próximas atividades aparecerão aqui."
                icon="clock"
              />
            ),
          },
        ]}
      />
      {notice && <Toast onDismiss={() => setNotice('')}>{notice}</Toast>}
    </Shell>
  );
}
function CanvasExample() {
  const [selected, setSelected] = useState('Lia pesquisa');
  return (
    <Shell initial="projects">
      <PageHeader
        title="Canvas"
        description="Fluxos legíveis, etapas explícitas e decisão humana."
      />
      <div className="demo-flow">
        {['Nova referência', 'Lia pesquisa', 'Sua decisão', 'Íris cria'].map((title, i) => (
          <React.Fragment key={title}>
            {i > 0 && <Icon name="arrow" />}
            <CanvasNode
              title={title}
              description={i === 2 ? 'Aprovação antes de continuar' : 'Etapa demonstrativa'}
              kind={i === 2 ? 'Decisão' : 'Etapa'}
              selected={selected === title}
              onSelect={() => setSelected(title)}
            />
          </React.Fragment>
        ))}
      </div>
      <div style={{ height: 20 }} />
      <Alert title={`Selecionado: ${selected}`}>
        Este template demonstra a linguagem do Canvas; não é um motor de execução.
      </Alert>
    </Shell>
  );
}
function AgendaExample() {
  const [event, setEvent] = useState('');
  return (
    <Shell initial="apps">
      <PageHeader title="Agenda" description="Uma visão tranquila dos seus próximos encontros." />
      <div className="demo-agenda">
        <div>
          <header>Hora</header>
          <Text muted>09:00</Text>
          <Text muted>10:00</Text>
          <Text muted>11:00</Text>
        </div>
        {['Segunda', 'Terça', 'Quarta'].map((d, i) => (
          <div key={d}>
            <header>{d}</header>
            <CalendarEvent
              title={['Revisão Aurora', 'Pesquisa de contexto', 'Oficina de ideias'][i]}
              time="09:00 — 10:00"
              tone={i === 1 ? 'success' : 'accent'}
              onOpen={() => setEvent(d)}
            />
          </div>
        ))}
      </div>
      {event && <Alert title={`Evento de ${event}`}>Selecionado nesta demonstração.</Alert>}
    </Shell>
  );
}
export default { title: 'Templates/Jornadas', parameters: { layout: 'fullscreen' } } satisfies Meta;
export const Home: StoryObj = {
  name: 'Início · agentes e continuidade',
  render: () => <HomeExample />,
};
export const Projects: StoryObj = {
  name: 'Projetos · criação e busca',
  render: () => <ProjectsExample />,
};
export const Conversation: StoryObj = {
  name: 'Conversa · proposta e decisão',
  render: () => <ChatExample />,
};
export const Workspace: StoryObj = {
  name: 'Apps · arquivos e notas',
  render: () => <WorkspaceExample />,
};
export const Canvas: StoryObj = {
  name: 'Canvas · etapas e decisão',
  render: () => <CanvasExample />,
};
export const Agenda: StoryObj = { name: 'Agenda · eventos', render: () => <AgendaExample /> };
export const Offline: StoryObj = {
  name: 'Offline · continuidade',
  render: () => (
    <Shell>
      <PageHeader title="Seu espaço" />
      <div className="demo-offline">
        <Alert title="Você está offline" tone="warning">
          Seus materiais já salvos continuam acessíveis. A sincronização depende da integração do
          produto.
        </Alert>
      </div>
      <Grid>
        <StatCard label="Materiais disponíveis" value="12" detail="Dados ilustrativos" />
        <StatCard label="Alterações locais" value="3" detail="Aguardando conexão" />
      </Grid>
    </Shell>
  ),
};

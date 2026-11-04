import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchField, Card, Stack, Badge, Heading, Text, Button, Alert } from '../src';
type Rule = {
  file: string;
  selector: string;
  line: number;
  contexts: string[];
  declarations: { property: string; value: string; important: boolean }[];
};
function Inventory() {
  const [data, setData] = useState<{ files: unknown[]; selectors: Rule[]; media: string[] } | null>(
      null,
    ),
    [query, setQuery] = useState('.button'),
    [count, setCount] = useState(20),
    [error, setError] = useState('');
  useEffect(() => {
    fetch('./reference/source-inventory.json')
      .then((r) => {
        if (!r.ok) throw new Error('Falha ao carregar inventário');
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);
  if (error)
    return (
      <Alert title="Inventário indisponível" tone="danger">
        {error}
      </Alert>
    );
  if (!data) return <Text>Carregando inventário…</Text>;
  const rules = data.selectors.filter((r) =>
    `${r.file} ${r.selector} ${JSON.stringify(r.declarations)}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <Stack>
      <Heading level={1}>Da interface ao sistema</Heading>
      <Text muted>
        Inventário integral dos estilos carregados pela Convergência em 04/11/2026. Fonte local com
        alterações posteriores ao HEAD publicado. Esta é a evidência de origem; as APIs portáveis
        estão nas seções de componentes.
      </Text>
      <Stack direction="row">
        <Badge>{data.files.length} arquivos CSS</Badge>
        <Badge>{data.selectors.length} regras</Badge>
        <Badge>{data.media.length} condições responsivas</Badge>
      </Stack>
      <SearchField
        label="Buscar seletor, propriedade ou valor"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setCount(20);
        }}
      />
      <Text>{rules.length} resultados</Text>
      {rules.slice(0, count).map((r, i) => (
        <Card key={i}>
          <Text muted>
            {r.file}:{r.line}
          </Text>
          <code style={{ overflowWrap: 'anywhere' }}>{r.selector}</code>
          {r.contexts.map((c, j) => (
            <Text key={j} muted>
              {c}
            </Text>
          ))}
          <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', fontSize: 12 }}>
            {r.declarations
              .map((d) => `${d.property}: ${d.value}${d.important ? ' !important' : ''};`)
              .join('\n')}
          </pre>
        </Card>
      ))}
      {rules.length > count && (
        <Button onClick={() => setCount(count + 20)}>Carregar mais regras</Button>
      )}
    </Stack>
  );
}
export default {
  title: 'Referência/Inventário da Convergência',
  parameters: {
    docs: {
      description: {
        component:
          'Rastreabilidade completa da extração. Um seletor inventariado não é uma promessa de API React nem prova de migração dos produtos existentes.',
      },
    },
  },
} satisfies Meta;
export const Source: StoryObj = { name: 'Buscar cada detalhe', render: () => <Inventory /> };

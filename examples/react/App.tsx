'use client';
import { useState } from 'react';
import {
  DesignSystemProvider,
  Card,
  Heading,
  TextField,
  Button,
  Toast,
  Stack,
} from '@xploryng/convergencia';
import '@xploryng/convergencia/styles.css';
export function App() {
  const [name, setName] = useState(''),
    [saved, setSaved] = useState(false);
  return (
    <DesignSystemProvider>
      <Card>
        <Heading level={1}>Meu próximo capítulo</Heading>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(true);
          }}
        >
          <Stack>
            <TextField
              label="Nome do projeto"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSaved(false);
              }}
            />
            <Button type="submit" variant="primary" disabled={!name.trim()}>
              Salvar exemplo
            </Button>
            {saved && <Toast>Exemplo local: {name}. Conecte seu domínio para persistir.</Toast>}
          </Stack>
        </form>
      </Card>
    </DesignSystemProvider>
  );
}

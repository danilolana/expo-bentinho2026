# Desafio BQ — Expô Bentinho 2026

Quiz responsivo em React + TypeScript com identidade visual do Colégio Técnico Bento Quirino. Cada rodada possui cinco perguntas e sempre inclui ao menos uma de informática. As 70 perguntas são usadas sem repetição antes de um novo ciclo.

## Executar

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Validação completa:

```bash
npm test
npm run build
```

## Estrutura

```text
public/assets/              logos, brasão, assinatura e mascote
src/
  data/questions.ts        banco e validação das 70 perguntas
  utils/quizEngine.ts      sorteio, reserva por categoria e persistência
  App.tsx                  estados e fluxo da experiência
  styles.css               identidade visual, animações e responsividade
  *.test.ts(x)             testes do banco, motor e interface
```

## Regras implementadas

- Banco validado em tempo de execução: 70 itens, IDs únicos, quatro alternativas e índice de resposta válido.
- Distribuição fixa: 25 perguntas de informática e 45 de conhecimentos gerais.
- Cinco perguntas por rodada, com ao menos uma de informática.
- Sorteio aleatório sem repetição durante um ciclo de 14 rodadas.
- Reserva dinâmica de perguntas de informática: o sorteio atual não pode consumir as perguntas necessárias às rodadas futuras.
- Histórico persistido em `localStorage` com a chave `desafio-bq:used-question-ids:v1`; dados inválidos são descartados com segurança.
- Se o armazenamento estiver bloqueado, o quiz continua funcionando durante a sessão.

## Editar ou integrar perguntas

Cada item em `src/data/questions.ts` segue o contrato `Question`:

```ts
{
  id: 'tech-26',
  category: 'informatica',
  prompt: 'Texto da pergunta',
  options: ['A', 'B', 'C', 'D'],
  correctAnswer: 0,
  hint: 'Uma pista curta.',
}
```

Ao alterar a quantidade total ou a proporção, atualize também `validateQuestionBank`. Para consumir uma API real no futuro, transforme os dados recebidos nesse contrato, valide antes de chamar `createQuizRound` e mostre uma mensagem de erro quando a carga falhar. Nenhuma API externa é necessária na versão atual.

## Animações e acessibilidade

O feedback de resposta dura 650 ms e usa apenas transformações, cor e opacidade. `prefers-reduced-motion` reduz todas as animações. Alternativas usam botões nativos, foco visível e mensagens de resultado com `aria-live`/`role="status"`. O layout da dica passa de coluna lateral para faixa superior em telas menores que 760 px.

As cores e durações ficam em `src/styles.css`; altere primeiro os tokens em `:root`. Os assets mantêm os arquivos oficiais fornecidos e são servidos diretamente por Vite.

## Limitações e premissas

- O histórico é local ao navegador e ao dispositivo; limpar os dados do site reinicia o ciclo.
- Não há autenticação, placar remoto ou backend, pois não foram definidos no escopo.
- O mascote fornecido é JPEG com fundo branco; o enquadramento é feito por CSS para preservar o arquivo original.

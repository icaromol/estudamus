# Arquitetura

## Visão geral

Sem backend próprio. O Supabase é o backend completo:

- **Auth** — e-mail/senha e Google OAuth
- **PostgreSQL** — toda a lógica de servidor fica em triggers e functions do próprio Postgres (ex.: `completion_pct` de peças recalculado por trigger em `INSERT`/`DELETE` de `checklist_completions`)
- **Row Level Security em todas as tabelas**, gated por funções auxiliares: `fn_my_teacher_id()`, `fn_my_student_id()`, `fn_is_my_student()`
- **Storage** — assets de usuário

O client acessa o Postgres diretamente via `@supabase/supabase-js` (`src/lib/supabase.ts`), sem camada de API intermediária.

## Frontend

React 19 + Vite + TypeScript, roteamento com React Router v7 (`src/router.tsx`, todas as páginas lazy-loaded). Duas áreas protegidas por `AuthGuard` (`src/components/auth/AuthGuard.tsx`): **professor** (`/professor/...`) e **aluno** (`/aluno/...`), mais rotas públicas (`/`, `/login`, `/cadastro`, `/auth/callback`, `/modo`).

Formulários controlados manualmente, sem lib de formulário — padrão: `onSubmit` com `e.preventDefault()`, estado `saving`/`error` explícitos (ver `CLAUDE.md` para o padrão completo de código).

## Algoritmo de planejamento (`src/lib/planGenerator.ts`, `src/lib/autoplan.ts`)

Gera o plano semanal do aluno distribuindo tarefas por dia:

1. **Score de prioridade** por item: `0.5 × difficulty + 0.5 × (1 − completion%) + urgency_bonus`
2. **Urgency bonus** por proximidade de prazo do programa vinculado: `<7d: +0.40`, `7–14d: +0.30`, `15–30d: +0.20`, `31–60d: +0.10`
3. **Modificadores**: itens opcionais `×0.30`, itens de revisão `×0.50`
4. **Frequência semanal**: `max(1, round(score × 3))`, limitada aos dias ativos do aluno
5. **Distribuição round-robin** entre os dias disponíveis, com capacidade mínima de 5min por tarefa
6. **Pool de manutenção** separado, ordenado por `lastMaintenanceOn ASC` (itens nunca mantidos entram primeiro), tempo proporcional à dificuldade

Salvamento é DELETE-then-INSERT completo em `plan_items` (substitui em vez de fazer diff/upsert).

## Gamificação (`src/lib/xpHelpers.ts`, `src/lib/teacherXpHelpers.ts`)

XP concedido por atributo musical (técnica, leitura, ritmo, musicalidade, performance, percepção, improvisação, teoria, história), mapeado a partir da categoria do exercício/peça. Eventos discretos de XP:

| Evento | XP |
|---|---|
| Sessão de pomodoro | 5 |
| Item de checklist | 15 |
| Peça concluída | 300 |
| Programa concluído | 1000 |
| Missão diária | 20 |
| Missão semanal (streak) | 75 |
| Missão semanal (itens) | 50 |
| Missão semanal (pomodoros) | 60 |

22 ranks em 6 regiões, de "Aprendiz IV" (0 XP) a "Mestre" (100.000 XP) — ver `RANKS` em `xpHelpers.ts` para a tabela completa. Uma aba "Jornada" com leaderboard existe tanto para aluno quanto para professor (com métricas próprias).

## Deploy e segurança (`vercel.json`)

SPA com rewrite `/(.*) → /index.html`. Headers de segurança: HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` bloqueando câmera/microfone/geolocalização.

CSP restritiva por domínio — origens de terceiros permitidas e por quê:

- `*.supabase.co`, `wss://*.supabase.co` — dados e realtime
- `accounts.google.com` — Google OAuth
- `googletagmanager.com`, `google-analytics.com`, `analytics.google.com` — Google Analytics
- `*.clarity.ms` — Microsoft Clarity (analytics comportamental)
- `*.ingest.sentry.io`, `*.ingest.de.sentry.io` — erros

## Observabilidade

- **Sentry** (`src/instrument.ts`) — captura de erros + tracing de rotas (React Router v7 integration), `tracesSampleRate` 20% em produção / 100% em dev, `sendDefaultPii: false`
- **Microsoft Clarity** (`src/main.tsx`) — gravação de sessão
- Sourcemap upload no build via `@sentry/vite-plugin` (`vite.config.ts`), usando `SENTRY_ORG`/`SENTRY_PROJECT`/`SENTRY_AUTH_TOKEN` (apenas CI, não expostos ao client)

## Variáveis de ambiente

Ver [`.env.example`](../.env.example) na raiz do repositório.

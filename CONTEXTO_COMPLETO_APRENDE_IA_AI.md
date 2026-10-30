# HANDOFF COMPLETO — APRENDE IA AÍ
Data do contexto: 29/10/2026. Objetivo: permitir que outra IA local continue o desenvolvimento sem perder decisões e estado técnico.

## 1. Visão do produto
Nome: **Aprende IA aí**. Escola online de IA aplicada ao marketing, destinada inicialmente a iniciantes, com progressão introdutória, intermediária e avançada. Temas: fundamentos, prompting, copy, imagem, vídeo, marketing de conteúdo, estratégia, anúncios, automação, mensuração. Aprendizado prático, quizzes, XP, conquistas e certificados.

**Decisão mais recente e definitiva:** cadastro **gratuito e aberto**. Qualquer pessoa pode se cadastrar com nome, e-mail e senha, confirmar e-mail e estudar sem pagamento nem aprovação manual. A sequência pedagógica dos níveis continua. Visual **preto, vermelho e rosa escuro**, substituindo a paleta antiga preto/rosa/verde. Fontes originais: Bricolage Grotesque, Figtree, JetBrains Mono. Layout desktop com sidebar, mobile com barra inferior.

## 2. Currículo e experiência (base v1 preservada)
- Nível 01 — Introdutório, 8h: Fundamentos de IA; Prompt essencial (PCTFR = Papel, Contexto, Tarefa, Formato, Restrições); Primeira copy; Primeira imagem.
- Nível 02 — Intermediário, 12h: Copywriting com IA; Visual de campanha; Vídeo com IA; Conteúdo e estratégia (persona, calendário, SEO/GEO).
- Nível 03 — Avançado, 14h: Ads com IA; Automação e agentes; Dados e mensuração; Projeto final.
- Total: **12 módulos, 30 aulas, 34 horas**.
- Cada aula tem conteúdo, prompt para copiar ('Na prática') e quiz obrigatório para conclusão.
- XP: +50 por aula, +25 por acerto de primeira no quiz, +100 por módulo; conquistas Primeira Aula, Em Chamas (3 dias seguidos), Cientista de Prompts, Na Mosca (10 acertos de primeira). Patentes Curioso 0, Aprendiz 500, Criador 1300, Estrategista 2200, Mestre IA 3200.
- Certificados: um por nível e um final; nome, horas, data, código (código atual é gerado no cliente, NÃO verificável).
- Telas: Início, Trilha, Aula, Laboratório (6 modelos: anúncio, legenda, imagem, reels, persona, métricas), Recursos (HubSpot, Google, Canva, Adobe Firefly, Runway, Skillshop; plano de 4 semanas), Conquistas e certificados. Modo instrutor para revisão e opção zerar progresso.

## 3. Histórico das decisões e entregas
1. Usuário anexou `briefing-aprende-ia-ai.md` e protótipo `aprende-ia-ai.html` (HTML/CSS/JS puro, inicialmente sem backend).
2. Solicitou continuar protótipo, trocando cores para preto, vermelho e rosa escuro. Foi criada `aprende-ia-ai-v2.html`; também se propôs impressão/salvar certificado como PDF via navegador.
3. Usuário pediu funcionalidades reais: publicação, banco de dados, cadastro e acesso de alunos. Arquitetura escolhida: **Vercel** para hospedagem estática, **Supabase** para Auth/Postgres/RLS, **GitHub** para repositório/deploy.
4. Criaram-se pacotes intermediários `aprende-ia-plataforma-inicial.zip`, `aprende-ia-plataforma-gratuita-v3.zip` e `aprende-ia-configurada.zip`.
5. Usuário decidiu **cadastro gratuito e acesso livre aos cursos**.
6. Usuário criou conta e projeto Supabase com nome 'aprende ia ai'.
7. Primeiro SQL executado com sucesso pelo usuário criou `public.profiles` (id, full_name, created_at) e `public.lesson_progress` (user_id, lesson_id, completed_at), com RLS individual. Essas tabelas NÃO são o esquema usado pelo frontend V3.
8. Foi fornecido SQL complementar para criar `public.student_progress` com campos de XP e progresso. **O usuário ainda NÃO confirmou que executou esse SQL complementar.** Não assumir que a tabela existe.
9. Usuário identificou chaves `sb_publishable_...` e `sb_secret_...`. Foi orientado a revogar/rotacionar a **secret**, que foi compartilhada na conversa. **Não reproduzir nem usar a secret em arquivos, mensagens, frontend ou Git.** Chave publishable pode ser usada no frontend.
10. Usuário informou endpoint `https://zvbomqgtohkirtjusrjl.supabase.co/rest/v1/`; URL base correta para SDK: `https://zvbomqgtohkirtjusrjl.supabase.co`.
11. Pacote `aprende-ia-configurada.zip` contém código com URL e publishable key configuradas, mas **não foi publicado nem testado contra o Supabase real**. Usuário ainda não forneceu URL Vercel.
12. Pedido atual: transferir contexto completo e código para uma IA local.

## 4. Estado técnico exato do pacote configurado
Arquivos: `index.html` (site e currículo), `auth.js` (SDK Supabase via CDN esm.sh, signup, signin, reset, session, sincronização), `config.js` (URL e publishable key), `schema.sql`, `02-student-progress.sql` (ambos criam a mesma tabela; executar apenas um), `README.md`.
- `auth.js` usa `createClient` de `https://esm.sh/@supabase/supabase-js@2` e importa `config.js`.
- `auth.js` lê/grava **`public.student_progress`**, não `profiles` nem `lesson_progress`.
- Campos esperados: `user_id` uuid PK referenciando `auth.users`; `display_name` text; `progress` jsonb; `xp` int; `streak` int; `last_day` text; `lab_used` boolean; `badges` jsonb; `updated_at` timestamptz.
- `index.html` mantém estado `S={name,done,xp,streak,lastDay,labUsed,instructor,badges}` e delega salvamento a `window.persistStudent()`; quiz/XP são calculados no cliente.
- RLS da tabela limita select/insert/update ao `auth.uid() = user_id`. Isso isola usuários, mas **não valida** pontuação e conclusão; usuários podem alterar o próprio XP via API.
- Login e recuperação de senha precisam de testes reais, inclusive redirect, token de recuperação e atualização de senha.
- O modo instrutor e a função de zerar progresso precisam ser revisados antes de lançamento; não confiar no frontend para permissões administrativas.
- A dependência externa do CDN precisa de versionamento/build mais robusto para produção.

## 5. Configuração Supabase conhecida
- Projeto: 'aprende ia ai'.
- Project URL: `https://zvbomqgtohkirtjusrjl.supabase.co`.
- A chave pública publishable já está em `config.js` do pacote configurado. É uma chave de cliente, não uma credencial privilegiada.
- **Uma chave `sb_secret` foi exposta na conversa; solicitar ao proprietário sua rotação no painel do Supabase e não copiá-la.**
- SQL inicial `profiles` e `lesson_progress`: usuário confirmou sucesso.
- SQL `student_progress`: execução **não confirmada**.
- Auth Email Provider, Confirm email, Site URL e Redirect URLs: configuração **não confirmada**.
- GitHub/Vercel: publicação **não confirmada**.
- Nenhum usuário de teste ou teste ponta a ponta confirmado.

## 6. Próximas tarefas na ordem correta
1. Confirmar rotação da secret exposta. Não solicitar credenciais secretas.
2. Confirmar se `public.student_progress` existe; se não, executar **uma vez** `schema.sql` ou `02-student-progress.sql`. Como o script usa `CREATE TABLE IF NOT EXISTS` mas `CREATE POLICY` sem `IF NOT EXISTS`, NÃO executar ambos nem repetir integralmente: políticas duplicadas podem causar erro.
3. Conferir colunas, permissões e RLS; avaliar separar perfil, conclusões e eventos de XP no servidor para evitar fraude.
4. Habilitar Email provider, signups e confirmação de e-mail. Configurar SMTP para produção, antispam e rate limits.
5. Subir site no GitHub/Vercel, sem secrets. Configurar Site URL e Redirect URLs do Supabase para domínio publicado e domínios de preview estritamente autorizados.
6. Testar dois usuários distintos: signup, confirmação, login, logout, reset, primeira aula, quiz, progresso entre dispositivos e isolamento de dados.
7. Revisar recuperação de senha, condições de corrida em salvamento, tratamento de erros, acessibilidade, segurança e privacidade/LGPD.
8. Implementar validação server-side de quizzes/XP/certificados e códigos verificáveis antes de oferecer credenciais oficiais.
9. Adicionar política de privacidade, termos, backups, observabilidade e domínio próprio.
10. Evoluir UX e administração depois de a infraestrutura básica estar validada.

## 7. Instrução para a IA local
**Use o código existente como ponto de partida, não recrie o projeto do zero.** Inspecione `index.html`, `auth.js`, `config.js`, `schema.sql`, `02-student-progress.sql`, e faça auditoria de compatibilidade antes de alterações. Preserve conteúdo curricular, gamificação e paleta preto/vermelho/rosa escuro. Não declare que está online nem que testes passaram sem evidência. Não exponha a secret. Documente toda alteração, produza arquivos executáveis e roteiro de testes. Pergunte ao usuário apenas o que é necessário para continuar (primeiro: confirmação da tabela student_progress e situação da publicação).

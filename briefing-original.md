# Briefing de continuidade: Aprende IA aí

Cole este texto na nova conversa junto com o arquivo `aprende-ia-ai.html`.

## O projeto
App/escola online para ensinar IA aplicada ao marketing para iniciantes: prompt, copy, imagem, vídeo, marketing de conteúdo, estratégia e ads. Funciona como uma escola, com níveis introdutório, intermediário e avançado. Os alunos ganham recompensas ao avançar e certificado no final.

- **Nome:** Aprende IA aí
- **Cores:** preto, rosa e verde
- **Diretriz:** usar o máximo de informação possível e ir ajustando com o tempo
- **Base de conteúdo:** guia de cursos gratuitos de marketing com IA (HubSpot, Google, Canva, Adobe Firefly, Runway, Skillshop) com plano de 4 semanas

## Estado atual (protótipo v1)
Arquivo único `aprende-ia-ai.html`, HTML + CSS + JS puro, sem backend.

**Estrutura de conteúdo**
- Nível 01 Introdutório (8h): Fundamentos de IA, Prompt essencial (método PCTFR), Primeira copy, Primeira imagem
- Nível 02 Intermediário (12h): Copywriting com IA, Visual de campanha, Vídeo com IA, Conteúdo e estratégia (persona, calendário, SEO/GEO)
- Nível 03 Avançado (14h): Ads com IA (Meta, Google, análise de criativos), Automação e agentes, Dados e mensuração (UTM, relatórios), Projeto final
- Total: 12 módulos, 30 aulas, 34h

**Cada aula tem:** conteúdo, um prompt pronto para copiar ("Na prática") e um quiz obrigatório para concluir.

**Gamificação**
- 50 XP por aula, +25 XP se acertar o quiz de primeira
- Medalha por módulo (+100 XP)
- Conquistas especiais: Primeira Aula, Em Chamas (3 dias seguidos), Cientista de Prompts, Na Mosca (10 acertos de primeira)
- Patentes: Curioso (0), Aprendiz (500), Criador (1300), Estrategista (2200), Mestre IA (3200)
- Níveis desbloqueiam em sequência

**Certificados:** um por nível + certificado final de formação completa, com nome do aluno, carga horária, data e código.

**Telas:** Início, Trilha (com tela de aula), Laboratório de prompts (6 modelos: anúncio, legenda, imagem, reels, persona, métricas), Recursos (cursos do guia + plano de 4 semanas), Conquistas (medalhas, certificados, modo instrutor, zerar progresso).

**Visual:** tema escuro, fontes Bricolage Grotesque (títulos), Figtree (texto) e JetBrains Mono (prompts e rótulos). Sidebar no desktop, barra inferior no celular.

## Limitações conhecidas
- Progresso salvo só no navegador (localStorage), sem login
- Certificado não baixa em PDF
- Modo instrutor libera tudo para revisão

## Próximos passos sugeridos
1. Login de alunos e progresso salvo em banco (ex.: Supabase)
2. Certificado em PDF com código verificável
3. Revisão e expansão do conteúdo das aulas
4. Ajustes de visual e identidade

# Aprende IA aí — primeira versão conectada

## Instalação
1. Crie um projeto em https://supabase.com/dashboard.
2. No SQL Editor execute `schema.sql`.
3. Em Authentication > Providers, habilite Email. Mantenha a confirmação por e-mail ativa.
4. Em Project Settings > API, copie a Project URL e a chave **publishable** para `config.js`. **Nunca use secret/service_role no navegador.**
5. Configure Authentication > URL Configuration com o endereço público e redirects autorizados.
6. Publique a pasta na Vercel (https://vercel.com/drop), ou envie a um repositório Git e importe na Vercel. A página inicial deve ser `index.html`.
7. Teste cadastro, confirmação, login, aula concluída, logout e login em outro dispositivo.

## Limitações desta primeira integração
- Não está publicado nem conectado a uma conta Supabase até que você configure seus próprios serviços.
- O XP e os quizzes ainda são calculados no cliente: não são à prova de fraude. Antes de certificados oficiais, mover validação de conclusão para backend.
- Recuperação de senha permite definir nova senha via link enviado por e-mail; valide o fluxo completo em domínio publicado.
- Sem painel administrativo nem controle de matrículas/pagamentos. Atualmente qualquer pessoa pode se cadastrar.
- Dependência do CDN esm.sh para o SDK; para produção robusta, migrar para build com dependências fixadas.
- Revise LGPD, política de privacidade, backup, limites de e-mail e domínio próprio antes do lançamento público.

## Modelo de acesso: gratuito
- Cadastro aberto com confirmação por e-mail, sem pagamento ou aprovação manual.
- Todos os módulos fazem parte da formação; o desbloqueio pedagógico sequencial permanece.
- O Supabase guarda progresso individual com RLS.
- Configure SMTP próprio para entregabilidade de e-mails antes de convidar alunos em escala.

## Publicação e checklist de validação
1. Crie o projeto Supabase, rode schema.sql no SQL Editor.
2. Configure Email provider, confirmação de e-mail e URLs de redirecionamento.
3. Edite config.js com Project URL e publishable/anon key (jamais service_role).
4. Suba estes arquivos na raiz de um repositório GitHub e importe o repositório na Vercel como site estático.
5. Adicione o domínio publicado à Site URL e Redirect URLs no Supabase.
6. Teste com dois usuários: cadastro, confirmação, login, aula/quiz, logout, novo dispositivo, recuperação e isolamento de dados.
7. Antes de abertura pública, inclua termos e política de privacidade, revisão LGPD, proteção antispam, monitoramento e backups.

**Atenção:** progresso, XP e certificados ainda são calculados no navegador. Não devem ser tratados como credenciais acadêmicas verificadas até que as conclusões sejam validadas no servidor.

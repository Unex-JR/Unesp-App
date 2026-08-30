# App para Estudantes da Unesp

> Aplicativo de gerenciamento da vida acadêmica, desenvolvido pela Unex JR para centralizar rotina, horários e integrações acadêmicas dos estudantes da Unesp.

![React Native](https://img.shields.io/badge/React_Native-Expo-20232A?logo=react)
![SQLite](https://img.shields.io/badge/DB-SQLite%20%2B%20Drizzle-blue)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

---

## Sobre o projeto

O app nasceu para resolver um problema comum na rotina de estudantes: informações acadêmicas espalhadas entre Sisgrad, Google Classroom, Google Agenda e anotações pessoais. Nosso objetivo é unificar isso em um único lugar, simples e integrado ao ecossistema que o aluno já usa no dia a dia.

**Principais funcionalidades (atuais):**
- Login com Google (OAuth)
- Sincronização com Google Calendar
- Integração com Google Classroom
- Armazenamento local offline-first (SQLite + Drizzle ORM)

A arquitetura completa do projeto está documentada em [`/docs`](./docs).

---

## Para usuários

Obrigado por usar nosso app! Encontrou um bug ou tem uma sugestão de melhoria? Envie pela tela **"Fale Conosco"**, disponível na aba **Perfil**.

---

## Para colaboradores

### Pré-requisitos

- [Node.js](https://nodejs.org/) (LTS)
- [Git](https://git-scm.com/)
- Conta no [Expo](https://expo.dev/)
- Emulador Android/iOS configurado

### Configuração do ambiente

1. Faça um fork deste repositório e clone-o na sua máquina:
   ```bash
   git clone https://github.com/SEU-USUARIO/Unesp-App.git
   cd Unesp-App
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
   Preencha o `.env` com as credenciais necessárias (Google OAuth, etc). Peça as chaves de desenvolvimento a um membro do time responsável pela infraestrutura.

### Rodando o projeto

Escolha uma das opções abaixo para criar uma build de desenvolvimento:

**Opção A — Build local** (requer Android Studio / Xcode configurados):
```bash
npx expo run:android
# ou
npx expo run:ios
```

**Opção B — Build na nuvem via EAS** (recomendado para computadores com menos de 16GB de RAM):
```bash
npx eas-cli@latest build --profile development --platform android
npx eas-cli@latest build --profile development --platform ios
```
Escaneie o QR Code gerado no terminal com o celular para baixar e instalar a build.

Depois, inicie o servidor de desenvolvimento:
```bash
npx expo start
```
Com o app instalado, abra-o no celular e conecte-se ao servidor exibido no terminal.

### Fluxo de contribuição

1. Crie uma branch a partir da `main`, nomeando com seu nome/usuário do GitHub e a feature:
   ```bash
   git checkout -b seu-nome/nome-da-feature
   ```
2. Siga os padrões de código do projeto (ver [`/docs`](./docs)): código e comentários em inglês, comentários apenas para lógica não-trivial, estilos por componente (tailwind css), uso do tema centralizado.
3. Abra um Pull Request para a `main` descrevendo o que foi feito e, se possível, vinculando a issue correspondente.
4. Aguarde a revisão de pelo menos um outro colaborador antes do merge.

---

## Estrutura do projeto

```
/app            # Rotas e telas (Expo Router)
/components     # Componentes reutilizáveis
/repositories   # Camada de acesso a dados (funções CRUD usando ORM drizzle)
/services       # Regras de negócio (Orquestra um ou mais repositories para criar funções maiores, que serão usadas por componentes ou telas)
/db             # Schema e migrações (Drizzle)
/constants      # Temas, cores e constantes globais
```

---

## Time

Projeto mantido pela Unex JR
- Instagram: [@unex.jr](https://www.instagram.com/unex.jr/)

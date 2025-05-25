# Projeto Individual Módulo 2

Projeto Individual Integrado do Módulo 2 (Aplicação Web), para o **Inteli** (Instituto de Tecnologia e Liderança).

## Nome do Projeto

**TaskTrack**

## Autor do projeto

_Teodoro Borges de Carvalho Neira_

## Descrição

O sistema desenvolvido é uma **aplicação web**. O seu principal objetivo é **gerenciar tarefas**, contribuindo para a **organização** e **produtividade** do usuário. Isso é possível por meio da utilização de um **banco de dados**, armazenando as informações inseridas e permitindo a sua consulta. Além disso, o banco tabém permite a **filtração dos dados**, tornando a experiência mais personalizada.

## Requisitos

- Node.js (versão X.X.X)

## Instalação

1. **Clonar o repositório:**

```bash
   git clone https://github.com/TeodoroNeira/projetoIndividualModulo2
   cd caminho-do-repositório
```

2. **Instalar as dependências:**

```bash
npm install
```

3. **Configurar o arquivo `.env`:**

Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente conforme apresentado pelo banco de dados.

4. **Inicializar o banco de dados**

No terminal, digite o seguinte comando:

```bash
npm run init-db
```

Ele criará o banco de dados no seu servidor.

5. **Iniciar o servidor**

O servidor pode ser incializado com o comando:

```bash
npm run start
```

6. **Testar os endpoints**

Para informações de como testar os _endpoints_, acesse o arquivo WAD.md, na pasta /documents.

## Estrutura de Diretórios

- **`assets/`**: Arquivos públicos, como imagens e fontes.
- **`config/`**: Arquivos de configuração.
- **`controllers/`**: Lógica de controle das requisições.
- **`documents/`**: Documentação da aplicação.
- **`models/`**: Definição de modelos de dados (estrutura do banco).
- **`routes/`**: Definição das rotas do sistema.
- **`scripts/`**: Scripts JavaScript públicos utilizados na aplicação.
- **`services/`**: Serviços auxiliares do sistema.
- **`styles/`**: Arquivos de estilos CSS.
- **`tests/`**: Testes unitários.
- **`.gitignore`**: Arquivo para ignorar arquivos no Git.
- **`.env.example`**: Arquivo de exemplo para variáveis de ambiente.
- **`jest.config.js`**: Arquivo de configuração do Jest.
- **`package-lock.json`**: Gerenciador de dependências do Node.js.
- **`package.json`**: Gerenciador de dependências do Node.js.
- **`readme.md`**: Documentação introdutória do projeto.
- **`server.js`**: Arquivo principal que inicializa o servidor.
- **`rest.http`**: Arquivo para testes de endpoints.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

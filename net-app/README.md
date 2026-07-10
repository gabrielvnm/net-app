# NETAPP

Projeto que implementa uma aplicação web para ser executada no browser, que implementa gerenciamento de gastos e receitas de usuários, e faz o cálculo de saldos de acordo com os filtros aplicados. A aplicação foi construída utilizando React, Vite e Typescript no Frontend, C# .NET no Backend, em ambiente Fedora Linux 44 e testado em outro ambiente Linux Mint. Há uma conexão com banco de dados SQLite para persistência de dados entre as sessões.

## Funcionalidades

As principais funcionalidades da aplicação são:

 - Gerenciamento de Usuários: O sistema realiza o gerenciamento de uma lista de Usuários com os campos Nome e Data de Nascimento. A partir da data, é realizado o cálculo da idade.
 - CRUD Usuários: É implementado um CRUD completo que permite o cadastro, visualização, edição e exclusão de todos os usuários. 
 - Gerenciamento de Transações: Além do cadastro de Usuários, também é implementado o gerenciamento de Transações. A tabela de transações contém os campos Descrição, Valor, Tipo, Pessoa. O campo de pessoa obtém os valores através da tabela de usuários, garantindo que as transações estejam conectadas a um usuário.
 - CRUD Transações: O sistema permite apenas o cadastro de visualização de transações. A exclusão de transações se dá de maneira indireta ao deletar um usuário, o que também exclui todas as transações relacionadas àquele usuário. No momento, não é possível realizar edição de transações.
 - Validações: Além das funcionalidades de gerenciamento, há uma validação utilizando a idade do usuário, que permite ou não o cadastro de transações do tipo Receita.
 - Resumo das transações: Esta funcionalidade permite ver um resumo de todas as transações cadastradas, com um cálculo de saldo total. A lista de todas as transações pode ser filtrada por tipo de transação, nome de usuário ou ambos, e o cálculo total reflete os filtros aplicados. Para ver o resumo de um único usuário, basta selecionar o nome no menu de filtro.

## Instruções para execução

Para executar o projeto, é necessário instalar algumas ferramentas. A entrega final executa o front como uma página estática, e permite a execução na mesma porta do localhost. É necessário instalar o .NET SDK versão 8, a recomendação é seguir as instruções específicas para seu sistema operacional disponíveis em https://dotnet.microsoft.com/en-us/download. Além do .NET, é recomendado a instalação do git, mas é possível fazer o clone do repositório diretamente pelo browser.

Após instalar as dependências, clone o repositório na máquina atual e navege até o diretório root do projeto:

```bash
git clone https://github.com/gabrielvnm/net-app
cd net-app
```

Após o clone, navegue até a pasta backend para inicializar o projeto:

```bash
cd backend/netApp

dotnet restore

dotnet build

dotnet run
```

A aplicação será executada na porta 5092 do localhost em http://localhost:5092/


  
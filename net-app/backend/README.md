# Backend

API backend do projeto netApp, construída com **.NET 8** e **Entity Framework Core**.

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| .NET | 8.0 | Framework de desenvolvimento |
| Entity Framework Core | 8.0 | ORM para acesso a dados |
| SQLite | 3.x | Banco de dados |
| ASP.NET Core | 8.0 | API RESTful |
| Swagger/OpenAPI | - | Documentação da API |

## Estrutura do Projeto

backend/netApp/
├── Controllers/ # Controladores da API  

│ ├── UserController.cs # Endpoints de usuários  

│ └── TransactionController.cs # Endpoints de transações   

├── Services/ # Camada de serviços (lógica de negócio)  

│ ├── IUserService.cs # Interface de usuários  

│ ├── UserService.cs # Implementação de usuários  

│ ├── ITransactionService.cs # Interface de transações  

│ └── TransactionService.cs # Implementação de transações  

├── Models/ # Modelos de domínio  

│ ├── User.cs # Modelo de usuário  

│ └── Transaction.cs # Modelo de transação  

├── DTOs/ # Data Transfer Objects  

│ ├── UserCreateDto.cs # DTO de criação de usuário  

│ ├── UserUpdateDto.cs # DTO de atualização de usuário  

│ ├── UserResponseDto.cs # DTO de resposta de usuário  

│ ├── TransactionCreateDto.cs # DTO de criação de transação  

│ └── TransactionResponseDto.cs # DTO de resposta de transação  

├── Data/ # Contexto do banco de dados  

│ └── AppDbContext.cs # DbContext do Entity Framework  

│ └── SeedData.cs # Arquivo para popular o banco de dados com dados de teste  

├── Helpers/ # Classes auxiliares  

│ └── AgeHelper.cs # Cálculo de idade  

├── Migrations/ # Migrações do Entity Framework  

├── Properties/ # Configurações de projeto  

├── wwwroot/ # Arquivos estáticos (frontend compilado)  

├── Program.cs # Ponto de entrada da aplicação  

├── appsettings.json # Configurações da aplicação  

├── appsettings.Development.json # Configurações de desenvolvimento  

└── netApp.csproj # Arquivo de projeto  

## Arquitetura

O backend segue uma arquitetura em camadas (layers), separando responsabilidades:

### 1. Controllers

- Responsável por receber requisições HTTP
- Validação inicial dos dados de entrada
- Retorna respostas HTTP apropriadas

### 2. Services

- Contém a lógica de negócio
- Validações de regras de negócio (ex: idade mínima)
- Orquestra operações com o banco de dados

### 3. Data/Models

- Define a estrutura do banco de dados
- Mapeamento objeto-relacional (ORM)
- Relacionamentos entre entidades

### 4. Transferência com DTOs

- Define os contratos de API
- Separa os modelos de domínio da API
- Controla quais dados são expostos

## Passos para execução

Para executar o projeto localmente, é necessário instalar o SDK versão 8. A versão 9 pode funcionar, mas não foram realizados testes para confirmar.

Após clonar o repositório, navegar até a pasta root do backend /netApp e executar os comandos:

```bash
dotnet restore

dotnet build

dotnet run

dotnet run --urls="http://localhost:5092"
```

Para utilizar uma porta específica, altere a url após a flagg --urls.

## Banco de dados

O projeto utiliza banco de dados SQLite, e as migrações e populações do banco devem ser executadas automaticamente ao realizar o build da aplicação. A persistência de dados é local, os dados serão mantidos ao parar a exeução da aplicação e executar novamente.


## API Endpoints

### Base URL
- Development: `http://localhost:5092/api`

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/{id}` | Get user by ID |
| POST | `/users` | Create new user |
| PATCH | `/users/{id}` | Update user |
| DELETE | `/users/{id}` | Delete user (cascade deletes transactions) |

### Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/transactions` | Get all transactions |
| GET | `/transactions?userId=1` | Get transactions by user |
| GET | `/transactions?type=Receita` | Filter type |
| GET | `/transactions/{id}` | Get transaction by ID |
| POST | `/transactions` | Create transaction |

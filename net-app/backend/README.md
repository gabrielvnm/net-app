## API Endpoints

### Base URL
- Development: `http://localhost:5092/api`

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/{id}` | Get user by ID |
| POST | `/users` | Create new user |
| PUT | `/users/{id}` | Update user |
| DELETE | `/users/{id}` | Delete user (cascade deletes transactions) |

### Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/transactions` | Get all transactions (supports filtering) |
| GET | `/transactions?userId=1` | Get transactions by user |
| GET | `/transactions?type=Receita` | Filter by type |
| GET | `/transactions/{id}` | Get transaction by ID |
| POST | `/transactions` | Create new transaction |
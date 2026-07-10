# frontend

Pasta contendo o frontend do projeto, construído usando REACT, Vite, node versão 22.

## Estrutura

O projeto foi construído seguindo uma estrutura similar a um projeto Angular, respeitando as diferenças com o React. A aplicação é dividida em diferentes páginas, cada uma contendo funcionalidades diferentes. A navegação entre as páginas se dá pelo uso de roteamento, usando a biblioteca react-router-dom. O projeto segue uma arquitetura baseada em funcionalidades, organizando o código por funcionalidade em vez de por tipo de arquivo.

As funcionalidades estão divididas em seus respectivos componentes e páginas. As páginas em si são componentes, mas há uma pequena diferenciação para uso correto do roteamento. Cada componente com elementos tsx também utiliza seu próprio arquivo de estilos .css. No geral, a lógica de cada componente foi mantida dentro do próprio componente, e em alguns casos, foi criado um novo componente para facilitar a manutenção do código, como no caso dos formulários.

As chamadas de api estão centralizadas na pasta /services, que contém o arquivo definindo os métodos HTTP e os serviços com os endpoints para Transações e Usuários.

## Funcionalidades Principais

- **Validação de Idade**: Usuários menores de 18 anos não podem cadastrar transações do tipo Receita
- **Operações CRUD**: Criação, leitura, atualização e exclusão de usuários
- **Exclusão em Cascata**: Ao excluir um usuário, todas as suas transações são removidas

## Inicialização

A entrega final do projeto faz a compilação do frontend inteiro como uma página estática, para que ambos frontend e backend sejam inicializados por uma única URL no localhost. Durante o desenvolvimento, o frontend foi iniciado em uma porta separada no modo de desenvolvimento. Caso haja interesse, é possível inicializar apenas o front com alguns comandos, mas é necessário a instalação de algumas dependências: 

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0"
}
{
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0",
  "@vitejs/plugin-react": "^4.0.0",
  "typescript": "^5.0.0",
  "vite": "^5.0.0"
}
```

```bash
npm install
npm run dev
```

O servidor front será inicializado na porta 5173. É importante notar que, caso o servidor backend não seja inicializado, o front irá falhar em obter os dados, e exibirá diversas mensagens de erro.


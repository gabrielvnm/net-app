# regras

## Cadastro de pessoas: 

Deverá ser implementado um cadastro contendo as funcionalidades básicas de gerenciamento: criação, deleção e listagem.

Em casos que se delete uma pessoa, todas a transações dessa pessoa deverão ser apagadas.

O cadastro de pessoa deverá conter:

 - Identificador (deve ser único e gerado automaticamente);
 - Nome;
 - Idade;


## Cadastro de transações: 

Deverá ser implementado um cadastro contendo as funcionalidades básicas de gerenciamento: criação e listagem (não é necessário implementar edição/deleção).

 - Caso a pessoa informada seja menor de idade (menor de 18 anos), apenas despesas poderão ser cadastradas.

O cadastro de transação deverá conter:

 - Identificador (deve ser único e gerado automaticamente);
 - Descrição;
 - Valor;
 - Tipo (despesa/receita);
 - Pessoa (identificador da pessoa);  
        ( Esse valor precisa existir no cadastro de pessoa; )


## Consulta de totais:

Deverá listar todas as pessoas cadastradas, exibindo o total de receitas, despesas e o saldo (receita – despesa) de cada uma.

Ao final da listagem, deverá ser exibido o total geral de todas as pessoas, incluindo o total de receitas, o total de despesas e o saldo líquido.
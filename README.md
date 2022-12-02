• Para rodar o projeto, é necessário ter o Node 16 ou superior instalado, e rodar npm install no terminal. Então, um npm run start para começar a testar as rotas.

• Será necessário da criação de um arquivo .env assim como o arquivo .env.example, e passar as credenciais do banco de dados que serão passadas no particular. 

• Para chamar as rotas, poderá utilizar o Postman, ou outra ferramenta parecida. Minha recomendação é a realizá-las pelo próprio VSCode, tendo a extensão REST Client. Pois em cada controller existem exemplos que poderão ser usados na hora de testar as rotas.

    • Rotas de Usuários = /src/users/userRequest.rest

    • Rotas de Transações = /src/transactions/transactionsRequest.rest

• Caso você não queira usar os arquivos .rest, você também pode utilizar a rota 
http://localhost:3000/apidocs para abrir o swagger do projeto, então você pode seguir a documentação dele para realizar as requisições onde desejar.

• Em relação os testes unitários, eles estão localizados nos arquivos .spec em suas respectivas pastas. Aqui está como rodar cada um deles:

• Todos os testes: npm run test

• Testes unitários Users: npm run test -t src/users/users.spec.ts

• Testes unitários Transactions: npm run test -t src/transactions/transactions.spec.ts

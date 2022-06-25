# CRUD utilizando Sequelize

O frontend apresenta uma tabela que é alimentada por dados de usuários salvos em um banco relacional,
permitindo realizar requisições para criar, alterar ou deletar estes usuários.


## Executar localmente

Realizar a clonagem do repositório e instalar as dependências.

```sh
git clone https://github.com/yuridreis/crud-sequelize.git
yarn
```

Alterar os dados para utilizar seu banco de dados no arquivo "server/config/config_db.js" e utilizar o sequelize para criar o banco caso necessário.

```sh
yarn sequelize db:create
```

Executar as migrations para criar a tabela no banco de dados.

```sh
yarn sequelize db:migrate
```

Inicializar o servidor e o front-end.

```sh
yarn start
npx lite-server
```

O front end estará disponivel para visualização na url http://localhost:3000/

O servidor estará aberto para requisições http na url http://localhost:3333/



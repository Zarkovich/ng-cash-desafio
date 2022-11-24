# Instruções para rodar o projeto:

## Caso deseje utilizar o DOCKER:

Para rodar todo o projeto basta ir na pasta ng-cash e rodar o docker-compose

```sh
docker compose -f "docker-compose.yml" up -d --build
```

Agora para acessar o site só entrar no [localhost:5432](http://localhost:5432/) o visualizador do Banco de Dados pode utilizar o Prisma Studio acessando o [localhost:5000](http://localhost:5000/)

Se desejar utilizar outro cliente SQL só conectar com a string de conexão

```
postgresql://postgres:Senha123@postgres_DB:5432/ng_bank
```

## Utilizando meu banco de dados PostgreSQL

> Jeito mais rápido de testar utilizando meu banco dados hospedado no [render](https://render.com/)

Primeiro build os projetos para baixar as dependências necessárias. Na pasta ng-cash execute o comando `npm run build` e espere finalizar.

Na pasta ng-cash execute o comando `npm run servidor` para iniciar o servidor e logo após em outro terminal `npm run interface` para iniciar o front

## Utilizando qualquer outro banco de dados PostgreSQL

Primeiro build os projetos para baixar as dependências necessárias. Na pasta ng-cash execute o comando `npm run build` e espere finalizar.

Na pasta servidor edite o arquivo .env na variável DATABASE_URL="String_connection" coloque a string connection do servidor. abra o terminal na pasta ng-cash e execute o comando `npm run create_table` assim ele criará as tabelas necessárias para o projeto

Na pasta ng-cash execute o comando `npm run servidor` para iniciar o servidor e logo após em outro terminal `npm run interface` para iniciar o front

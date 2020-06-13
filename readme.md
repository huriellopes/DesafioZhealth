# Desafio da Zhealth

> Desafio do processo seletivo para vaga de desenvolvedor nodejs junior, com o tema de api de um serviço de prescrição de medicamentos!

## O que foi usado:

- Node.js
- Express
- Dotenv
- Mongoose
- JWT (JsonWebToken)
- Eslint
- Prettier
- Body Parser
- Cors
- Compression
- Bcryptjs
- Crypto
- Morgan
- Celebrate
- FS
- Path
- Eslint
- Prettier
- Mochajs
- Chaijs

## Para testar o projeto:

### clone o repositório:

````
git clone https://github.com/huriellopes/DesafioZhealth.git
````

### Acesse a pasta do projeto, rode o seguinte comando:

````
cd DesafioZhealth

yarn install ou npm install
````

### Copie o .env.example e configure:

````
cp .env.example .env ou copy .env.example .env
````

### Configure as seguintes variaveis de ambiente:

````
APP_PORT=
````

### Rode o seguinte comando, para gerar o token da aplicação:

````
yarn key:generate
````

### Depois inicialize o servidor:

````
yarn dev
````

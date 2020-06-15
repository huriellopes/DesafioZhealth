# Desafio da Zhealth

> Desafio do processo seletivo para vaga de Desenvolvedor Node.Js Júnior, com o tema de api de um serviço de prescrição de medicamentos!

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
- Cros-env
- Compression
- Bcryptjs
- Crypto
- Morgan
- Celebrate
- FS
- Path
- Eslint
- Prettier
- Jest
- SuperTest

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

### Configure o .env com as credenciais de e-mail:

> Sugestão de uso [Mailtrap](https://mailtrap.io/), cria uma conta na plataforma, após isso crie uma inboxes e acesse, em integrations e escolha nodemailer, pegue as informações e configure as variaveis de ambiente do .env:

````
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=
````

### Depois inicialize o servidor:

````
yarn dev
````

## EndPoints da API:

> Foi utilizado o software insmonia para testes de rotas da api, na raiz do projeto, tem um arquivo exportado do insmonia com todas as rotas da api!

## Teste de functionamento da Api
  - GET - /test - Testa se a api está funcionando

#### Doctor
  - POST - /auth/register
  - POST - /auth
  - POST - /auth/forgot_password
  - POST - /auth/reset_password

#### Prescription
  - GET - /prescription
  - GET - /prescription/:prescriptionId
  - POST - /prescription/create
  - PUT - /prescription/:prescriptionId
  - DELETE - /prescription/:prescriptionId

## Créditos

- Empresa: Zhealth

## License

- MIT LICENSE

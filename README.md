# nlwValoriza
Sistema de elogios com tags específicas entre usuários autenticados.

# AULA 1

yarn init -y
-> criar o projeto json Node

yarn add typescript -D
-> adiciona a biblioteca typescript devdependence

yarn tsc --init
-> inicializa o typescript
criando o arquivo tsonfig.jason "altera propriedade stirct par False"

yarn tsc
-> converte o arquivo ts em js

node index.js
-> executa o arquivo do caminho

yarn add express
->
instala rota e recursos API - Framework Express

Criar manualmente a pasta SRC
criar dentro de src o aquivo SERVER.ts

instalar tipagem para o express ...
->
yarn add @types/

converter o arquivo server.ts em js
->
yarn tsc

executar o server.js
->
node src/index.js

instalar dependecia ts-node-dev -D
-> yarn add ts-node-dev -D
para converter o ts em js

no package.json criar um scripts dev: "ts-node-dev" mais o caminho do aqruivo server "src/server.ts" Para o reload da aplicação sempre que alterar o arquivo.

## CRIAR ROTA

.get

tipos de métodos:
GET => Busca uma informação
POST => Inserir (Criar) uma informação
PUT => Alterar uma informação
DELETE => Remover uma dado
PATCH => Alterar uma informação específica

passar o recurso API Rota "/test"

aerrow funciton (request, response) {
return responde.send("")
}

criar rota POST app.post("/post"). response.send("")
verificar funcionamento da rota pelo Insominia

# AULA 2

## PARÂMETROS

Route Params => explícitos na rota.
Query Params => (não obrogatórios).

Body Params => post, put, patch.
"name":"Teclado",
"description":"teclado bom".

## BANCO DE DADOS

DRIVER do DB. Moongo, MySQL, Oracle, MariaDB, Postgree. "NATIVO". Ter conhecimento do código. Select, Insert, Delete, Join.

Query Builders: KNEX.JS. Não é tão mão na massa.

## ORM's

Object Relational Map. Framework mapeamento entre entidade e objeto.
Biblioteca que pega o codigo em JS e tranform em linguagem para o DB. Automotiza. pego a entidade e o modelo de table e campos. Repositório Gerenciador de Entidade no DB. Métodos definidos.
Ex: Sequelize, TYPEORM, PRISMA.

A melhor forma que melhor atende o projeto.

---

---

## "TYPESCRIPT " Super set do JavaScript

---

# configurar o DB.

instalar com
->
yarn add typeorm reflect-metadata sqlite3

Reflect-metadata para Usar Decorators.

### configurar DB.

criar arquivo "ormconfig.json" no escorpo global - tipo de driver e caminho do arquivo.

criar a pasta "database" e o arquivo "index.ts" configurando a conexão
->
no index.ts dentro de database: import createConnection from "typeorm" e logo executar a função. para inicializar o banco de dados.

importar o caminho do databse para o server.ts

yarn dev.

---

## MIGRATIONS: Controle de versionamento de tabelas de DB na aplicação.

---

Controle de projeto para subistiruir DBA ou métodos inseguros sem github. Código de alteração. compliment. Controle do que foi executado ou não. Mesma atualização. Serão responsáveis por criar e organizar as tabelas. Histórico de alterações.

Passar o Cli do TypeORM (Gerenciador) no arquivo do ormconfig.json. migrationsDir: caminho do arquivo.
-> Ferramenta.

configurar package.json Scripts{ "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js" }

-> testar script: yarn typeorm --help
teste as opções de cli

yarn typeorm migration:create -n CreateUsers
-> criar a pasta e a migration

no arquivo de migration em public aync UP Cria-se a tabela do DB. com nome e columas. as clunas dentro de uma array.

obs: quande se roda uma migration pode-se criar ou desfazer.

RODAR A TABELA
->
Dizer ao ORM de onde ele vai pegar essas informações tem o diretorio de criação e onde executa as migrations
no arquivo ormconfig.json migrations:[src/database/migrations/*.ts]

->
rodar a tabelas para criar-la:
yarn typeorm migration:run

configurar o entities no ormconfig
->
yarn typeorm entity:create -n User

---

# ENTIDADE

---

referência de tabela

Entidade < - > ORM < - > DB (users)

+> Configurar o tsconfig e Decorators. descomentar

    "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */

    "experimentalDecorators": true,                   /* Enable experimental support for TC39 stage 2 draft decorators. */


    "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */

-> mudar para false.
Para não dar error de inicialização, pois será inicializado de forma diferente no projeto.

---

## Entidade:

referencia a tabela no singular, campos e tipos de colunas.

importar os tipos de colunas.

repassar o decoratores @columns() em função

Instalar UUID.
->
yarn add uuid

Instalar as tipagens do uuid
->
yarn add @types/uuid -D

Importar no Entity User a library UUID { v4}.
exiten varios tipos de formatos.

dentro de users no final criar o Construtor(){} "new User" de verificação na criação vazio ou não.

---

# REPOSITÓRIO

---

Entidade (User) <-> ORM <-> DB (users)
Repositórios :Comunicação Entre Entidade e Banco de Dados. métodos de busca, criação, exclusão.

Para fazer um inserção de usuário não é possivel diretamente pela Entity, é preciso de uma camada para acessar o DB.

no src/ criar pasta "repositories" e um arquivo "UsersRepositories".

CRIAR UM CUSTOM RIPOSITORY EXTENDS

para liberar funções. save, remove, insert, update, restore, find. Métodos padrões.

basta "extender" métodos para classe.

DIFERENÇA entre extends (tem por padrão) e implement (é preciso inportar e configurar).

---

# SERVICE

---

## Regras

### Cadastro de usuário.

- Não é permitido cadastrar mais de um usuário com o mesmo e-mail.
- não é permitido cadastrar usuário sem email.

### Cadatro de TAG.

- não é permitido cadatrar mais de uma tag com o mesmo nome. Duplicidade.
- não é permitido cadatrar tag sem nome.
- não é permitido o cadastro por usúario que não sejam administradores.

### Cadatro de elogios.

- não é permitido um usuário cadastrar um elogio para si.
- não é permitido cadatrar elogios para usuários inválidos.
- o usuário precisa estar autenticado na aplicação.

---

VALIDAÇÃO / VERIFICAÇÂO.

---

requisição -> SERVER -> ( ? ) -> SERVICE (validação/ verificação/ tratativa) -> REPOSITORY - DB.

Regras precisam estar isoladas das demais camadas.

Divisaõ da Aplicação.

Código e arquitetura Limpa.

Criar pasta/camada "services".

Toda classe precisa existir por um motivo!

Cada tabela de cadatro de User, Tag e Elogios terá um Service. Divisão de Responsabilidades.

Criar uma Interface.

Fazer a tratativa de Criação de Usuário. usando o rpositório. através das class extands.

---

# CONTROLLER

---

requisição -> SERVER -> (ROTA) CONTROLLER (req, res) -> SERVICE (validação/ verificação/ tratativa) -> REPOSITORY - DB.

Criar no src/ a pasta/camada "controllers" e o arquivo "CreateUserController".

#ROTAS

Criar no src/ routes.ts
importar no aqruivo o Router do Express.
inicializar o Router em uma variável.
chamar a funcao . método de rotas

importar o Controller;

No SERVER importar o routes.
app.use(router) é o MIDLEWARE para receber as rotas no servidor.

configurar no SERVER que o express usa json
-> acima das rotas use.route
app.use(express.json());

---

configurar o caminho de entites no ormconfig.json

---

### ERROR

uso de repository custom no arquivo de service. não pode ser new.
importar do typeorm o getCustomRepository. e adicionar repassando a clasee na const createservice

---

# AULA 3

---

---

### Excessão

---

Controller -> Service (throw new Error)
Repassando a excessão para a camada acima.
controller fazer a tratativa conforme quiser.
O service informa o controller.

para resolver: tratativa.

1a forma: try{} catch(){} err.message.

2a forma: pela rota e server como MIDDLEWARE.

SERVER -> ROUTES -> CONTROLLER -> SERVICES -> REPOSITORY - ENTITY - DB

---

## MIDDLEWARES

---

toda vez que usa app.use(") se usa um middleware
São receptadores dentro de uma requisição.
pode ser iterrompida ou adcionada.
quando se chama a req o dentro do fluxo pode ter algum middleware. entre a req e res.

### criar um middleware funcção.

app.use( () => {

})

MIDDLEWARE de ERROR tem que pasar quatro parametros.
err, request, response, next e fazer a tipagem de cada.

verificar o error se é trato ou não.

### instalar a biblioteca que permite receber os parametros do assíncronos

yarn add express-async-errors

---

### CRIAR ESTRUTRA DE TAG

---

- Criar Migration de "TAGS".
  ->
  yarn typeorm migration:create -n CreateTags

- Criar tabela de "tags" na migration

- Rodar a migration para criar a tabela "tags" no DB.
  ->
  yarn typeorm migration:run

  Configurar a Entyti, Repository, Service, Controler e a Rota de TAGS.

  ***

  # AULA 4 | JWT - JSON Web Token e BCRYPTJS - Cripitografia

  ***

  CYBERSEGURANÇA

  ## JWT.io, Criar Compliments e JOINS entre tabelas.

  JWT = JSON Web Tokens
  -> verificar a autenticação dos usuários.
  Não precisa ficar requisitando o usuário.

  como funcionar o JWT
  Header.Payload.VerifySignature

  adicionar a biblioteca JWT

->
yarn add jsonwebtoken

adicionar as tipagem do JWT DevDependencia
->
yarn add @types/jsonwebtoken -D

---

Criar coluna na tabela "users" com o campo "password"
Cirando uma migration de TableColumn. add.Column

rodar a yarn typeorm migration:run // vai dar error porque a tabela ja tem registros
//para resolver tem que add o campo isNullable: true.

Má prática de armazenar a senha
Precisa criptografar a senha para não ficar exposta no DB. antes de armazenar precisa criptografar.

### add a library > yarn add bcryptjs

& yarn add @types/bcryptjs -D

importar a bcryptjs no service e configirar antes de criar o user uma const para receber a criptografia. repassar a variável da senha criptografada como tipagem do TS.

Vair precisar de uma rota de autenticação do usuário:

---

### Criar foreigh key com typeorm

---

abaixo de column de createTable com arrays.

yarn typeorm migration:run para criar no DB.

Criar Entidade com JoinColumn e ManyToOne
Relacionamento de 1 p 1, 1 p m, m p 1, m p m.

Criar Repositório

---

> Configurar default para o admin no CreateUserServiçe = repassar no asynce execute admin = false

---

---

# AULA 5 - Criação de Token (Middleware para validar as rotas).

---

### Criar um middleware de Authenticação e validação do Token.

AUTH - Método Bearer.

### sobrescrever tipagens do express.

-> Reiniciar aplicação Reload Windows

Configurar tsconfig: typesRoots

---

### Instalar biblioteca de customização de entidade:

---

->
yarn add class-transformer

importar Expose na Entidade Tag

criar lista de todos usuários
importar a biblioteca de class-tranforme no @Exclude

## Milhas Extras

### Criar serviço de notificação por email:

- Heroku linka com GitHub, Amazon, DigitalOcean.

- FrontEnd.

---

Adicionar a Biblioteca CORS

---

yarn add cors
yarn add @types/cors -D

importar o cors no server.
app.use(cors());

Por padrão a aplicação não recebe requisições de fora.
Cors habilita aplicações que não sejam back-end consigam acessar a aplicação
Pode ser geral ou restrito.

---

ClinCode \ Solid \ Design Patterns
Módulos
aprofundar a arquitetura com Solid

---

Class Hadler
Erros Customizaveis

---

Ultilizar outro driver DB
Postgrees, MySQL, Oracle.
configurar o orm.config
ver no typeorm

---

melhorar o services, buscas personalizadas.

---

Logs

---

Century

---

# Juntos no Próximo Nível \ #NEVERSTOPLEARNING

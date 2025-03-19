# Consultório Médico - API em Node.js

## Descrição
Este é um projeto de API para gerenciamento de um consultório médico desenvolvido em Node.js. Ele permite o cadastro e gerenciamento de consultas, pacientes e médicos.

## Funcionalidades
- Cadastro, listagem, edição e remoção de pacientes.
- Cadastro, listagem, edição e remoção de médicos.
- Agendamento, listagem e cancelamento de consultas.

## Tecnologias Utilizadas
- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework para criação da API REST
- **MongoDB** (ou outro banco de dados, se preferir) - Armazenamento de dados
- **Mongoose** - ODM para interação com o banco de dados
- **JWT** - Autenticação e segurança

## Instalação
1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```
2. Acesse a pasta do projeto:
   ```sh
   cd nome-do-repositorio
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Configure as variáveis de ambiente no arquivo `.env`.
5. Inicie o servidor:
   ```sh
   npm start
   ```

## Uso
### Rotas Principais
- **Pacientes**
  - `GET /pacientes` - Lista todos os pacientes
  - `POST /pacientes` - Cadastra um novo paciente
  - `PUT /pacientes/:id` - Atualiza dados de um paciente
  - `DELETE /pacientes/:id` - Remove um paciente

- **Médicos**
  - `GET /medicos` - Lista todos os médicos
  - `POST /medicos` - Cadastra um novo médico
  - `PUT /medicos/:id` - Atualiza dados de um médico
  - `DELETE /medicos/:id` - Remove um médico

- **Consultas**
  - `GET /consultas` - Lista todas as consultas
  - `POST /consultas` - Agenda uma nova consulta
  - `DELETE /consultas/:id` - Cancela uma consulta

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma _issue_ ou enviar um _pull request_.

## Licença
Este projeto está sob a licença MIT. Para mais detalhes, consulte o arquivo `LICENSE`.

---
Desenvolvido com ♥ por [Seu Nome]


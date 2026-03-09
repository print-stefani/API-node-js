# 📦 API de Gerenciamento de Pedidos (Node.js + MongoDB)

Este projeto é uma API REST desenvolvida em Node.js para o gerenciamento de pedidos, realizando a transformação de dados entre o recebimento (JSON em português) e o armazenamento (Banco de Dados em inglês).

# 🛠️ Tecnologias e Ferramentas

* **Runtime:** Node.js
* **Framework:** Express
* **Banco de Dados:** MongoDB Atlas (NoSQL)
* **ODM:** Mongoose
* **Testes de API:** Postman / Thunder Client

---

# 📋 Funcionalidades (Endpoints)

| Método     | Endpoint      | Descrição                                       |
| ---------- | ------------- | ----------------------------------------------- |
| **POST**   | `/order`      | Cria um novo pedido com transformação de campos |
| **GET**    | `/order/list` | Lista todos os pedidos cadastrados              |
| **GET**    | `/order/:id`  | Busca um pedido específico pelo `orderId`       |
| **PUT**    | `/order/:id`  | Atualiza os dados de um pedido existente        |
| **DELETE** | `/order/:id`  | Remove um pedido do banco de dados              |

---

# 🚀 Como Instalar e Rodar

### 1️⃣ Clone o projeto

```bash
git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
```

### 2️⃣ Entre na pasta do projeto

```bash
cd NOME_DO_REPOSITORIO
```

### 3️⃣ Instale as dependências

```bash
npm install
```

### 4️⃣ Configure a conexão com o banco

No arquivo **`index.js`**, substitua a variável `uri` pela sua **string de conexão do MongoDB Atlas**.

### 5️⃣ Execute a aplicação

```bash
node index.js
```

---

# 🔄 Exemplo de Transformação de Dados

## 📥 Entrada (JSON enviado no POST)

```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

---

## 📤 Saída (Como é salvo no MongoDB)

```json
{
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "items": [
    {
      "productId": "2434",
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

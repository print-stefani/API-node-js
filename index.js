const express = require('express');
const app = express();
app.use(express.json());

let orders = [];

// 1. ENDPOINT POST 
app.post('/order', (req, res) => {
    const data = req.body;

    const mappedOrder = {
        orderId: data.numeroPedido,
        value: data.valorTotal,
        creationDate: data.dataCriacao,
        items: data.items.map(item => ({
            productid: item.idItem,
            quantity: item.quantidadeltem,
            price: item.valorltem
        }))
    };

    orders.push(mappedOrder);

    console.log("Pedido salvo com sucesso!");
    res.status(201).json({ message: "Pedido criado!", order: mappedOrder });
});

// 2. ENDPOINT GET - Buscar por ID
app.get('/order/:orderId', (req, res) => {
    const idBuscado = req.params.orderId;
    const pedidoencontrado = orders.find(o => o.orderId === idBuscado);

    if (!pedidoencontrado) {
        return res.status(404).json({ message: "Pedido não encontrado!" });
    }

    res.json(pedidoencontrado);
});

//ENDPOINT GET - Listar todos 
app.get('/order/list', (req, res) => {
    res.json(orders);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
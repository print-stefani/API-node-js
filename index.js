const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); 

const uri = "mongodb+srv://test:admin123@cluster0.nuag96e.mongodb.net/?appName=Cluster0";

mongoose.connect(uri)
    .then(() => console.log("Conectado ao MongoDB Atlas com sucesso!"))
    .catch(err => console.error("Erro ao conectar ao banco:", err));

const OrderSchema = new mongoose.Schema({
    orderId: String,
    value: Number,
    creationDate: Date,
    items: [{
        productId: String,
        quantity: Number,
        price: Number
    }]
});

const Order = mongoose.model('Order', OrderSchema);

// --- ENDPOINTS (ROTAS) ---

// (POST) - Com Transformação de Dados
app.post('/order', async (req, res) => {
    try {
        const data = req.body;

        const novoPedido = new Order({
            orderId: data.numeroPedido,      
            value: data.valorTotal,          
            creationDate: data.dataCriacao,  
            items: data.items.map(item => ({
                productId: item.idItem,     
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        });

        await novoPedido.save();
        res.status(201).json(novoPedido);
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao criar", erro: error.message });
    }
});

// GET (Listar todos) 
app.get('/order/list', async (req, res) => {
    try {
        const pedidos = await Order.find();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// (GET)
app.get('/order/:numero', async (req, res) => {
    try {
        const pedido = await Order.findOne({ orderId: req.params.numero });
        if (!pedido) return res.status(404).json({ mensagem: "Pedido não encontrado" });
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor", erro: error.message });
    }
});

// (PUT)
app.put('/order/:numero', async (req, res) => {
    try {
        const atualizado = await Order.findOneAndUpdate(
            { orderId: req.params.numero },
            req.body,
            { new: true }
        );
        res.json(atualizado);
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao atualizar" });
    }
});

//  (DELETE)
app.delete('/order/:numero', async (req, res) => {
    try {
        await Order.findOneAndDelete({ orderId: req.params.numero });
        res.json({ mensagem: "Pedido removido com sucesso" });
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao deletar" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
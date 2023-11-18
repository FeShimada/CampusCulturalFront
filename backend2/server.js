const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://anabeatrizcosta:123@campuscultural.zzun0rk.mongodb.net/?retryWrites=true&w=majority');

// Middleware para o corpo das requisições
app.use(express.json());

// Rotas
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Iniciar o servidor na porta desejada
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

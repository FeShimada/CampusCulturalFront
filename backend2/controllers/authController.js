const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Verificar se o email já está cadastrado
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email já cadastrado' });
      }
  
      // Criptografar a senha
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Criar um novo usuário
      const newUser = new User({
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
  },
  login: async (req, res) => {
    console.log("chegou aqui");
    try {
      const { email, password } = req.body;
  
      // Procurar o usuário pelo email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
  
      // Verificar a senha
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
  
      // Gerar token JWT
      const token = jwt.sign({ email: user.email }, 'seuSegredoDoToken', { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao fazer login' });
    }
  },
  acessoPermitido: (req, res) => {
    res.json({ message: 'Acesso permitido' });
  }
};

module.exports = authController;

/*

const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function criarUsuario(email, nome, senha) {
    try {
  
      const hashSenha = await bcrypt.hash(senha, 10);
  
      const usuario = await prisma.user.create({
        data: {
          email,
          name: nome,
          hashSenha, // Armazena o hash seguro da senha no banco de dados
        },
      });
  
      return usuario;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error; // Rejeita o erro para que seja tratado no chamador
    }
  }
  
  (async () => {
    try {
      await criarUsuario('luissuarez@gmail.com', 'Luis Suarez', 'senha123');
  
      const usuarios = await prisma.user.count();
      console.log('Total de usuários:', usuarios);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      await prisma.$disconnect();
    }
  })();
  


(async()=>{
    const usuarios = await prisma.user.count()
    console.log(usuarios);
})();

*/ 
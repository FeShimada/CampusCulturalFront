npm init -y
	
	dependencias: {
		pg: postgres
		express: lidar com requests http
		dotenv: gestão de variáveis de ambiente
	}
	
	config do banco postgres {
		crie arquivo .env {
		    PORT=8000
		    CONNECTION_STRING=postgres://postgres:postgres@localhost:5432/nome_banco
		}
	}
	
	entrypoint {
		crie arquivo index.js {
		
			require("dotenv").config();
			
			const db = require("./db");
			
			const PORT = process.env.PORT;
			
			const express = require("express");
			
			const app = express();
			
			app.listen(PORT);
			
			console.log("App running on port " + PORT);
			
			
			
		}
		
		crie arquivo db.js {
			
			aysnc function connect() {
			
				if(global.connection) {
					return global.connection.connect();
				}
			
				const { Pool } = require("pg");
				const pool = new Pool({
					connectionString: process.env.CONNECTION_STRING
				})
				
				const client = await pool.connect();
				
				console.log("criou o pool de conecção")
				const res = await client.query("select now()");
				console.log(res.rows[0]);
				
				client.release();
				global.connection = pool;
				return pool.connect();
			}
			
			connect();
		
		}
	}
	
	rodar: node index.js
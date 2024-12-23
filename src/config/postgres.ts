import {Pool} from 'pg';
const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

pool.connect().then((client) => {console.log('Conexão com o Postgres estabelecida com sucesso!'), client.release();}).catch((err) => {console.log('Erro ao conectar com o Postgres: ', err)});

export default pool;
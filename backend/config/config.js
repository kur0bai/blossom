import 'dotenv/config';


const common = {
username: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
host: process.env.DB_HOST,
port: process.env.DB_PORT,
dialect: process.env.DB_DIALECT || 'postgres',
logging: false
};


export default {
development: common,
test: { ...common, database: `${process.env.DB_NAME}_test` },
production: common
};
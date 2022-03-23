import {Pool} from 'pg'
const pool = new Pool({
    user: "postgres",
    password: 'peiki50hApostgres',
    host: "localhost",
    port: 8000,
    database: "RecomendationSystem"
})

export default pool
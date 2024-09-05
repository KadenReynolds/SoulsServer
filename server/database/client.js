const {Client} = require ('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:DlQWMgBBeyGmtDgpapOONZWVgNBXLiCn@junction.proxy.rlwy.net:30895/railway';

const db = new Client({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = db;
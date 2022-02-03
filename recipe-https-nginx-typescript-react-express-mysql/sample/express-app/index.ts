import express,{ Request,Response } from 'express' 
import mysql from 'mysql2'
import cors from 'cors'

const app = express()

const pool = mysql.createPool({
  connectionLimit: 5,
  host: 'db',
  user: 'appuser',
  password: 'mysql',
  database: 'test',
})

const promisePool = pool.promise()

app.use(
  cors({
    // origin -> 作成したサブドメイン、Dcoker react-appコンテナ
    origin:['https://localhost.hironomiu.com','http://localhost:3333'],
    credentials:true,
    optionsSuccessStatus:200,
  })
)

app.get('/api/v1/hello', async (req:Request,res:Response) => {
  const [rows,fields]:[mysql.RowDataPacket[],any] = await promisePool.query('select 1 as num')
  if(rows[0]){
    res.json({message:`hello ${rows[0].num}`})
  }
})

app.listen(5550,() => {
  console.log(`express listen *:5550`)
})
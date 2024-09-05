
import { MongoClient, ServerApiVersion } from 'mongodb'
import express from 'express'
import cors from 'cors'
import { get_courses } from './getcourses.js'
import { get_skills } from './getskills.js'
import { get_departments } from './getdepartments.js'
import { get_schools } from './getschools.js'
import { get_programs } from './getprograms.js'
import { get_campus } from './getcampuses.js'
import pg from 'pg'
import { get_skills_pg } from './getskillspg.js'


const { Client } = pg
const pgClient = new Client({
	user: 'postgres',
	password: '123456',
	host: 'localhost',
	port: '5432',
	database: 'gitam_system',
})
await pgClient.connect()

const app = express()
app.use(cors())
const uri = "mongodb+srv://sedappil:salmongitam@cluster0.399qv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/',async function(req,res){
  // run().catch(console.dir);
    res.send("Testing....")
})

app.get('/courses',async function(req,res){
  // run().catch(console.dir);
    res.json(await get_courses(client))
})

app.get('/skills',async function(req,res){
  console.log(req.query.id==null)
  res.json(await get_skills(client, req.query.id))
  // await client.close()
})

app.get('/departments',async function(req,res){
  console.log(req.query.id==null)
  res.json(await get_departments(client))
  // await client.close()
})

app.get('/schools',async function(req,res){
  console.log(req.query.id==null)
  res.json(await get_schools(client))
  // await client.close()
})

app.get('/programs',async function(req,res){
  console.log(req.query.id==null)
  res.json(await get_programs(client))
  // await client.close()
})

app.get('/campus',async function(req,res){
  console.log(req.query.id==null)
  res.json(await get_campus(client))
  // await client.close()
})

// PG SQL APIs

app.get('/campuses/pg',async function(req,res){
const data = await pgClient.query('SELECT * from campuses')
res.send(data.rows)
})

app.get('/schools/pg',async function(req,res){
  const data = await pgClient.query('SELECT * from schools')
  res.send(data.rows)
  })

  app.get('/departments/pg',async function(req,res){
    const data = await pgClient.query('SELECT * from departments')
    res.send(data.rows)
    })

  app.get('/programs/pg',async function(req,res){
      const data = await pgClient.query('SELECT * from programs')
      res.send(data.rows)
      })

  app.get('/courses/pg',async function(req,res){
        const data = await pgClient.query('SELECT * from courses')
        res.send(data.rows)
        })

  app.get('/skills/pg',async function(req,res){
          const data = await pgClient.query('SELECT * from skills')
          res.send(data.rows)
          })

  app.get('/course_skill_mapping/pg',async function(req,res){
            const data = await get_skills_pg(pgClient)
            res.send(data.rows)
            })

app.listen(3000,function(){
    console.log("App started at port 3000...")
})
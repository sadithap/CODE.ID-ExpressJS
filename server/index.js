import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'HR',
    port : 5432
})

const app = express()

app.use(express.json())

const port = process.env.PORT || 3001

app.listen(port,()=> {console.log('Server listening on port '+port)})

//tabel region

app.get('/region',(req,res)=>{
    pool.query('select * from regions',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/region/:id',(req,res)=> {
    const {id} = req.params
    pool.query('select * from regions where region_id = $1',
    [id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rows)
    }
    )
})

app.post('/region',(req,res)=> {
    const {name} = req.body
    pool.query('insert into regions (region_name) values ($1)',
    [name],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.put('/region/:id',(req,res)=> {
    const {id} = req.params
    const {name} = req.body
    pool.query('update regions set region_name=$2 where region_id=$1',
    [id,name],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.delete('/region/:id',(req,res)=> {
    const {id} = req.params
    pool.query(`delete from regions where region_id = ${id}`,
    [],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

//tabel country

app.get('/country',(req,res)=>{
    pool.query('select * from countries',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/country/:id',(req,res)=> {
    const {id} = req.params
    pool.query('select * from countries where country_id = $1',
    [id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rows)
    }
    )
})

app.post('/country',(req,res)=> {
    const {id} = req.body
    const {name} = req.body
    const {region} = req.body
    pool.query('insert into countries (country_id,country_name,region_id) values ($1,$2,$3)',
    [id,name,region],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.put('/country/:id',(req,res)=> {
    const {id} = req.params
    const {name} = req.body
    pool.query('update countries set country_name=$2 where country_id=$1',
    [id,name],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.delete('/country/:id',(req,res)=> {
    const {id} = req.params
    pool.query(`delete from countries where country_id = $1`,
    [id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

//tabel departments

app.get('/department',(req,res)=>{
    pool.query('select * from departments',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/department/:id',(req,res)=> {
    const {id} = req.params
    pool.query('select * from departments where department_id = $1',
    [id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rows)
    }
    )
})

app.post('/department',(req,res)=> {
    const {id} = req.body
    const {name} = req.body
    const {manager} = req.body
    const {location} = req.body
    pool.query('insert into departments (department_id,department_name,manager_id,location_id) values ($1,$2,$3,$4)',
    [id,name,manager,location],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.put('/department/:id',(req,res)=> {
    const {id} = req.params
    const {name} = req.body
    pool.query('update departments set department_name=$2 where department_id=$1',
    [id,name],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.delete('/department/:id',(req,res)=> {
    const {id} = req.params
    pool.query('delete from departments where department_id = $1',
    [id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

//tabel location

app.get('/location',(req,res)=>{
    pool.query('select * from locations',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/location/:id',(req,res)=>{
    const {id}=req.params
    pool.query('select * from locations where location_id=$1',
    [id],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.post('/location',(req,res)=>{
    const {id}=req.body;
    const {street}=req.body;
    const {postal}=req.body;
    const {city}=req.body;
    const {state}=req.body;
    const {country}=req.body;
    pool.query('insert into locations(location_id,street_address,postal_code,city,state_province,country_id) values($1,$2,$3,$4,$5,$6)',
    [id,street,postal,city,state,country],
    (error,result)=> {
        if(error){
            throw error;
        }
        res.json(result.rowCount)
    })
})

app.put('/location/:id',(req,res)=>{
    const {id}=req.params;
    const {street}=req.body;
    pool.query('update locations set street_address=$2 where location_id=$1',
    [id,street],
    (error,result)=> {
        if(error){
            throw error;
        }
        res.json(result.rowCount)
    })
})

app.delete('/location/:id',(req,res)=> {
    const {id}=req.params;
    pool.query('delete from locations where location_id=$1',
    [id],
    (error,result)=> {
        if(error){
            throw error;
        }
        res.json(result.rowCount)
    })
})

//table jobs

app.get('/job',(req,res)=> {
    pool.query('select * from jobs',
    [],
    (error,result)=> {
        if(error){
            throw error;
        }
        res.json(result.rows)
    })
})

app.get('/job/:id',(req,res)=> {
    const {id}=req.params;
    pool.query('select * from jobs where job_id=$1',
    [id],
    (error,result)=> {
        if(error){
            throw error;
        }
        res.json(result.rows)
    })
})

app.post('/job',(req,res)=>{
    const {id}=req.body;
    const {title}=req.body;
    const {min}=req.body;
    const {max}=req.body;
    pool.query('insert into jobs(job_id,job_title,min_salary,max_salary) values($1,$2,$3,$4)',
    [id,title,min,max],
    (error,result)=> {
        if(error){
            throw error;
        }
        res.json(result.rowCount)
    })
})

app.put('/job/:id',(req,res)=>{
    const {id}=req.params;
    const {title}=req.body;
    pool.query('update jobs set job_title=$2 where job_id=$1',
    [id,title],
    (error,result)=> {
        if(error){
            throw error;
        }
        res.json(result.rowCount)
    })
})

app.delete('/job/:id',(req,res)=> {
    const {id}=req.params;
    pool.query('delete from jobs where job_id=$1',
    [id],
    (error,result)=> {
        if(error){
            throw error;
        }
        res.json(result.rowCount)
    })
})

//table job_history

app.get('/job_history',(req,res)=> {
    pool.query('select * from job_history',
    [],
    (error,result)=> {
        if(error){
            throw error;
        }
        res.json(result.rows)
    })
})

app.get('/job_history/:id',(req,res)=> {
    const {id}=req.params;
    pool.query('select * from job_history where employee_id=$1',
    [id],
    (error,result)=> {
        if(error){
            throw error;
        }
        res.json(result.rows)
    })
})

app.post('/job_history',(req,res)=>{
    const {id}=req.body;
    const {start}=req.body;
    const {end}=req.body;
    const {job}=req.body;
    const {department}=req.body;
    pool.query('insert into job_history(employee_id,start_date,end_date,job_id,department_id) values($1,$2,$3,$4,$5)',
    [id,start,end,job,department],
    (error,result)=> {
        if(error){
            throw error;
        }
        res.json(result.rowCount)
    })
})

app.put('/job_history/:id',(req,res)=>{
    const {id}=req.params;
    const {start}=req.body;
    pool.query('update job_history set start_date=$2 where employee_id=$1',
    [id,start],
    (error,result)=> {
        if(error){
            throw error;
        }
        res.json(result.rowCount)
    })
})

app.delete('/job_history/:id',(req,res)=> {
    const {id}=req.params;
    pool.query('delete from job_history where employee_id=$1',
    [id],
    (error,result)=> {
        if(error){
            throw error;
        }
        res.json(result.rowCount)
    })
})

//table employee

app.get('/employee',(req,res)=> {
    pool.query('select * from employees',
    [],
    (error,result)=> {
        if(error){
            throw error;
        }
        res.json(result.rows)
    })
})

app.get('/employee/:id',(req,res)=> {
    const {id}=req.params;
    pool.query('select * from employees where employee_id=$1',
    [id],
    (error,result)=> {
        if(error){
            throw error;
        }
        res.json(result.rows)
    })
})

app.post('/employee',(req,res)=>{
    const {id}=req.body;
    const {first}=req.body;
    const {last}=req.body;
    const {phone}=req.body;
    const {hire}=req.body;
    const {salary}=req.body;
    const {commission}=req.body;
    const {job}=req.body;
    const {manager}=req.body;
    const {department}=req.body;
    const {xemp}=req.body;
    pool.query('insert into employees(employee_id,first_name,last_name,phone_number,hire_date,salary,commission_pct,job_id,manager_id,department_id,xemp_id) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',
    [id,first,last,phone,hire,salary,commission,job,manager,department,xemp],
    (error,result)=> {
        if(error){
            throw error;
        }
        res.json(result.rowCount)
    })
})

app.put('/employee/:id',(req,res)=>{
    const {id}=req.params;
    const {first}=req.body;
    pool.query('update employees set first_name=$2 where employee_id=$1',
    [id,start],
    (error,result)=> {
        if(error){
            throw error;
        }
        res.json(result.rowCount)
    })
})

app.delete('/employee/:id',(req,res)=> {
    const {id}=req.params;
    pool.query('delete from employees where employee_id=$1',
    [id],
    (error,result)=> {
        if(error){
            throw error;
        }
        res.json(result.rowCount)
    })
})
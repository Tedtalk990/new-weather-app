const path=require('path');
const express=require('express');
const hbs=require('hbs');
const forcast=require('./utils/forcast.js')
const geocode=require('./utils/geocode.js')
const { dirname } = require('path');
const app=express();
const port=process.env.PORT || 3000;
const viewspath=path.join(__dirname,'../Templates/views')
const partialsPath=path.join(__dirname,'../Templates/partials')
app.set('view engine','hbs');
app.set('views',viewspath);
hbs.registerPartials(partialsPath);
// console.log(__dirname)
const pathTODir=path.join(__dirname,'../public')
app.use(express.static(pathTODir))
// console.log(pathTODir)


app.get('',(req,res)=>{
    res.render('index',{

        title:'WEATHER REPORT',
        news:'RAINING',
        name:'SHIVAM'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'SHIVAM'

    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'HELP',
        help:'WHAT HELP DO YOU NEED?'
        ,name:'SHIVAM'
        
    })
})

app.get('/help/*',(req,res)=>{
    res.send('Help Article not found')
})

// app.get('',(req,res)=>{
// res.send('<h1>Hello Express!!</h1>')
// });
// app.use('/help',express.static(pathTODir));
// app.get('/help',(req,res)=>{
//     res.send({})
// })
app.get('/data',(req,res)=>{
    res.send({
        name:'Shivam',
        Place:'Nagpur'
    })
})
 app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return  res.send({
            error:'No Address Provided!!'
        })
    }
    const add=req.query.address
    geocode(add,(error,{longitude,latitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forcast(latitude,longitude,(error,{weatherDescription,temperature,feelslike,observationTime,humidity})=>{
            if(error){
               return res.send({
                    error
                })
            }
            res.send({
                location,
                weatherDescription,
                temperature,
                feelslike,
                observationTime,
                input:add,
                humidity
            })
        })
    })
    })
 app.get('/products',(req,res)=>{

    if(!req.query.search){
      return res.send({
            error:'Please provide search term'
        })
    }
     res.send({
         product:[]
     })
 })
 app.get('*',(req,res)=>{
    res.send('Page Not Found')
})
app.listen(port,()=>{
    console.log(`Server is up on port ${port}!!`)
})

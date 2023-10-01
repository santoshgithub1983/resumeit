const mongoose =  require('mongoose')
const url = 'mongodb+srv://santoshadmin:Ubs%401983@mongocluster0.gs6rdav.mongodb.net/smart-resume-builder'
mongoose.connect(url, {useUnifiedTopology:true , useNewUrlParser:true})

const connection = mongoose.connection
connection.on('connected', ()=>{
    console.log('MongoDb connection successful')
})
connection.on('error', (error) =>{
    console.log(error)
})
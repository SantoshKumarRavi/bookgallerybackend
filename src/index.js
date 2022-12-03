const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000
const Router=express.Router()
const user=require("../userdb/usersdb")
const book=require("../userdb/booksdb")
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb+srv://Santhosh:Santhosh@cluster0.mvnhitb.mongodb.net/booksgallery?retryWrites=true&w=majority');
  }
  main().catch(err => console.log(err)).then(()=>console.log("db connected"))



app.use(bodyparser.json())
app.use(bodyparser.urlencoded())
app.use(cors({
  origin: '*'
}));

app.use("/",Router)
Router.post('/signup', (req, res) => {
// console.log("signing up",req.body)
const saveddata = new user(req.body);
saveddata.save(function (err,data) {
  if (err){
    console.log(err)
  }else{
    res.send(JSON.stringify({message:'you are registered'}))
  }
});
})


Router.post('/login', (req, res) => {
  const {name,password}=req.body

  user.find({name:name}, function (err, docs) {
    if (err){
      console.log(err)
    }else{
      if(docs.length==0){
        res.send(JSON.stringify({status:"fail",message:'you are not registered'}))
      }else{

        if(password!==docs[0].password){
          // console.log("pass",password,"pass fetcg", docs[0].password)
          res.send(JSON.stringify({status:"fail",message:'password not matching'}))
        }else{
          res.send(JSON.stringify({status:"success",message:'you are logging in'}))
        }
      }
    }
  });
  })

  Router.post('/books', (req, res) => {
    const savedbooksdata = new book(req.body);
    savedbooksdata.save(function (err,data) {
      if (err){
        console.log(err)
      }else{
        res.send(JSON.stringify({message:'book data is uploaded',bookdata:data}))
      }
    });
    })
    Router.get('/books', (req, res) => {
      book.find({},function (err,data) {
        if (err){
          console.log(err)
        }else{
          res.send(JSON.stringify({message:'book data fetched',bookdata:data}))
        }
      });
      })


    Router.put('/books/:id', (req, res) => {
      const id=(req.params.id)
      const mongooseid=(mongoose.Types.ObjectId(id))

      book.updateOne({_id:mongooseid},req.body, function(err,data){
        console.log(data)
        if(data.modifiedCount!=0){
          res.send(JSON.stringify({message:'you are updated'}))
        }else{
          res.send(JSON.stringify({message:'no match found'}))
        }
      });
      })

      Router.delete('/books/:id', (req, res) => {
        const id=(req.params.id)
      const mongooseid=(mongoose.Types.ObjectId(id))
      book.deleteOne({_id:mongooseid},req.body, function(err,data){
        if(data.deletedCount!=0){
          res.send(JSON.stringify({status:"success",message:'you are deleted'}))
        }else{
          res.send(JSON.stringify({status:"fail",message:'no match found for deletion'}))
        }
      });
        })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

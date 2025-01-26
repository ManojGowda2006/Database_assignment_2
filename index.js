const express = require('express');
const bodyParser = require('body-parser');
const Data = require('./data.json')
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/books',(req,res) => {
   res.json(Data);
})

app.post('/books',(req,res) => {
  const {book_id,title,author, genre, year,copies} = req.body;
  const New = {
    book_id: book_id,
    title: title,
    author: author,
    genre: genre,
    year: year,
    copies: copies
  }
  Data.push(New)
  res.json(New);
})

app.get('/books/:id', (req,res) => {
   const id = req.params.id;
   const foundData = Data.find((data) => data.book_id === id);
   res.json(foundData);
})

app.delete('/books/:id', (req,res) => {
  const id = req.params.id;
  const index = Data.find((item)=>item.book_id === id);
  Data.splice(index,1);
  if(index){
    res.json({message: `Book with id ${id} deleted`});
  }else{
    res.json({message: `Book with id ${id} not found`});
  }
})

app.put('/books/:id',(req,res)=>{
  const id = req.params.id;
  const {book_id,title,author,genre,year,copies} = req.body;
  const foundData = Data.find((data) => data.book_id === id);
  if(foundData){
    foundData.title = title;
    foundData.author = author;
    foundData.genre = genre;
    foundData.year = year;
    foundData.copies = copies;
    res.json(foundData);
  }else{
    res.json({message: `Book with id ${id} not found`});
  }
 
})

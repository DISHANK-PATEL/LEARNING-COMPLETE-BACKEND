const express  = require('express');
const mongoose = require('mongoose');
const Person   = require('./models/person');
const MenuItem = require('./models/menu');

const app = express();
app.use(express.json());  // ← parse JSON bodies

mongoose.connect('mongodb://localhost:27017/Hotel', {
  useNewUrlParser:    true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  console.log('Hello Aapka Swagat Hai!');      // Prints in the terminal and not on browser
  res.send('Hello Aapka Swagat Hai!');         // sends that text back to the browser
});

app.post('/person',async (req,res)=>{
    try{
        const data=req.body; // The request body contains the person data
        const newPerson=new Person(data); // Create a new Person document using the Mongoose Model
        
        const response=await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        // Validation or duplicate‐key errors could be inspected here
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/person', async (req, res) => {
  try {
    const people = await Person.find();
    console.log('Data fetched');
    res.status(200).json(people);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/menu',async (req,res)=>{
  try{
    const data=await MenuItem.find();
    console.log('Data fetched');
    res.status(200).json(data);
  }
  catch{
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.post('/menu', async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log('Data saved');
    res.status(200).json(response);
  } 
    catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/person/:workType',async (req,res)=>{
  try{
    const workType=req.params.workType;
    if(workType=='chef' || workType=='manager' || workType=='waiter'){
      const response=await Person.find({work:workType});
      console.log('Response Fetched');
      res.status(200).json(response);
    }
    else{
      res.status(400).json({error:'Invalid Work type'});
    }
  }catch(err){
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
  
app.listen(3000, () => console.log('Server listening on port 3000'));




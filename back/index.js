const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.connect('mongodb+srv://teofilo:9N1tpx6tr8ggR@cluster0.1tmhq.mongodb.net/<dbname>?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true  });
const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/api',require('./routes/index'))

const port = process.env.PORT | 80


app.listen(port);
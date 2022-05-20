const mongoose = require('mongoose');

const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5zsfm.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(DB,{
    useNewUrlParser: true,
    //useCreateIndexes: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
}).then(() => {
    console.log('connection successful');
}).catch((err) =>console.log('no'));
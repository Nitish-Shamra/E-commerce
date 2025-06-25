const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { type } = require('os');
const { ppid } = require('process');
const { log } = require('console');




app.use(express.json())
app.use(cors());

//database connection with mongodb 
mongoose.connect('mongodb://127.0.0.1:27017/E-commerce')
.then(() => console.log('mongodb connected'))
.catch((err) => console.log('not connected', err))

app.get('/', (req, res)=>{
    res.send('hello world')
});

// image storage engine (multer)
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({ storage:storage});

//creating endpoint for upload images 

app.use('/images', express.static('upload/images'))

app.post('/upload',upload.single('product'), (req, res)=>{
  res.json({
    success:1,
    image_url:`http://localhost:${port}/images/${req.file.filename}`
  })
});

// schema 

const Product = mongoose.model('details', {
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    }

});

// for adding new product

app.post('/addproduct', async (req, res) =>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array =products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id +1;
    }
    else{
        id=1;
    }

     // Validate required fields
    if (
        !req.body.name ||
        !req.body.image ||
        !req.body.category ||
        req.body.new_price === undefined ||
        req.body.old_price === undefined
    ) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const product = await Product.create({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
        })
        console.log(product);
        
        console.log('save');
        res.json({
            success: true,
            name:req.body.name,
        })
})

// creating api for deleting product
app.post('/removeproduct', async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id})
    console.log('remove');
    res.json({
        success: true,
        name: req.body.name
    })
});

// creating api for getting all product 
app.get('/allproduct', async (req, res)=>{
    let products = await Product.find({});
    console.log('all product fetched');
    res.send(products);
})

//  schema creating for user
const Users = mongoose.model('Users', {
    name:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type:String,
    },
    cartData:{
        type: Object,
    },
    date:{
        type: Date,
        default: Date.now,
    }
});

// creating api for user registration
app.post('/signup', async (req, res)=>{

    const check = await Users.findOne({email:req.body.email});
    if(check){
        return res.json({success: false, errors: 'Email already exists'});
    }
    let cart = {};
    for (let i = 0; i < 300; i++){
       cart[i]= 0;
    }
    const user = new Users({
      name: req.body.name,
      email:req.body.email,
      password:req.body.password,
      cartData:cart,
    })   

    await user.save();
    const data = {
        user:{
            id:user._id
        }
    }
    const token = jwt.sign(data, 'secret_ecom')
    res.json({success: true, token});
    
});

//create endpint for user login 
app.post('/login', async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const paswordCompare = req.body.password ===user.password;
        if(paswordCompare){
            const data = {
                user:{
                    id: user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom')
            res.json({success:true,token});
           
            }
             else{
                res.json({success:false, errors:'worng passord'});
        }
    }
    else{
        res.json({success:false, errors:'wrong email id'})
    }
});

//creating endpoint for new collection data
app.get('/newcollection', async (req,  res) =>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log('new collection fetched');
    res.send(newcollection);
});

//popular in women section
app.get('/popularinwomen', async (req, res) =>{
    let products = await Product.find({category:'women'})
    let popular_in_women = products.slice(0,4);
    console.log('Popular in women fetched');
    res.send(popular_in_women);
});

//creting middleware to fetch user
const fetchUser = async (req, res, next) =>{
    const token = req.header('auth-token');
    if (!token){
        res.status(401).send({errors:'please authentication using validation'})
    }
    else{
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
          res.status(401).send({errors:'please authentication using validation'})   
        }
    }
}

//creating endpoint for adding products un cart
app.post('/addtocart', fetchUser ,  async (req, res)=>{
    console.log('added', req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findByIdAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send('Added');
});

//create endpoint for removing product from cart
app.post('/removefromcart', fetchUser, async (req, res)=>{
    console.log('removed', req.body.itemId);
     let userData = await Users.findOne({_id:req.user.id});
     if( userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findByIdAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send('removed');
} );

//creating endpoint to get cart data
app.post('/getcart', fetchUser, async (req, res)=>{
    console.log("getCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})


app.listen(port, ()=>{
    console.log(`app is running on port ${port}`);
});
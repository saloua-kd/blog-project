const express = require ('express');
const app = express();
const PORT = process.env.PORT || 7000
const axios = require ('axios')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const {createBlog, getBlogs, deleteBlog, editBlog, updateBlog} = require ('./controllers/blog')
// const {getUser} = require ('./controllers/user')
const multer = require('multer')
const session = require ('express-session')
const secret = 'xoxoxo'



// Set up Multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

// Set EJS as the view engine
app.set('view engine', 'ejs');


// Load environment variables from .env
dotenv.config();


//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(express.static('public'))

app.use(
  session({
      secret: secret,
      resave: false,
      saveUninitialized: true,
  })
);


const logger = (req,res,next) => {
  
  // Verify the JWT token from the cookie
  const token = req.cookies.token;


  if (!token) {
    return res.redirect('/register');
  }

// Inside the logger middleware
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) {
    console.error('JWT verification failed:', err);
    return res.redirect('/login');
  }

  // Set the user object in the request
  req.user = {
    email: decoded.email,
    avatar: decoded.avatar,
    id: decoded.user_id,
  };

  // If the token is valid, continue with the request
  next();
})
};


//login & register endpoint

app.get('/register', (req, res) => {
  const token = req.cookies.token;
  if (token) {
    return res.redirect('/dashboard');
  }

  res.render('loginRegister');
});



app.post('/register',upload.single('avatar'),(req,res)=>{
  const {username,password,email} = req.body
  const avatar = req.file

  const newUser = {
      username: username,
      password: password,
      email: email,
      image: avatar.filename,
  };

  axios.post('http://localhost:3000/users',newUser)
  res.redirect('/dashboard')
})



app.get('/login', (req, res) => {
  const token = req.cookies.token;
  if (token) {
    return res.redirect('/dashboard');
  }

  res.render('loginRegister');
});



app.post('/login', async (req, res) => {
  const { email, password } = req.body;

    const users = await axios.get('http://localhost:3000/users')
    const user = await users.data.find((u) => u.email === email && u.password === password);


  // const user = await getUser(email,password)

  if (user) {
    // Generate a JWT token upon successful login
    const token = jwt.sign({ user : user }, process.env.JWT_SECRET)


    res.cookie('token', token);

    res.redirect('/dashboard');
  } else {
    res.send('Invalid email or password');
  }
});




app.get('/dashboard',logger, getBlogs);


app.get('/logout', (req, res) => {

  res.clearCookie('token');
  res.redirect('/login');
});


app.post ('/edit/:id', updateBlog)

app.post('/createblog',upload.single('image'), createBlog)


app.get('/allBlogs',getBlogs)

  
app.delete('/delete/:id', deleteBlog)

app.get('/edit/:id', editBlog)



//render is only for pages in 'views' folder

app.use((req,res,next) => {
    res.sendFile(__dirname + '/public/html/404.html')
});
      
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });


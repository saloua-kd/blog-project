const express = require ('express');
const app = express();
const PORT = process.env.PORT || 7000
const axios = require ('axios')
const {createBlog, getBlogs} = require ('./controllers/blog')
const multer = require('multer')



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


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs');
app.use(express.static('public'))



// add blog endpoint

app.get('/addBlog',(req,res) => {
    res.render('addBlog')
})

app.post('/createblog',upload.single('avatar'), createBlog)


app.get('/allBlogs', getBlogs)




  

//render is only for pages in 'views' folder

app.use((req,res,next) => {
    res.sendFile(__dirname + '/public/html/404.html')
});
      
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });


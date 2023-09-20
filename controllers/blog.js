const axios = require("axios");
// const {Add_Blog} = require('..api/blogApi')

exports.createBlog = async (req, res) => {
  const { title, description, author } = req.body;
  console.log(req.user)
  
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const filename = req.file.filename;
  const user = req.user;

  if (!user) {
    return res.status(401).send('Unauthorized');
  }

  const newBlog = {
    title_blog: title,
    description_blog: description,
    author_blog: author,
    image_blog: filename,
    user_id: user.id,
  };

  try {
    await axios.post('http://localhost:3000/blogs', newBlog);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};


exports.getBlogs = async (req, res) => {
  console.log('user',req.user)
  const user = req.user; // Get the user info from the request

  // Fetch blogs associated with the logged-in user
  try {
    const api =await axios.get('http://localhost:3000/blogs')
  const userBlogs = await api.data
  const blogs = userBlogs.filter(b => b.user_id == req.user.id)
  console.log(blogs)
    
    
    console.log('email:', user.email);
    console.log('username:', user.username);

    
    // Render the dashboard with blogs
    res.render('dashboard', { blogs, email: user.email, username: user.username, avatar: user.avatar });

  } catch (error) {
    console.error('Error fetching blogs:', error);
    
    // Handle the error and render an error page or send an error response
    res.status(500).send('Internal server error');
  }
};




exports.deleteBlog = async (req, res) => {
  const id = req.params.id;
  axios
    .delete("http://localhost:3000/blogs" + id)
    .then(() => {
      return res.status(204).send("delete worked");
    })
    .catch(() => {
      return res.status(500).send("server problem");
    });
};

exports.editBlog = async (req, res) => {
  const id = req.params.id;
  const api = await axios.delete("http://localhost:3000/blogs" + id);
  const blog = await api.data;

  res.render("edit", { blog });
};

exports.updateBlog = async (req, res) => {
  const id = req.params.id;
  const api = await axios.get("http://localhost:3000/blogs" + id);
  const blog = await api.data;

  const updateBlog = {
    title_Blog: req.body.title_blog,
    description_Blog: req.body.description_blog,
    author_Blog: req.body.author_blog,
    image_blog: req.file ? req.file.filename : blog.image_blog,
  };

  // axios.patch("http://localhost:3000/blogs" + id, updateBlog).then(() => {
  //   res.redirect("/allBlogs");
  // });
};

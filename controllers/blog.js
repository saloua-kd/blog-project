const axios = require('axios')
// const {Add_Blog} = require('..api/blogApi')

exports.createBlog = (req,res) => {
    // console.log(req.body)
    // console.log(req.file)

    const {title,description,author} = req.body
    const filename = req.file.filename

    const newBlog = {
        title_blog:title,
        description_blog:description,
        author_blog:author,
        image_blog: filename
    }


    // res.send(JSON.stringify(req.body))
    // res.status(200).send('data success')

    axios.post('http://localhost:3000/blogs', newBlog)
    return res.redirect('/allblogs')
    // res.end()
}

exports.getBlogs = async (req,res) => {
    const fetchBlog = await axios.get('http://localhost:3000/blogs')
    const blogs = await fetchBlog.data
    res.render('allBlogs',{blogs})
    res.end()
}
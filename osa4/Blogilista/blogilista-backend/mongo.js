const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://testinen123:${password}@cluster0.erk2j.mongodb.net/blogpost?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: 'An interesting title',
    author: 'Rauno Repomies',
    url: 'www.blogpost.org',
    likes: 5
})

blog.save().then(response => {
    console.log('Blog post saved!')
    mongoose.connection.close()
})
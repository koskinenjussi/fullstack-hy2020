const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let totalLikes = 0

  blogs.forEach(blog => {
    totalLikes += blog.likes
  })

  return totalLikes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 'No blogs given'
  }

  let mostPopular = blogs[0]
  for (let i = 0; i < blogs.length; i++) {
    if (mostPopular.likes < blogs[i].likes) {
      mostPopular = blogs[i]
    }
  }

  const mostPopularBlog = 
  {
    title: mostPopular.title,
    author: mostPopular.author,
    likes: mostPopular.likes
  }

  return mostPopularBlog
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return "No blogs given"
  }
  
  const authors = []
  let authorIndex = 0

  for (let i = 0; i < blogs.length; i++) {
    //Author is not on the list yet
    if (authors.filter(author => author.author == blogs[i].author).length === 0) { 
      const author = 
      {
        author: blogs[i].author,
        blogs: 1
      }

      authors[authorIndex] = author
      authorIndex++
    } else { 
      //Author is on the list => raise blogs amount by one
      for (let j = 0; j < authors.length; j++) {
        if (authors[j].author === blogs[i].author) {
          authors[j].blogs++
          break
        }
      }
    }
  }

  //Finding the author with most blog posts
  let mostBlogsAuthor =
  {
    author: authors[0].author,
    blogs: authors[0].blogs
  }

  for (let i = 0; i < authors.length; i++) {
    if (mostBlogsAuthor.blogs < authors[i].blogs) {
      mostBlogsAuthor = authors[i]
    }
  }

  return mostBlogsAuthor
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return ("No blogs given")
  }

  const authors = []
  let authorIndex = 0

  for (let i = 0; i < blogs.length; i++) {
    //Author is not on the list yet
    if (authors.filter(author => author.author == blogs[i].author).length === 0) { 
      const author = 
      {
        author: blogs[i].author,
        likes: blogs[i].likes
      }

      authors[authorIndex] = author
      authorIndex++
    } else { 
      //Author is on the list => raise the likes amount
      for (let j = 0; j < authors.length; j++) {
        if (authors[j].author == blogs[i].author) {
          authors[j].likes += blogs[i].likes
          break
        }
      }
    }
  }

  //Finding the author with most blog posts
  let mostLikesAuthor =
  {
    author: authors[0].author,
    likes: authors[0].likes
  }

  for (let i = 0; i < authors.length; i++) {
    if (mostLikesAuthor.likes < authors[i].likes) {
      mostLikesAuthor = authors[i]
    }
  }

  return mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
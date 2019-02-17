const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) =>
    blogs.reduce((sum, blog) => sum += blog.likes, 0)


const favoriteBlog = (blogs) =>
    blogs.reduce((fav, blog) => {
        return blog.likes > fav.likes ? blog : fav
    }, { likes: -1 })


module.exports = {
    favoriteBlog,
    totalLikes,
    dummy
}
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body

    const user = await User.findById(body.userId)

    const blog = new Blog({ body, user: user._id })

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const blogi = await blog.save()
        user.blogs = user.blogs.concat(savedNote._id)
        await user.save()
        response.status(201).json(blogi)
    } catch (exception) {
        next(exception)
    }


})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (expection) {
        next(exception)
    }
})

module.exports = blogRouter
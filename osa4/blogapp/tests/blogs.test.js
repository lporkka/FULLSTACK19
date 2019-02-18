const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const blogs = require('./data')
const User = require('../models/user')


beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObjects = blogs.map(b => new Blog(b))
    blogObjects = blogObjects.map(b => b.save())
    await Promise.all(blogObjects)
})

const api = supertest(app)
describe('blogitestausta', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are 6 blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(6)
    })

    test('Returned blog field is "id"', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => expect(blog).toBeDefined())
    })

    test('post toimii', async () => {
        const newBlog = {
            _id: "5a422a851b54a676234d16f7",
            title: "Laurin Blogi",
            author: "Lauri Porkka",
            url: "asdadadasd",
            likes: 10,
            __v: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(7)
    })

    test('poisto', async () => {
        const id = "5a422a851b54a676234d17f7"
        await api
            .delete(`/api/blogs/${id}`)
            .expect(204)

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(5)
    })
})

describe('when there is initially one user at db', async () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}


afterAll(() => {
    mongoose.connection.close()
})
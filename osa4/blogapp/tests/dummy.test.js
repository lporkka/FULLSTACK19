const listHelper = require('../utils/list_helper')
const blogs = require('./data')

describe('total likes', () => {

    test('allBlogs equals 36', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })

    test('noblogs equals 0', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
})

describe('favorite blog', () => {

    test('favBlog equals Canonical string reduction', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[2])
    })
})


test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})
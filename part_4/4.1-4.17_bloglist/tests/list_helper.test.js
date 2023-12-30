const listHelper = require('../utils/list_helper')
const testBlogs = require('./testBlogs.json')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const listWithTwoBlogs = listWithOneBlog.concat(
    {
      title: 'Santa Claus\' blog',
      author: 'Santa Claus',
      url: 'https://www.fatherchristmas.dev',
      likes: 44,
      _id: '657ed422389817f4f72d8bd1',
      __v: 0
    }
  )

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has two blogs, equals the sum of the likes', () => {
    const result = listHelper.totalLikes(listWithTwoBlogs)
    expect(result).toBe(49)
  })
  test('when list is empty, returns zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})

describe('favorite blog', () => {
  const blogList = [
    {
      _id: '657cc434294d5704a764d758',
      title: 'Le tact de la trotteuse...',
      author: 'L\'horlogère suisse',
      url: 'https://www.latchaux.ch',
      likes: 23,
      __v: 0
    },
    {
      _id: '657cc467294d5704a764d75a',
      title: 'Au fil de ma plume',
      author: 'Ecrivain du dimanche',
      url: 'https://www.poidsdeplumes.fr',
      likes: 90,
      __v: 0
    },
    {
      _id: '657ed422389817f4f72d8bd1',
      title: 'Santa Claus\' blog',
      author: 'Santa Claus',
      url: 'https://www.fatherchristmas.dev',
      likes: 44,
      __v: 0
    }
  ]
  test('returns blog with most likes', () => {
    const favoriteBlog = listHelper.favoriteBlog(blogList)
    expect(favoriteBlog).toEqual({
      title: 'Au fil de ma plume',
      author: 'Ecrivain du dimanche',
      url: 'https://www.poidsdeplumes.fr'
    })
  })

  describe('most prolifc author', () => {
    const blogList = testBlogs
    test('returns author with most blogs', () => {
      const mostProlificAuthor = listHelper.mostBlogs(blogList)
      expect(mostProlificAuthor).toEqual({
        author: 'Harry Potter',
        blogs: 3
      })
    })
  })

  describe('most popular author', () => {
    const blogList = testBlogs
    test('returns most popular author name with likes', () => {
      const mostPopularAuthor = listHelper.mostLikes(blogList)
      expect(mostPopularAuthor).toEqual({
        author: 'Ecrivain du dimanche',
        likes: 91
      })
    })
  })
})

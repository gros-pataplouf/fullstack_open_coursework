import blogsService from '../services/blogs'
import Notification from './Notification'


const AddBlog = ({props}) => {
    const {newBlog, setNewBlog, token, setBlogs, message, setMessage} = props
    const handleNewBlog = async (e) => {
        console.log('handling a new blog', newBlog)
        e.preventDefault()
        try {
            const addedBlog = await blogsService.create(newBlog, token)
            await blogsService.getAll().then(blogs =>
                setBlogs( blogs )
              )
              setMessage({type: 'info', text: `${addedBlog.title} by ${addedBlog.author} has been added successfully!`})
              setTimeout(() => {
                setMessage({type: '', text: ''})
              }, 2000)
      
            setNewBlog({author: '', title: '', url: ''})

    } catch (e) {
        console.error(e)

        setMessage({type: 'warning', text: e.response.data.error})
        setTimeout(() => {
          setMessage({type: '', text: ''})
        }, 2000)
    }
}

const handleChange = (property) => (e) => {
    setNewBlog({...newBlog, [property]: e.target.value})
  }
    
    return <div>
        <h1>add a new blog</h1>
        {message.text && <Notification message={message}/>}
        <form onSubmit={handleNewBlog}>
            <input type='text' name='title' id='title' placeholder='title'  value={newBlog.title} onChange={handleChange('title')} />
            <label htmlFor='title'>title</label>
            <input type='text' name='author' id='author' placeholder='author' value={newBlog.author} onChange={handleChange('author')}/>
            <label htmlFor='author'>author
            </label>
            <input type='url' name='url' placeholder='url' value={newBlog.url} id='url'onChange={handleChange('url')} />
            <label htmlFor='url'>url</label>
            <button>create</button>
        </form>
    </div>   
}

export default AddBlog
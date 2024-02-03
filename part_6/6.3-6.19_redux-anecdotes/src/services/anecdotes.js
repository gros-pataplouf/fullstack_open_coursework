import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


const getAll = async () => {
    const anecdotes = await axios.get(baseUrl)
    return anecdotes
}

const create = async (anecdoteText) => {
    const anecdote = await axios.post(baseUrl, {content: anecdoteText, votes: 0, id: (100000 * Math.random()).toFixed(0)})
    return anecdote
}

const upvote = async (id) => {
    console.log(id)
    const anecdotes = await axios.get(baseUrl)
    console.log(anecdotes)
    const anecdoteToUpvote = anecdotes.data.find(anecdote => anecdote.id === id)
    const newVotes = anecdoteToUpvote.votes + 1
    await axios.put(`${baseUrl}/${id}`, {...anecdoteToUpvote, votes: newVotes})
    
}

export const anecdotesService = { getAll, create, upvote }
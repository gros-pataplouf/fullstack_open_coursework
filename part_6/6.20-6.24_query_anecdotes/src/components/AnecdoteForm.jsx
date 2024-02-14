import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../../requests/anecdotes"
import { useNotificationDispatch } from "../AppContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }, 
    onError: (error) => {
      notificationDispatch({type: 'ERROR', payload: error.response.data.error})
      setTimeout(() => {
        notificationDispatch({type: 'TIMEOUT'})
      }, 5000)
  }})

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    createAnecdoteMutation.mutate(content)
    notificationDispatch({type: 'CREATE', payload: content})
    setTimeout(() => {
      notificationDispatch({type: 'TIMEOUT'})
    }, 5000)
    event.target.anecdote.value = ''
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

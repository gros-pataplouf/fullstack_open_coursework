import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, voteAnecdote } from '../requests/anecdotes'
import { useNotificationDispatch } from './AppContext'

const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']).map(elt => elt.id === anecdote.id ? {...elt, votes: elt.votes + 1}: elt )
      queryClient.setQueryData(['anecdotes'], anecdotes)
  }})

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote)
    notificationDispatch({type: 'VOTE', payload: anecdote.content})
    setTimeout(() => {
      notificationDispatch({type: 'TIMEOUT'})
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
    
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if (result.isError) { 
    return <div>Anecdotes serivce not available due to problems in server...</div>
  }

  const anecdotes = result.data

  return (
    <>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App

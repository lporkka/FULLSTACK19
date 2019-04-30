import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        const message = 'You created "' + content + '"'
        props.createAnecdote(content)
        props.setNotification(message)
        setTimeout(() => {
            props.removeNotification()
        }, 5000)
        event.target.anecdote.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    // joskus on hyödyllistä tulostaa mapStateToProps:ista...
    console.log(state)
    return {
        notification: state.notification,
        anecdotes: state.anecdotes
    }
}

const mapDispatchToProps = {
    createAnecdote,
    setNotification,
    removeNotification
}

const ConnectedAnecdoteForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
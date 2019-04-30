import React from 'react'
import { createVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteList = (props) => {
	const anecdotes = props.anecdotes

	const vote = (id) => {
		console.log('vote', id)
		props.createVote(id)
		const message = 'You voted "' + anecdotes.find(a => a.id === id).content + '"'
		props.setNotification(message)
		setTimeout(() => {
			props.removeNotification()
		}, 5000)
	}

	return (
		<div>
			{props.visibleAnecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			)
			}
		</div>
	)
}

const anecdotesToShow = ({ anecdotes, filter }) => {
	return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
}



const mapStateToProps = (state) => {
	// joskus on hyödyllistä tulostaa mapStateToProps:ista...
	console.log(state)
	return {
		visibleAnecdotes: anecdotesToShow(state),
		notification: state.notification,
		anecdotes: state.anecdotes
	}
}

const mapDispatchToProps = {
	createVote,
	setNotification,
	removeNotification
}

const ConnectedAnecdoteList = connect(
	mapStateToProps,
	mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
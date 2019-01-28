import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    const { good, neutral, bad } = props
    const yht = good + neutral + bad
    const ka = (good + bad * (-1)) / (yht)
    const pos = (good / (yht)) * 100
    if (yht !== 0) {
        return (
            <>
                <Statistic text="hyvä" value={good} />
                <Statistic text="neutraali" value={neutral} />
                <Statistic text="huono" value={bad} />
                <Statistic text="yhteensä" value={yht} />
                <Statistic text="keskiarvo" value={ka} />
                <Statistic text="positiivisia" value={pos} loppu="%" />
            </>
        )
    } else {
        return (
            <>
                <p>Ei yhtään palautetta annettu</p>
            </>
        )
    }
}

const Statistic = ({ text, value, loppu }) => (
    <>
        <p>{text} {value} {loppu}</p>
    </>
)

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const increaseGoodByOne = () => setGood(good + 1)
    const increaseNeutralByOne = () => setNeutral(neutral + 1)
    const increaseBadByOne = () => setBad(bad + 1)

    return (
        <div>
            <h1>anna palautetta</h1>
            <Button handleClick={increaseGoodByOne} text="hyvä" />
            <Button handleClick={increaseNeutralByOne} text="neutraali" />
            <Button handleClick={increaseBadByOne} text="huono" />
            <h1>statistiikka</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
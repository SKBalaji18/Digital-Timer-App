import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isRunning: false,
    timerInSec: 0,
    timerInMinutes: 25,
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  onIncrementSec = () => {
    const {isRunning, timerInSec, timerInMinutes} = this.state
    const timeCompleted = timerInSec === timerInMinutes * 60

    if (timeCompleted) {
      clearInterval(this.intervalId)
      this.setState({isRunning: false})
    } else {
      this.setState(prevState => ({timerInSec: prevState.timerInSec + 1}))
    }
  }

  onReset = () => {
    clearInterval(this.intervalId)
    this.setState({timerInSec: 0})
  }

  startOrPause = () => {
    const {isRunning, timerInSec, timerInMinutes} = this.state
    const timeCompleted = timerInSec === timerInMinutes * 60

    if (timeCompleted) {
      this.setState({timerInSec: 0})
    }
    if (isRunning) {
      clearInterval(this.intervalId)
    } else {
      this.intervalId = setInterval(this.onIncrementSec, 1000)
    }

    this.setState(prevState => ({isRunning: !prevState.isRunning}))
  }

  onMinLimitIncrement = () => {
    this.setState(prevState => ({timerInMinutes: prevState.timerInMinutes + 1}))
  }

  onMinLimitDecrement = () => {
    const {timerInMinutes} = this.state
    if (timerInMinutes > 1) {
      this.setState(prevState => ({
        timerInMinutes: prevState.timerInMinutes - 1,
      }))
    }
  }

  getTime = () => {
    const {timerInSec, timerInMinutes} = this.state
    const remainingSec = timerInMinutes * 60 - timerInSec

    const seconds = Math.floor(remainingSec % 60)
    const minutes = Math.floor(remainingSec / 60)

    const stringifiedSec = seconds > 9 ? seconds : `0${seconds}`
    const stringifiedMin = minutes > 9 ? minutes : `0${minutes}`

    return `${stringifiedMin}:${stringifiedSec}`
  }

  render() {
    const {isRunning, timerInMinutes} = this.state
    const timer = this.getTime()
    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="outside-container">
          <div className="timer-bg-container">
            <div className="timer-container">
              <h1 className="timer-value">{timer}</h1>
              <p className="timer-status">{isRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="app-function-container">
            <div className="buttons-container">
              <div className="btn-lablel-container">
                <button type="button" onClick={this.startOrPause}>
                  {isRunning ? (
                    <img
                      className="btn-img"
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      alt="pause icon"
                    />
                  ) : (
                    <img
                      className="btn-img"
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      alt="play icon"
                    />
                  )}
                  <p className="action-status">
                    {isRunning ? 'Pause' : 'Start'}
                  </p>
                </button>
              </div>
              <div>
                <button
                  className="btn-lablel-container"
                  type="button"
                  onClick={this.onReset}
                >
                  <img
                    className="btn-img"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  <p className="action-status">Reset</p>
                </button>
              </div>
            </div>
            <p className="adjustments-instruction ">Set Timer Limit</p>
            <div className="adjustment-container">
              <button
                type="button"
                disabled={isRunning}
                onClick={this.onMinLimitDecrement}
                className="adjustments"
              >
                -
              </button>
              <p className="time-limit">{timerInMinutes}</p>
              <button
                type="button"
                disabled={isRunning}
                onClick={this.onMinLimitIncrement}
                className="adjustments"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer

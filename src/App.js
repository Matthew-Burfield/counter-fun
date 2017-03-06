import React, { Component } from 'react';
import './App.css';

const getCountValue = (firstCount, secondCount, thirdCount) => {
  if (firstCount > 0) {
    return firstCount;
  } else if (secondCount > 0) {
    return secondCount;
  } else if (thirdCount > 0) {
    return thirdCount;
  }
  return '';
}

const getBackgroundColor = (isCounting, firstCount, secondCount, thirdCount) => {
  if (!isCounting) {
    return 'green';
  } else if (firstCount > 0) {
    return 'yellow';
  } else if (secondCount > 0) {
    return 'orange';
  } else if (thirdCount > 0) {
    return 'red';
  }
  return 'white';
}

const Counter = ({
  firstCount,
  secondCount,
  thirdCount,
  numCounts,
  isCounting,
  arrVal,
  handleClick,
}) => {
  const style = {
    margin: 40,
    padding: 40,
    borderStyle: 'solid',
    borderColor: 'black',
  }
  style.backgroundColor = getBackgroundColor(isCounting, firstCount, secondCount, thirdCount);
  const countVal = getCountValue(firstCount, secondCount, thirdCount);

  return(
    <a style={style} onClick={() => handleClick(arrVal)}>
      <p>Num Counts: {numCounts}</p>
      <p><b>{countVal}</b></p>
    </a>
  );
}

class CounterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {numCounts: 0, secondCount: 30, thirdCount: 30},
        {numCounts: 0, firstCount: 5, secondCount: 30, thirdCount: 30},
        {numCounts: 0, firstCount: 10, secondCount: 30, thirdCount: 30},
        {numCounts: 0, thirdCount: 60},
        {numCounts: 0, thirdCount: 90},
        {numCounts: 0, secondCount: 30, thirdCount: 30},
      ],
    }
    this.tick = this.tick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addNewCounter = this.addNewCounter.bind(this);
  }

  tick(arrVal) {
    const newState = Object.assign({}, this.state);
    const currCounter = newState.data[arrVal];
    if (currCounter.thirdCountVal <= 0) {
      clearInterval(currCounter.interval);
      delete currCounter.interval;
      delete currCounter.firstCountVal;
      delete currCounter.secondCountVal;
      delete currCounter.thirdCountVal;
      this.setState(
        newState,
      );
    } else {
      if (currCounter.firstCountVal > 0) {
        currCounter.firstCountVal -= 1;
      } else if (currCounter.secondCountVal > 0) {
        currCounter.secondCountVal -= 1;
      } else if (currCounter.thirdCountVal > 0) {
        currCounter.thirdCountVal -= 1;
      }
      this.setState(
        newState,
      );
    }
  }

  handleClick(e) {
    if (!this.state.data[e].interval) {
      const interval = setInterval(() => this.tick(e), 1000);
      const newState = Object.assign({}, this.state);
      const currCounter = newState.data[e];
      currCounter.interval = interval;
      currCounter.numCounts += 1;
      if (currCounter.hasOwnProperty('firstCount')) {
        currCounter.firstCountVal = currCounter.firstCount;
      }
      if (currCounter.hasOwnProperty('secondCount')) {
        currCounter.secondCountVal = currCounter.secondCount;
      }
      if (currCounter.hasOwnProperty('thirdCount')) {
        currCounter.thirdCountVal = currCounter.thirdCount;
      }
      this.setState(
        newState,
      );
    }
  }

  addNewCounter() {
    const newState = Object.assign({}, this.state);
    newState.data.push({numCounts: 0, firstCount: 30, secondCount: 30, thirdCount: 30});
    this.setState(
      newState,
    );
  }

  render() {
    return (
      <div className="counter-container">
        <button
          onClick={this.addNewCounter}
        >Add New Counter
        </button>
        <div id="counter-list" style={{ marginTop: 50, display: 'flex', flexFlow: 'row wrap' }}>
          {this.state.data.map((item, index) => {
            return (
              <Counter
                key={index}
                firstCount={item.firstCountVal}
                secondCount={item.secondCountVal}
                thirdCount={item.thirdCountVal}
                numCounts={item.numCounts}
                isCounting={item.interval ? true : false}
                arrVal={index}
                handleClick={this.handleClick}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <CounterList />
      </div>
    );
  }
}

export default App;

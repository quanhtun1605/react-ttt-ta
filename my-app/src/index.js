import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function calculateWinner(squares){
  const line = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [0, 3, 6],
    [2, 5, 8]
  ];
  for(let i=0; i<line.length; i++){
    const[a, b, c] = line[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

class Game extends React.Component{
  constructor(){
    super();
    this.state = {
      squares: Array(9).fill(null),
      isNext : true,
      step   : 0,
    };
  }
  handleClick(i){
    const squares = this.state.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.isNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      isNext : !this.state.isNext,
      step   : this.state.step + 1,
    });
  }
  render(){
    const squares = this.state.squares.slice();
    const winner = calculateWinner(squares);
    var status;
      if (winner){
        status = "Winner is: " + winner;
      }
      else if(this.state.step === 9){
        status = "No one win";
      }
      else{
        status = (this.state.isNext ? 'X' : 'O') + "'s player turn";
      }
    return (
      <div>
        <div class = "game"> <Board squares = {this.state.squares} onClick = {i => this.handleClick(i)}/> </div>
        <p> {status} </p>
      </div>
      );
  }
}

class Board extends React.Component{
  renderSquare(i){
    return <Square value = {this.props.squares[i]} onClick = {() => this.props.onClick(i)}/>
  }
  renderAllSquares(){
    const matrixSize = Math.sqrt(this.props.squares.length);
    const board      = Array(matrixSize).fill(null);
    for(let i=0; i<matrixSize; i++){
      const squares = Array(matrixSize).fill(null);
      for(let j=0; j<matrixSize; j++){
        var squareKey = i*matrixSize + j;
        squares.push(<span key = {squareKey}>{this.renderSquare(squareKey)}</span>);
      }
      board.push(<div key={i}> {squares} </div>);
    }
    return board;
  }
  render(){
    return (
      <div>
        <div> {this.renderAllSquares()} </div>
      </div>
      );
  }
}

class Square extends React.Component{
  render(){
    return (
      <button className="square" onClick={this.props.onClick}>{this.props.value}</button>
      );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
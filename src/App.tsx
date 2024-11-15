import { useEffect, useState } from 'react';
import UserInput from './components/userInput/userInput.component';
import './App.css';
import Maze from './components/maze/maze.component';
import { dfs, generateMaze, bfs } from './Util/mazeUtils';
import Controls from './components/controls/controls.components';



 const App = () => {
  //keep state of the original map for resetting
  const [ogMaze, setOgMaze] = useState<string[][]>([])
  //main maze map
  const [maze, setMaze] = useState<string[][]>([])
  //size of the maze
  const [mazeSize, setMazeSize] = useState({
    input1: '',
  })
  //keep track of timing of eation operation
  const [timeOutIds, setTimeOutIds] = useState<NodeJS.Timeout[]>([])
  //keep track if a previous oepration is running
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const height = Number(mazeSize.input1)
  const width = Number(mazeSize.input1)

  useEffect(() =>{
    console.log(maze)
  }, [maze])
 
 const stopCurrentOperation = () => {
  timeOutIds.forEach((id) => clearTimeout(id))
  setTimeOutIds([])
 }

  const handleMazeSizeChange = (updatedData: {input1: string}) => {
    setMazeSize(updatedData)
  }
  
  const mapReset = () => {
    // Reset the maze's visited cells to unvisited
    console.log("resetting")
    setMaze([...ogMaze])
  };
  
  //function to handle maze Generation
  const handleGenerateMaze = () =>{

    if(mazeSize.input1.trim() === ''){
      alert("Invalid Input: do not leave empty")
      return
    }
    if (isNaN(height) || isNaN(width)){
      alert("Invalid input: Both X and Y must be valid numbers")
      return //input control for the right type
    }

    if(height < 10  || height > 25 || width < 10 || width > 25){
      alert("Please enter a size between 10 and 25")
      return
    }

    const generatedMaze = generateMaze(height, width, timeOutIds, setTimeOutIds)
    //setting map to both maze and OG maze
    setOgMaze(generatedMaze)
    setMaze(generatedMaze)
  }

  //function to handle dfs onClick trigger
  const handleBfsTrigger = () =>{
    if(maze.length === 0){
      alert("Generate a Maze")
      return
    }
    //checking to see if an operation is running
    if(isRunning){
      //stopping that operation
      stopCurrentOperation()
    }

    //set isRunning to true
    setIsRunning(true)
    //resetting map to original map
    mapReset()

    const start: [number, number] = [1, 0]
    bfs(start, height, width, maze, setMaze, setTimeOutIds)
    
  }

  const handleDfsTrigger = () => {
    if(maze.length === 0){
      alert("Generate a Maze")
      return
    }
    //checking to see if an operation is running
      if(isRunning){
      //stopping that operation
      stopCurrentOperation()
    }

    //set isRunning to true
    setIsRunning(true)
    //resetting map to original map
    mapReset()

    const start: [number, number] = [1, 0]
    dfs(start, height, width, maze, setMaze, setTimeOutIds)
  }

  return (
    <div className='maze-grid'>
      <Controls onGeneratemaze={handleGenerateMaze} onDfsTrigger={handleDfsTrigger} onBfsTrigger={handleBfsTrigger}/>     
      <UserInput onChange={handleMazeSizeChange} />
      <Maze maze={maze}/>
    </div>  
  );
}

export default App;

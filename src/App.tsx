import { Stack } from '@mui/material';
import { useState } from 'react';
import UserInput from './components/userInput/userInput.component';
import './App.css';
import Button  from '@mui/material/Button';



 const App = () => {
  const [maze, setMaze] = useState<string[][]>([])
  const [mazeSize, setMazeSize] = useState({
    input1: '',
  })
  const [timeOutIds, setTimeOutIds] = useState<NodeJS.Timeout[]>([])

  const height = Number(mazeSize.input1)
  const width = Number(mazeSize.input1)
 
 
  const handleMazeSizeChange = (newMazeData: {input1: string}) => {
    setMazeSize(newMazeData)
  }

  //util function for async delay
  

  //breadth search algo
  function bfs(startNode: [number, number]): boolean{
    //initialize two varibles queue and visited
    let queue = [startNode]
    let visited = new Set<string>()
    visited.add(`${startNode[0]},${startNode[1]}`)


    function visitCell([x, y]: [number, number]):boolean{
      //set visited cell and new color by setting a newState for the maze
      setMaze((prevmaze) => 
        //get the row from the maze
        prevmaze.map((row, rowIndex) =>
        //get the cells for each row
        row.map((cell, cellIndex) => {
          //if the cell is equal to the end node, return as is otherwise change the cell to visited
          if(rowIndex === y && cellIndex === x){
            return cell === "end" ? "end" : "visted"
          }
          return cell
        })
      ))


      console.log(x, y)
      if(maze[y][x] === "end"){
        console.log("path found")
        return true
      }
      return false
    }

    //move forward in the path
    function step(): boolean{
      console.log("BFS new step")
      if (queue.length === 0){
        return false
      }

      const currentNode = queue.shift()

      if(currentNode){
        const [x, y] = currentNode //destructure the coordinates

        //check adjacent nodes
        const directions = [
          [0, 1], // move down one on the Y axis
          [1, 0], // move right on the x axis
          [0, -1], //move up on the y axis\
          [-1, 0] // move left on the x-axis
        ] 

        // getting the nodes in all four directions
        for (const [dx, dy] of directions) {
          const newX = x + dx
          const newY = y + dy
          
          //check if newY and newX is within the bounds of the maze
          // add new cell to queue if it has not been visited before
          if(newX >= 0 && newX < width && newY >= 0 && newY < height && !visited.has(`${newX},${newY}`)){
            visited.add(`${newX},${newY}`)
            //check if the cell is aprt of the path or is at the end
            if(maze[newY][newX]=== "path" || maze[newY][newX] === "end"){
              if(visitCell([newX, newY])){
                return true
              }
              queue.push([newX, newY])
            }
          }
        }
      }
    const timeOutID = setTimeout(step, 100)
    setTimeOutIds((prevTimeOutIds) => [...prevTimeOutIds, timeOutID])
    return false
    }

  step()
  console.log("Path not found")
    return false
  }
  
  //DFS fucntion
  function dfs(startNode: [number, number]): boolean{
    //initialize two varibles queue and visited
    let stack = [startNode]
    let visited = new Set<string>()
    visited.add(`${startNode[0]},${startNode[1]}`)

    function visitCell([x, y]: [number, number]):boolean{

      //set visited cell and new color by setting a newState for the maze
      setMaze((prevmaze) => 
        //get the row from the maze
        prevmaze.map((row, rowIndex) =>
        //get the cells for each row
        row.map((cell, cellIndex) => {
          //if the cell is equal to the end node, return as is otherwise change the cell to visited
          if(rowIndex === y && cellIndex === x){
            return cell === "end" ? "end" : "visted"
          }
          return cell
        })
      ))

      console.log(x, y)
      if(maze[y][x] === "end"){
        console.log("path found")
        return true
      }
      return false
    }

    function step(): boolean{
      if (stack.length === 0){
        return false
      }

      const currentNode = stack.pop()
      console.log("dfs new step")

      if(currentNode){
        const [x, y] = currentNode //destructure the coordinates

        //check adjacent nodes
        const directions = [
          [0, 1], // move down one on the Y axis
          [1, 0], // move right on the x axis
          [0, -1], //move up on the y axis\
          [-1, 0] // move left on the x-axis
        ] 

        // getting the nodes in all four directions
        for (const [dx, dy] of directions) {
          const newX = x + dx
          const newY = y + dy
          
          //check if newY and newX is within the bounds of the maze
          // add new cell to queue if it has not been visited before
          if(newX >= 0 && newX < width && newY >= 0 && newY < height && !visited.has(`${newX},${newY}`)){
            visited.add(`${newX},${newY}`)
            //check if the cell is aprt of the path or is at the end
            if(maze[newY][newX]=== "path" || maze[newY][newX] === "end"){
              if(visitCell([newX, newY])){
                return true
              }
              stack.push([newX, newY])
            }
          }
        }
      }

      //set timeout IDs to the delay function
      const timeOutID = setTimeout(step, 100)
      setTimeOutIds((prevTimeOutIds) => [...prevTimeOutIds, timeOutID])
      return false
    }
  
    step()
  console.log("Path not found")
    return false
  }
  
  function generateMaze (height: number, width: number): void {
    //clear the timeIds for any setTimeout functions running
    timeOutIds.forEach(clearTimeout)
    //reset timeoutId state to empty
    setTimeOutIds([])

    //initialize the maze as a 2D array to hold rows and column
    let matrix: string[][] = []

    //for loop to assign a row array of cells *either a maze wall or the path to traverse*
    for (let i = 0; i < height; i++){
      let row: string [] = []
      //for loop to set each cell to either a wall or path
      for (let j = 0; j < width; j++){

        //Make the maze all walls
          row.push("wall")
      }
      //push to matrix
      matrix.push(row)
    }
  

    //direction like a dpad of a controller
    const directions = [
      [0, 1], // move down one on the Y axis
      [1, 0], // move right on the x axis
      [0, -1], //move up on the y axis\
      [-1, 0] // move left on the x-axis
    ] 

    function isCellValid(x: number, y: number): boolean {
      //Ensures the cell is within the bounds of the maze
      //Ensures x and y are within the dimensions of the maze
      //last, check if there is a wall
      return x >= 0 && y >= 0 && x < width && y < height  && matrix[y][x] === "wall"
    }

    //a function to create a path within the maze {recursively}
    function carvePath(x: number, y: number): void{
      matrix[y][x] = "path"

      //use this algo to random swap directions within the direction array to place "path" in any giving direction
      const pathMazeDirections = directions.sort(() => Math.random() - 0.5)

      for (let [dx, dy] of pathMazeDirections){
        const nx = x + dx * 2
        const ny = y + dy * 2

        if(isCellValid(nx, ny)) {
          matrix[y + dy][x + dx] = "path"
          carvePath(nx, ny)
        }
      }
    }

    carvePath(1,1)

    //initialize starting point
    matrix[1][0] = "start"
    //initialize end point
    matrix[height - 2][width - 1] = "end"

    setMaze(matrix)
  }

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

    generateMaze(width, height)
  }

  //function to handle dfs onClick trigger
  const handleBfsTrigger = () =>{
    const start: [number, number] = [1, 0]
    bfs(start)
    
  }

  const handleDfsTrigger = () => {
    const start: [number, number] = [1, 0]
    dfs(start)

  }

  return (
    <div className='maze-grid'>
      <Stack className='buttons' direction='row' spacing={2}>
       <Button className='reset-button' variant='outlined' onClick={handleGenerateMaze}>Refresh</Button>
       <Button variant='outlined' onClick={handleDfsTrigger}>Depth First Search</Button>
       <Button variant='outlined' onClick={handleBfsTrigger}>Breadth First Search</Button>
      </Stack>
      
      <UserInput onChange={handleMazeSizeChange}></UserInput>

      <div className='maze'>
        {
          maze.map((row, rowIndex) => (
            <div key={rowIndex} className='row'>
              {
              row.map((cell, cellIndex) => (
                  <div key={cellIndex} className={`cell ${cell}`}></div>
              ))
              }
            </div>
          ))
        }
      </div>
    </div>  
  );
}

export default App;

import React from "react"

export const generateMaze = (
    height: number, 
    width: number,
    timeOutIds: NodeJS.Timeout[],
    setTimeOutIds: React.Dispatch<React.SetStateAction<NodeJS.Timeout[]>>
): string[][] => {
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

    return matrix
  }

  //DFS fucntion
  export const dfs = (startNode: [number, number],
    height: number,
    width: number,
    maze: string[][],
    setMaze:  React.Dispatch<React.SetStateAction<string[][]>>,
    setTimeOutIds: React.Dispatch<React.SetStateAction<NodeJS.Timeout[]>>
  ): boolean => {
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

          //check if the cell is apart of the path or is at the end
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
      const timeOutID = setTimeout(step, 75)
      setTimeOutIds((prevTimeOutIds) => [...prevTimeOutIds, timeOutID])
      return false
    }
  
  step()
  console.log("Path not found")
  return false
  }

  //breadth search algo
  export const bfs = (startNode: [number, number],
    height: number,
    width: number,
    maze: string[][],
    setMaze:  React.Dispatch<React.SetStateAction<string[][]>>,
    setTimeOutIds: React.Dispatch<React.SetStateAction<NodeJS.Timeout[]>>
  ): boolean => {
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
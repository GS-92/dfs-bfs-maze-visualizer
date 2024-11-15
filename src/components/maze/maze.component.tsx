import React from 'react'
import './maze.styles.css'

type MazeProp = {
    maze: string[][]
}

const Maze: React.FC<MazeProp> = ({maze}) => {
    return (
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
    )
}

export default Maze
import React, { useState } from "react";
import "./userInput.styles.css"

interface UserInputProps{
  onChange: (updatedData: {input1: string}) => void
}

const UserInput: React.FC<UserInputProps> = ({onChange}) => {
    //state for the input values (maze size) matching the name attributes of the input element
    const [mazeData, setMazeData] = useState({
        input1: '',
      })

      //handle the input change the X and Y text box
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        const updatedMazeData = {...mazeData, [name]: value}

        //set the mazedata with the updated information
        setMazeData(updatedMazeData)
        //sends the updated data to the parent component
        onChange(updatedMazeData)
      }

        return (
          <div className="inputValue">
            <label className="mazeSize">
              Maze Size:
              <input type="number" id="mazeSize" name="input1" className="inputMazeSize" value={mazeData.input1} onChange={handleInputChange}/>
            </label>
          </div>
        )
  }

  export default UserInput
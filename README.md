# 🧭 DFS-BFS Maze Visualizer

An interactive 2D maze visualizer built with **TypeScript**, showcasing the step-by-step process of **Depth-First Search (DFS)** and **Breadth-First Search (BFS)** algorithms. This project offers an educational and visually engaging way to understand how these algorithms navigate through a maze.

## 🚀 Live Demo

> https://gs-92.github.io/dfs-bfs-maze-visualizer/

## 🧰 Tech Stack

- **TypeScript** 
- **HTML**   
- **CSS**
- Built with **React** and CSS Grid for layout and animation

## 🔑 Features

- Random maze generation with walls  
- Clearly marked start and end points  
- DFS and BFS pathfinding visualizations  
- Smooth step-by-step animations  
- Clear maze without regeneration to compare algorithms  
- Responsive and intuitive UI


## 🧠 How It Works
## Maze Generation
- A grid of customizable size is generated.
- Walls are placed at random positions while keeping the start and end cells open.
- The maze ensures the possibility of a solvable path, although no path is guaranteed due to randomness.

## Depth-First Search (DFS)
- DFS explores the maze by diving deep into one branch before backtracking.
- Implemented using recursion or a stack.
- May not find the shortest path, but it's fast and efficient for exploring deep solutions.

## Breadth-First Search (BFS)
- BFS explores all neighboring nodes level by level.
- Implemented using a queue.
- Always finds the shortest path (if one exists).

## Visualization
- As the algorithm runs, each visited node is highlighted step-by-step.
- Once the end node is found, the final path is traced and shown with a distinct color.
- Animations clearly distinguish between exploration and final path.

## 📦 Getting Started

### Requirements

- Node.js (v14 or higher)

### Installation

```bash
git clone https://github.com/GS-92/dfs-bfs-maze-visualizer.git
cd dfs-bfs-maze-visualizer
npm install
npm run dev  # or npm start
simple maze that visualize dfs and bfs algos
>>>>>>> c64726c7db8aecdf981169e96d25d5332e882680

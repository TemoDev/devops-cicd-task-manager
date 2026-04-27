import { useState } from 'react'
import './App.css'

let nextId = 1

export default function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  function addTask() {
    const trimmed = input.trim()
    if (!trimmed) return
    setTasks(prev => [...prev, { id: nextId++, text: trimmed }])
    setInput('')
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addTask()
  }

  return (
    <div className="page">
      <header className="header">
        <h1>Task Manager Blue-Green deployment test</h1>
      </header>

      <main className="card">
        <div className="input-row">
          <input
            className="task-input"
            type="text"
            placeholder="Add a new task…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="New task"
          />
          <button className="add-btn" onClick={addTask} aria-label="Add task">
            Add
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="empty-state">No tasks yet, create new one above!</p>
        ) : (
          <ul className="task-list" aria-label="Task list">
            {tasks.map(task => (
              <li key={task.id} className="task-item">
                <span className="task-text">{task.text}</span>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete task: ${task.text}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

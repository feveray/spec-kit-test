import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  const addTask = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setTasks([...tasks, { id: crypto.randomUUID(), text: trimmed, done: false }])
    setInput('')
  }

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask()
  }

  return (
    <div className="todo-container">
      <h1>Lista de Tarefas</h1>
      <div className="todo-input-row">
        <input
          type="text"
          placeholder="Nova tarefa..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="todo-input"
        />
        <button onClick={addTask} className="todo-add-btn">Adicionar</button>
      </div>
      {tasks.length === 0 ? (
        <p className="todo-empty">Nenhuma tarefa ainda. Adicione uma acima!</p>
      ) : (
        <ul className="todo-list">
          {tasks.map((task) => (
            <li key={task.id} className={`todo-item${task.done ? ' done' : ''}`}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                className="todo-checkbox"
              />
              <span className="todo-text">{task.text}</span>
              <button onClick={() => deleteTask(task.id)} className="todo-delete-btn">✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App

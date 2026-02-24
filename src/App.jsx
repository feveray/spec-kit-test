import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

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

  const startEdit = (task) => {
    setEditingId(task.id)
    setEditText(task.text)
  }

  const saveEdit = (id) => {
    const trimmed = editText.trim()
    if (!trimmed) return
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: trimmed } : t)))
    setEditingId(null)
    setEditText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask()
  }

  return (
    <div className={`app-wrapper ${darkMode ? 'dark' : ''}`}>
      <div className="todo-container">
        <div className="todo-header">
          <h1>Lista de Tarefas</h1>
          <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☉ Claro' : '◉ Escuro'}
          </button>
        </div>

        <div className="todo-input-row">
          <input
            className="todo-input"
            type="text"
            placeholder="Nova tarefa..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="todo-add-btn" onClick={addTask}>Adicionar</button>
        </div>

        {tasks.length === 0 ? (
          <p className="todo-empty">Nenhuma tarefa ainda. Adicione uma acima!</p>
        ) : (
          <ul className="todo-list">
            {tasks.map((task) => (
              <li key={task.id} className={`todo-item ${task.done ? 'done' : ''}`}>
                <input
                  type="checkbox"
                  className="todo-checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                {editingId === task.id ? (
                  <>
                    <input
                      className="todo-edit-input"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveEdit(task.id)}
                      autoFocus
                    />
                    <button className="todo-save-btn" onClick={() => saveEdit(task.id)}>💾</button>
                  </>
                ) : (
                  <>
                    <span className="todo-text">{task.text}</span>
                    <button className="todo-edit-btn" onClick={() => startEdit(task)}>✏️</button>
                  </>
                )}
                <button className="todo-delete-btn" onClick={() => deleteTask(task.id)}>✕</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App

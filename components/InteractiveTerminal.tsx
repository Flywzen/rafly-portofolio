'use client'

import { useState, useRef, useEffect } from 'react'

type OutputItem = {
  type: 'command' | 'response' | 'error'
  text: string
}

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<OutputItem[]>([
    { type: 'response', text: 'Welcome to RaflyOS v1.0.0' },
    { type: 'response', text: 'Type "help" for a list of commands.' },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim()
    if (!trimmedCmd) return

    setHistory((prev) => [...prev, { type: 'command', text: `visitor@rafly.dev:~$ ${trimmedCmd}` }])

    const lowerCmd = trimmedCmd.toLowerCase()
    let responseText = ''

    switch (lowerCmd) {
      case 'help':
        responseText = 'Available commands: help, whoami, projects, clear, echo [text]'
        break
      case 'whoami':
        responseText = 'I am Rafly, a Computer Science student at ITERA building software that works today and holds up tomorrow.'
        break
      case 'projects':
        responseText = 'Check out the Featured Projects section below for my recent works.'
        break
      case 'clear':
        setHistory([])
        return
      default:
        if (lowerCmd.startsWith('echo ')) {
          responseText = trimmedCmd.slice(5)
        } else {
          responseText = `Command not found: ${trimmedCmd}. Type "help" for available commands.`
        }
    }

    setHistory((prev) => [...prev, { type: 'response', text: responseText }])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input)
      setInput('')
    }
  }

  return (
    <section className="relative max-w-content mx-auto px-5 sm:px-8 w-full py-12">
      <div className="surface p-4 bg-ink border-2 border-paper/20 rounded-none shadow-pixel max-w-2xl mx-auto h-[300px] flex flex-col font-mono text-sm sm:text-base">
        <div className="flex border-b-2 border-paper/20 pb-2 mb-2 items-center">
          <div className="w-3 h-3 bg-red-500 mr-2" />
          <div className="w-3 h-3 bg-yellow-500 mr-2" />
          <div className="w-3 h-3 bg-green-500 mr-4" />
          <span className="text-paper/60 uppercase text-xs">Terminal</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 text-zinc-300">
          {history.map((item, idx) => (
            <div key={idx} className={item.type === 'error' ? 'text-red-400' : item.type === 'command' ? 'text-accent-text' : 'text-zinc-300'}>
              {item.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="flex items-center mt-2 pt-2 border-t-2 border-paper/10 text-accent-text">
          <span className="mr-2">visitor@rafly.dev:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-zinc-300 placeholder-zinc-600 caret-accent"
            placeholder="Type a command..."
            spellCheck="false"
            autoComplete="off"
          />
        </div>
      </div>
    </section>
  )
}

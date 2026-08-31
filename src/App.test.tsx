import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('fluxo do quiz', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    window.localStorage.clear()
  })

  afterEach(() => {
    cleanup()
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  function openIntro() {
    render(<App />)
    act(() => vi.advanceTimersByTime(1050))
  }

  it('mostra o preloader antes da apresentação', () => {
    render(<App />)

    expect(screen.getByText('Preparando o desafio')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(1050))
    expect(screen.getByRole('button', { name: /começar desafio/i })).toBeInTheDocument()
  })

  it('inicia uma rodada e avança após uma resposta', () => {
    openIntro()
    fireEvent.click(screen.getByRole('button', { name: /começar desafio/i }))

    expect(screen.getByLabelText('Pergunta 1 de 5')).toBeInTheDocument()
    const answers = screen.getAllByRole('button')
    expect(answers).toHaveLength(4)

    fireEvent.click(answers[0])
    expect(screen.getByText(/resposta certa|agora você já sabe/i)).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(650))
    expect(screen.getByLabelText('Pergunta 2 de 5')).toBeInTheDocument()
  })

  it('exibe o resultado depois de cinco respostas', () => {
    openIntro()
    fireEvent.click(screen.getByRole('button', { name: /começar desafio/i }))

    for (let index = 0; index < 5; index += 1) {
      fireEvent.click(screen.getAllByRole('button')[0])
      act(() => vi.advanceTimersByTime(650))
    }

    expect(screen.getByRole('button', { name: /jogar outra rodada/i })).toBeInTheDocument()
    expect(screen.getByText('Rodada concluída')).toBeInTheDocument()
  })
})

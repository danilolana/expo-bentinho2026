import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { questions as questionBank } from './data/questions'
import type { Question } from './types'
import {
  createQuizRound,
  loadUsedQuestionIds,
  ROUND_SIZE,
  saveUsedQuestionIds,
} from './utils/quizEngine'

type Screen = 'loading' | 'intro' | 'quiz' | 'result'

const optionLetters = ['A', 'B', 'C', 'D'] as const

const confettiPieces = Array.from({ length: 52 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  delay: `${(index % 9) * 55}ms`,
  duration: `${2100 + (index % 6) * 130}ms`,
  rotation: `${(index * 53) % 360}deg`,
  color: ['#9bd33d', '#0e5b99', '#f6c744', '#ef6b55', '#ffffff'][index % 5],
}))

function BrandHeader() {
  return (
    <header className="brand-header">
      <a className="brand-lockup" href="#inicio" aria-label="Voltar ao início">
        <img src="/assets/brasao-bq.png" alt="Brasão do Colégio Bento Quirino" />
        <span className="brand-copy">
          <strong>Desafio BQ</strong>
          <small>Expô Bentinho 2026</small>
        </span>
      </a>
      <div className="edition-mark" aria-label="Edição 2026">
        <span>Edição</span>
        <strong>26</strong>
      </div>
    </header>
  )
}

function Preloader() {
  return (
    <main className="preloader" aria-label="Carregando o Desafio BQ">
      <div className="loader-orbit" aria-hidden="true">
        <div className="loader-logo">
          <img src="/assets/logo-bq.png" alt="" />
        </div>
        <i className="orbit-dot" />
      </div>
      <p>Preparando o desafio</p>
      <div className="loader-track" aria-hidden="true"><span /></div>
    </main>
  )
}

function Intro({ onStart, error }: { onStart: () => void; error: string }) {
  return (
    <main className="page-shell intro-page" id="inicio">
      <BrandHeader />
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Quiz de conhecimentos</p>
          <h1>Desafio<span>BQ</span></h1>
          <p className="hero-lead">
            Cinco perguntas. Uma rodada. Mostre que curiosidade e tecnologia combinam com você.
          </p>
          <button className="primary-button" type="button" onClick={onStart}>
            Começar desafio <span aria-hidden="true">↗</span>
          </button>
          {error && <p className="error-message" role="alert">{error}</p>}
          <dl className="hero-facts" aria-label="Regras do desafio">
            <div><dt>05</dt><dd>perguntas por rodada</dd></div>
            <div><dt>NÓS</dt><dd>estudantes de informática</dd></div>
            <div><dt>01+</dt><dd>de informática</dd></div>
          </dl>
        </div>

        <div className="hero-visual" aria-label="Mascote BQ Informática 2026">
          <div className="hero-index" aria-hidden="true">BQ/26</div>
          <div className="mascot-frame">
            <img src="/assets/mascote.ia.png" alt="Mascote BQ estudando programação em um notebook" />
          </div>
          <div className="hero-stamp" aria-hidden="true">
            <span>Conhecimento</span><strong>em movimento</strong>
          </div>
        </div>
      </section>
      <footer className="intro-footer">
        <img src="/assets/logo-bento-quirino.png" alt="Colégio Técnico Bento Quirino — formando gerações desde 1910" />
        <span>Campinas · SP</span>
      </footer>
    </main>
  )
}

interface QuizProps {
  round: readonly Question[]
  questionIndex: number
  selectedAnswer: number | null
  score: number
  onAnswer: (answerIndex: number) => void
}

function Quiz({ round, questionIndex, selectedAnswer, score, onAnswer }: QuizProps) {
  const question = round[questionIndex]
  const hasAnswered = selectedAnswer !== null
  const isCorrect = selectedAnswer === question.correctAnswer

  return (
    <main className="page-shell quiz-page">
      <BrandHeader />
      <div className="quiz-status">
        <div className="progress-copy">
          <span>Rodada atual</span>
          <strong>{String(questionIndex + 1).padStart(2, '0')} <em>/ 05</em></strong>
        </div>
        <div className="progress-rail" aria-label={`Pergunta ${questionIndex + 1} de ${ROUND_SIZE}`}>
          {Array.from({ length: ROUND_SIZE }, (_, index) => (
            <span
              className={index < questionIndex ? 'done' : index === questionIndex ? 'active' : ''}
              key={index}
            />
          ))}
        </div>
        <div className="score-chip"><span>Acertos</span><strong>{score}</strong></div>
      </div>

      <section className={`quiz-layout ${hasAnswered ? (isCorrect ? 'answer-correct' : 'answer-wrong') : ''}`}>
        <aside className="hint-panel">
          <div className="hint-image"><img src="/assets/mascote.ia.png" alt="Mascote BQ" /></div>
          <div className="hint-copy">
            <span className="hint-label">Pista do Bentinho</span>
            <p>{question.hint}</p>
          </div>
        </aside>

        <article className="question-card" aria-live="polite">
          <div className="question-meta">
            <span className={`category-tag ${question.category}`}>
              {question.category === 'informatica' ? 'Informática' : 'Conhecimentos gerais'}
            </span>
            <span>Questão {String(questionIndex + 1).padStart(2, '0')}</span>
          </div>
          <h2>{question.prompt}</h2>

          <div className="options-grid">
            {question.options.map((option, index) => {
              const isAnswer = index === question.correctAnswer
              const isSelected = index === selectedAnswer
              const feedbackClass = hasAnswered
                ? isAnswer ? 'correct' : isSelected ? 'wrong' : 'muted'
                : ''

              return (
                <button
                  className={`option-button ${feedbackClass}`}
                  disabled={hasAnswered}
                  key={option}
                  onClick={() => onAnswer(index)}
                  type="button"
                >
                  <span className="option-letter">{optionLetters[index]}</span>
                  <span>{option}</span>
                  <i aria-hidden="true">{hasAnswered && isAnswer ? '✓' : hasAnswered && isSelected ? '×' : '↗'}</i>
                </button>
              )
            })}
          </div>

          <div className={`answer-feedback ${hasAnswered ? 'visible' : ''}`} role="status">
            {hasAnswered && (
              <>
                <strong>{isCorrect ? 'Boa! Resposta certa.' : 'Quase! Agora você já sabe.'}</strong>
                <span>Próxima pergunta em instantes…</span>
              </>
            )}
          </div>
        </article>
      </section>
    </main>
  )
}

function Result({ score, onRestart }: { score: number; onRestart: () => void }) {
  const percentage = Math.round((score / ROUND_SIZE) * 100)
  const title = score === 5 ? 'Gabaritou!' : score >= 3 ? 'Mandou bem!' : 'Vale outra rodada!'

  return (
    <main className="page-shell result-page">
      <div className="confetti" aria-hidden="true">
        {confettiPieces.map((piece, index) => (
          <i
            className={`confetti-piece confetti-piece--${index % 3}`}
            key={index}
            style={{
              '--confetti-left': piece.left,
              '--confetti-delay': piece.delay,
              '--confetti-duration': piece.duration,
              '--confetti-rotation': piece.rotation,
              '--confetti-color': piece.color,
            } as CSSProperties}
          />
        ))}
      </div>
      <BrandHeader />
      <section className="result-card">
        <div className="result-copy">
          <p className="eyebrow"><span /> Rodada concluída</p>
          <h1>{title}</h1>
          <p>
            Seu conhecimento entrou em campo e deixou sua marca: <strong>{score} de {ROUND_SIZE}</strong>!
          </p>
          <button className="primary-button" type="button" onClick={onRestart}>
            Jogar outra rodada <span aria-hidden="true">↻</span>
          </button>
        </div>
        <div className="score-dial" style={{ '--score': `${percentage * 3.6}deg` } as CSSProperties}>
          <div><strong>{percentage}<small>%</small></strong><span>aproveitamento</span></div>
        </div>
      </section>
    </main>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('loading')
  const [round, setRound] = useState<Question[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [error, setError] = useState('')
  const transitionTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const timer = window.setTimeout(() => setScreen('intro'), 1050)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => () => window.clearTimeout(transitionTimer.current), [])

  const startRound = () => {
    try {
      const nextRound = createQuizRound(questionBank, loadUsedQuestionIds())
      saveUsedQuestionIds(nextRound.usedIds)
      setRound(nextRound.questions)
      setQuestionIndex(0)
      setSelectedAnswer(null)
      setScore(0)
      setError('')
      setScreen('quiz')
    } catch (caughtError) {
      console.error(caughtError)
      setError('Não foi possível preparar a rodada. Recarregue a página e tente novamente.')
      setScreen('intro')
    }
  }

  const answerQuestion = (answerIndex: number) => {
    if (selectedAnswer !== null || !round[questionIndex]) return

    const isCorrect = answerIndex === round[questionIndex].correctAnswer
    setSelectedAnswer(answerIndex)
    if (isCorrect) setScore((currentScore) => currentScore + 1)

    transitionTimer.current = window.setTimeout(() => {
      if (questionIndex === ROUND_SIZE - 1) {
        setScreen('result')
      } else {
        setQuestionIndex((currentIndex) => currentIndex + 1)
        setSelectedAnswer(null)
      }
    }, 650)
  }

  if (screen === 'loading') return <Preloader />
  if (screen === 'intro') return <Intro onStart={startRound} error={error} />
  if (screen === 'result') return <Result score={score} onRestart={startRound} />
  if (round.length !== ROUND_SIZE) return <Intro onStart={startRound} error="A rodada precisa ser iniciada novamente." />

  return (
    <Quiz
      round={round}
      questionIndex={questionIndex}
      selectedAnswer={selectedAnswer}
      score={score}
      onAnswer={answerQuestion}
    />
  )
}

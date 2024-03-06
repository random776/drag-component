import './App.css'
import { useInteractJS } from './hooks'
import { MathJax, MathJaxContext } from 'better-react-mathjax'

function App() {
  const interact = useInteractJS()
  const interactIntegral = useInteractJS()
  return (
    <>
    <div className="App">
      <textarea
        ref={interact.ref}
        placeholder='板書'
        style={{
          ...interact.style,           // <= 追加する
          border: '2px solid #0489B1',
          borderRadius: '5px',
        }}
      />
    </div>

    <div className="App">
      <div
        ref={interactIntegral.ref}
        style={{
          ...interactIntegral.style,           // <= 追加する
          border: '2px solid #0489B1',
          borderRadius: '5px',
        }}
      ><MathJaxContext>
        <MathJax className="mjx-math">{"\\(\\int x^2 dx\\)"}</MathJax>
        </MathJaxContext></div>
    </div>
    </>
  )
}

export default App

import React, { useState, useEffect } from 'react'
import Papa from 'papaparse'

export default function App() {
  const [prixButler, setPrixButler] = useState([])
  const [largeur, setLargeur] = useState('')
  const [hauteur, setHauteur] = useState('')
  const [escompte, setEscompte] = useState(53)
  const [prixTrouvé, setPrixTrouvé] = useState(null)

  useEffect(() => {
    fetch('/data/prix-faber-butler.csv')
      .then(res => res.text())
      .then(data => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: result => {
            setPrixButler(result.data)
          }
        })
      })
  }, [])

  const calculerPrix = () => {
    const l = parseInt(largeur)
    const h = parseInt(hauteur)
    const match = prixButler.find(p => parseInt(p.Largeur) === l && parseInt(p.Hauteur) === h)
    if (match) {
      const prixBase = parseFloat(match.Prix)
      const prixFinal = prixBase * (1 - escompte / 100)
      setPrixTrouvé(prixFinal.toFixed(2))
    } else {
      setPrixTrouvé("Dimensions non trouvées")
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Test Butler - Grille dynamique CSV</h1>
      <label>Largeur :
        <input value={largeur} onChange={e => setLargeur(e.target.value)} />
      </label><br />
      <label>Hauteur :
        <input value={hauteur} onChange={e => setHauteur(e.target.value)} />
      </label><br />
      <label>Escompte (%) :
        <input value={escompte} onChange={e => setEscompte(e.target.value)} />
      </label><br />
      <button onClick={calculerPrix}>Calculer prix</button>
      <h3>Prix trouvé : {prixTrouvé !== null ? `${prixTrouvé} $` : "—"}</h3>
    </div>
  )
}

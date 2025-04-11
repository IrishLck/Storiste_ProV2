import React, { useState, useEffect } from 'react'
import Papa from 'papaparse'

export default function App() {
  const [prixButler, setPrixButler] = useState([]);

  useEffect(() => {
    fetch('/data/prix-faber-butler.csv')
      .then(res => res.text())
      .then(data => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: result => {
            setPrixButler(result.data);
          }
        });
      });
  }, []);

  const [client, setClient] = useState({ nom: '', tel: '', adresse: '' });
  const [produit, setProduit] = useState("Butler");
  const [largeur, setLargeur] = useState('');
  const [hauteur, setHauteur] = useState('');
  const [motorisation, setMotorisation] = useState('');
  const [escompte, setEscompte] = useState(53);
  const [prixTrouvé, setPrixTrouvé] = useState(null);
  const [prixButler, setPrixButler] = useState([]);

  useEffect(() => {
    fetch('/data/prix-faber-butler.csv')
      .then(res => res.text())
      .then(data => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: result => setPrixButler(result.data)
        })
      })
  }, []);

  const calculerPrix = () => {
    const l = parseInt(largeur)
    const h = parseInt(hauteur)
    const match = prixButler.find(p => parseInt(p.Largeur) === l && parseInt(p.Hauteur) === h)
    if (match) {
      const prixBase = parseFloat(match.Prix)
      const prixCoutant = prixBase * (1 - escompte / 100)
      const prixVente = prixCoutant + parseFloat(motorisation || 0)
      setPrixTrouvé({
        prixListe: prixBase.toFixed(2),
        prixCoutant: prixCoutant.toFixed(2),
        prixVente: prixVente.toFixed(2)
      })
    } else {
      setPrixTrouvé("Dimensions non trouvées")
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Soumission - Le Storiste</h1>

      <h2>Client</h2>
      <input placeholder="Nom*" value={client.nom} onChange={e => setClient({ ...client, nom: e.target.value })} /><br />
      <input placeholder="Téléphone*" value={client.tel} onChange={e => setClient({ ...client, tel: e.target.value })} /><br />
      <input placeholder="Adresse*" value={client.adresse} onChange={e => setClient({ ...client, adresse: e.target.value })} /><br />

      <h2>Produit : Butler</h2>
      <label>Largeur :
        <input value={largeur} onChange={e => setLargeur(e.target.value)} />
      </label><br />
      <label>Hauteur :
        <input value={hauteur} onChange={e => setHauteur(e.target.value)} />
      </label><br />
      <label>Escompte (%) :
        <input value={escompte} onChange={e => setEscompte(e.target.value)} />
      </label><br />
      <label>Motorisation ($) :
        <input value={motorisation} onChange={e => setMotorisation(e.target.value)} />
      </label><br />

      <button onClick={calculerPrix}>Calculer</button>

      {prixTrouvé && typeof prixTrouvé === 'object' ? (
        <div>
          <h3>Prix liste : {prixTrouvé.prixListe} $</h3>
          <h3>Prix coûtant : {prixTrouvé.prixCoutant} $</h3>
          <h3>Prix vente : {prixTrouvé.prixVente} $</h3>
        </div>
      ) : (
        prixTrouvé && <h3>{prixTrouvé}</h3>
      )}
    </div>
  )
}

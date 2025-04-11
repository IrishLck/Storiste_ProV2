// ✅ Version corrigée avec composants HTML natifs pour compatibilité immédiate
import { useState } from "react";
const fabricants = ["Faber", "Altex", "Ambiance Déco", "Persienne Design", "Sol-r"];
const produitsParFabricant = {
  Faber: ["Butler", "Solopaque", "Screen 3%", "Screen 5%"],
  Altex: ["Altex A", "Altex B"],
  "Ambiance Déco": ["Rideau Luxe", "Voilage Nature"],
  "Persienne Design": ["Persienne Bois", "PVC Classique"],
  "Sol-r": ["Solair 3000"]
};
const mecanismesParFabricant = {
  Faber: ["Chaînette", "Motorisation"],
  Altex: ["Manuel", "Motorisation", "Coulisse"],
  "Ambiance Déco": ["Tringle décorative", "Rail technique"],
  "Persienne Design": ["Inclinaison manuelle", "Inclinaison motorisée"],
  "Sol-r": ["Système standard", "Commande inversée"]
};
const moteurs = ["Somfy RTS", "Sonesse 30", "Zigbee"];
const cassettes = ["Open Roll", "Fascia 3\"", "Fascia 4\""];
const couleurs = ["Blanc", "Ivoire", "Stainless", "Brun", "Noir"];
const tissus = ["Blanc Cassé", "Charbon", "Perle", "Lin"];
const controles = ["Gauche", "Droite"];
const fractions = ["", "1/8", "1/4", "3/8", "1/2", "5/8", "3/4", "7/8"];

export default function App() {
  const [prixButler, setPrixButler] = useState([]);
  const [prixSolopaque, setPrixSolopaque] = useState([]);
  useEffect(() => {
    fetch('/data/prix-faber-solopaque.csv')
      .then(res => res.text())
      .then(data => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: result => setPrixSolopaque(result.data)
        });
      });
  }, []);
  const [client, setClient] = useState({ nom: "", prenom: "", telephone: "", courriel: "", adresse: "", ville: "" });
  const [fenetres, setFenetres] = useState([]);
  const [fenetre, setFenetre] = useState({
    nom: "",
    fabricant: "", produit: "", tissu: "", couleur: "", largeur: "", largeurFraction: "0/8", hauteur: "", hauteurFraction: "0/8",
    controle: "", mecanisme: "", moteur: "", poseInterieure: false, poseMurale: false, inverse: false,
    cassette: "", couleurCassette: "", prixListe: 0, coutant: 0, prixVente: 0
  });
  const ajouterFenetre = () => {
  const largeur = parseInt(fenetre.largeur);
  const hauteur = parseInt(fenetre.hauteur);
  const trouverPlusProche = (val, valeurs) => {
    return valeurs.find(v => v >= val);
  };
  const dimensionsDisponibles = Object.keys(butlerPrix).map(k => k.split("x").map(Number));
  const largeursDisponibles = [...new Set(dimensionsDisponibles.map(([l]) => l))].sort((a, b) => a - b);
  const hauteursDisponibles = [...new Set(dimensionsDisponibles.map(([, h]) => h))].sort((a, b) => a - b);
  const largeurArr = trouverPlusProche(largeur, largeursDisponibles);
  const hauteurArr = trouverPlusProche(hauteur, hauteursDisponibles);
  const key = `${largeurArr}x${hauteurArr}`;
  const match = prixButler.find(p => parseInt(p.Largeur) === largeurArr && parseInt(p.Hauteur) === hauteurArr);
  let prixBase = 0;
  if (match) {
    prixBase = parseFloat(match.Prix);
  }
  }
  const prixListe = prixBase * 1.1;
  const coutant = prixListe * 0.3;
  const prixVente = prixListe * 0.47;
  const quantite = fenetre.quantite || 1;
  setFenetres([...fenetres, {
    ...fenetre,
    id: Date.now(),
    prixListe,
    coutant,
    prixVente,
    largeurArr,
    hauteurArr,
    key,
    quantite
  }]);
  setFenetre({
    fabricant: "", produit: "", tissu: "", couleur: "", largeur: "", largeurFraction: "0/8", hauteur: "", hauteurFraction: "0/8",
    controle: "", mecanisme: "", moteur: "", poseInterieure: false, poseMurale: false, inverse: false,
    cassette: "", couleurCassette: "", prixListe: 0, coutant: 0, prixVente: 0
  });
};
  
  useEffect(() => {
    fetch('/data/prix-faber-butler.csv')
      .then(res => res.text())
      .then(data => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: result => setPrixButler(result.data)
        });
      });
  }, []);
return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="border rounded p-4 bg-white">
        <h2 className="text-xl font-bold mb-4">Fiche client</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(client).map((field) => (
            <input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={client[field]}
              onChange={(e) => setClient({ ...client, [field]: e.target.value })}
              className="border p-2 rounded"
            />
          ))}
        </div>
      </div>
      <div className="border rounded p-4 bg-white">
        <h2 className="text-xl font-bold mb-4">Nouvelle Fenêtre</h2>
        <input
          placeholder="Nom de la fenêtre (ex: Chambre, RDC 1...)"
          value={fenetre.nom}
          onChange={(e) => setFenetre({ ...fenetre, nom: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <select onChange={e => setFenetre({ ...fenetre, fabricant: e.target.value })} className="border p-2 mb-2 w-full">
          <option>Fabricant</option>
          {fabricants.map(f => <option key={f}>{f}</option>)}
        </select>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <select onChange={e => setFenetre({ ...fenetre, produit: e.target.value })} className="border p-2">
            <option>Produit</option>
            {(produitsParFabricant[fenetre.fabricant] || []).map(p => <option key={p}>{p}</option>)}
          </select>
          <select onChange={e => setFenetre({ ...fenetre, couleur: e.target.value })} className="border p-2">
            <option>Couleur du tissu</option>
            {tissus.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-6 gap-4 mb-2">
          <input placeholder="Largeur" value={fenetre.largeur} onChange={e => setFenetre({ ...fenetre, largeur: e.target.value })} className="border p-2" />
          <select value={fenetre.largeurFraction} onChange={e => setFenetre({ ...fenetre, largeurFraction: e.target.value })} className="border p-2">
            {fractions.map(fr => <option key={fr}>{fr}</option>)}
          </select>
          <input placeholder="Hauteur" value={fenetre.hauteur} onChange={e => setFenetre({ ...fenetre, hauteur: e.target.value })} className="border p-2" />
          <select value={fenetre.hauteurFraction} onChange={e => setFenetre({ ...fenetre, hauteurFraction: e.target.value })} className="border p-2">
            {fractions.map(fr => <option key={fr}>{fr}</option>)}
          </select>
          <select onChange={e => setFenetre({ ...fenetre, controle: e.target.value })} className="border p-2">
            <option>Contrôle</option>
            {controles.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex gap-4 mb-2">
          <label><input type="checkbox" checked={fenetre.poseInterieure} onChange={e => setFenetre({ ...fenetre, poseInterieure: e.target.checked })} /> Pose intérieure</label>
          <label><input type="checkbox" checked={fenetre.poseMurale} onChange={e => setFenetre({ ...fenetre, poseMurale: e.target.checked })} /> Pose murale</label>
          <label><input type="checkbox" checked={fenetre.inverse} onChange={e => setFenetre({ ...fenetre, inverse: e.target.checked })} /> Enroulement inversé</label>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <select onChange={e => setFenetre({ ...fenetre, cassette: e.target.value })} className="border p-2">
            <option>Cassette</option>
            {cassettes.map(c => <option key={c}>{c}</option>)}
          </select>
          <select disabled={fenetre.cassette === "Open Roll"} onChange={e => setFenetre({ ...fenetre, couleurCassette: e.target.value })} className="border p-2">
            <option>Couleur de cassette</option>
            {couleurs.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <select onChange={e => setFenetre({ ...fenetre, mecanisme: e.target.value })} className="border p-2 mb-2 w-full">
          <option>Système de contrôle</option>
          {(mecanismesParFabricant[fenetre.fabricant] || []).map(m => <option key={m}>{m}</option>)}
        </select>
        {fenetre.mecanisme === "Motorisation" && (
          <select onChange={e => setFenetre({ ...fenetre, moteur: e.target.value })} className="border p-2 mb-2 w-full">
            <option>Type de moteur</option>
            {moteurs.map(m => <option key={m}>{m}</option>)}
          </select>
        )}
        <button onClick={ajouterFenetre} className="bg-blue-600 text-white px-4 py-2 rounded">Ajouter la fenêtre</button>
      </div>
            <div className="border rounded p-4 bg-white">
        <h3 className="font-semibold mb-2">Soumission</h3>
        {fenetres.map((f, i) => (
          <div key={f.id} className="border p-2 my-2 cursor-move" draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', i)} onDragOver={(e) => e.preventDefault()} onDrop={(e) => {
              const from = parseInt(e.dataTransfer.getData('text/plain'));
              const copy = [...fenetres];
              const item = copy.splice(from, 1)[0];
              copy.splice(i, 0, item);
              setFenetres(copy);
            }}>
            <div className="flex justify-between">
              <div>
                <strong>{f.nom}</strong><br />
                {f.produit} – {f.largeur}" {f.largeurFraction} × {f.hauteur}" {f.hauteurFraction}
                <div className="text-xs">
                  {f.mecanisme} | Contrôle: {f.controle} | Liste: {(f.prixListe * (f.quantite || 1)).toFixed(2)}$ | Vente: {(f.prixVente * (f.quantite || 1)).toFixed(2)}$
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <input
                  type="number"
                  value={f.quantite || 1}
                  min={1}
                  onChange={(e) => {
                    const newF = [...fenetres];
                    newF[i].quantite = parseInt(e.target.value);
                    setFenetres(newF);
                  }}
                  className="w-16 border rounded p-1 text-sm"
                />
                <button
                  onClick={() => {
                  setFenetres(fenetres.filter(x => x.id !== f.id));
                  setFenetre(f);
                }}
                  className="text-blue-600 underline text-sm"
                >Modifier</button>
                <button
                  onClick={() => setFenetres(fenetres.filter(x => x.id !== f.id))}
                  className="text-red-600 underline text-sm"
                >Supprimer</button>
                <button
                  onClick={() => setFenetre({ ...f, id: Date.now(), quantite: 1 })}
                  className="text-green-600 underline text-sm"
                >Cloner</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border rounded p-4 bg-white">
        <h2 className="text-xl font-bold mb-2">Notes</h2>
        <textarea
          placeholder="Ajouter des notes ou commentaires..."
          className="w-full border p-2 rounded mb-4"
          rows={4}
        />
      </div>
    </div>
  );
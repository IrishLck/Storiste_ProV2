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
const butlerPrix = {
  "36x36": 129, "42x36": 141, "48x36": 158, "54x36": 174, "60x36": 190, "66x36": 222, "72x36": 238, "78x36": 254, "84x36": 270, "96x36": 302, "108x36": 335, "120x36": 367, "132x36": 404, "144x36": 440,
  "36x48": 150, "42x48": 166, "48x48": 182, "54x48": 198, "60x48": 214, "66x48": 246, "72x48": 266, "78x48": 282, "84x48": 298, "96x48": 330, "108x48": 362, "120x48": 399, "132x48": 439, "144x48": 479,
  "36x60": 169, "42x60": 185, "48x60": 201, "54x60": 217, "60x60": 238, "66x60": 270, "72x60": 290, "78x60": 306, "84x60": 327, "96x60": 359, "108x60": 394, "120x60": 475, "132x60": 523, "144x60": 570,
  "36x72": 190, "42x72": 206, "48x72": 222, "54x72": 242, "60x72": 278, "66x72": 294, "72x72": 314, "78x72": 330, "84x72": 351, "96x72": 386, "108x72": 467, "120x72": 507, "132x72": 558, "144x72": 608,
  "36x84": 206, "42x84": 225, "48x84": 246, "54x84": 282, "60x84": 302, "66x84": 322, "72x84": 343, "78x84": 359, "84x84": 378, "96x84": 459, "108x84": 499, "120x84": 539, "132x84": 593, "144x84": 647,
  "36x96": 230, "42x96": 246, "48x96": 282, "54x96": 306, "60x96": 322, "66x96": 343, "72x96": 367, "78x96": 383, "84x96": 443, "96x96": 483, "108x96": 528, "120x96": 572, "132x96": 629, "144x96": 686,
  "36x108": 250, "42x108": 286, "48x108": 306, "54x108": 327, "60x108": 346, "66x108": 367, "72x108": 427, "78x108": 447, "84x108": 467, "96x108": 512, "108x108": 555, "120x108": 600, "132x108": 660, "144x108": 720,
  "36x120": 286, "42x120": 306, "48x120": 327, "54x120": 351, "60x120": 402, "66x120": 427, "72x120": 451, "78x120": 472, "84x120": 496, "96x120": 539, "108x120": 588, "120x120": 632, "132x120": 695, "144x120": 758,
  "36x132": 306, "42x132": 327, "48x132": 378, "54x132": 402, "60x132": 427, "66x132": 451, "72x132": 475, "78x132": 499, "84x132": 523, "96x132": 568, "108x132": 616, "120x132": 665, "132x132": 732, "144x132": 798,
  "36x144": 351, "42x144": 378, "48x144": 402, "54x144": 427, "60x144": 451, "66x144": 475, "72x144": 499, "78x144": 523, "84x144": 547, "96x144": 596, "108x144": 649, "120x144": 697, "132x144": 767, "144x144": 836
};

export default function App() {
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
  let prixBase = 0;
  if (fenetre.fabricant === "Faber" && fenetre.produit === "Butler" && butlerPrix[key]) {
    prixBase = butlerPrix[key];
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
}

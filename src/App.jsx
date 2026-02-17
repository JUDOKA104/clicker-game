import { useState, useEffect, useMemo } from 'react';
import './App.css';

// --- KILL SWITCH D'URGENCE ---
// Bloque la sauvegarde automatique pendant qu'on efface la partie
let isWiping = false;

// --- FONCTION DE CHARGEMENT ---
const loadSafe = (key, defaultValue) => {
    try {
        const saved = localStorage.getItem(key);
        if (saved !== null) {
            const parsed = JSON.parse(saved);
            if (typeof parsed === 'number' && isNaN(parsed)) return defaultValue;
            return parsed;
        }
    } catch (e) { console.error("Erreur de sauvegarde", e); }
    return defaultValue;
};

// --- CONFIGURATION DES BÂTIMENTS ---
const BUILDINGS = [
    { id: 'b1', name: 'Curseur Auto', baseCost: 15, gps: 0.5, icon: '🖱️' },
    { id: 'b2', name: 'Apprenti', baseCost: 100, gps: 4, icon: '👨‍🎓' },
    { id: 'b3', name: 'Usine à Clics', baseCost: 1100, gps: 32, icon: '🏭' },
    { id: 'b4', name: 'Mine de Données', baseCost: 12000, gps: 260, icon: '⛏️' },
    { id: 'b5', name: 'Labo Spatial', baseCost: 130000, gps: 1400, icon: '🚀' },
    { id: 'b6', name: 'Réacteur Nucléaire', baseCost: 1500000, gps: 9500, icon: '☢️' },
    { id: 'b7', name: 'Portail Divin', baseCost: 20000000, gps: 85000, icon: '🌀' },
];

// --- CONFIGURATION DES SECRETS (Marché Noir) ---
const SECRETS = [
    { id: 's1', type: 'clicks', req: 100, cost: 500, name: 'Éveil Clic', desc: 'Clic x3', effect: (s) => s.setClickPower(p => p * 3) },
    { id: 's2', type: 'clicks', req: 500, cost: 5000, name: 'Frénésie', desc: 'Cycle à 0.80s', effect: (s) => s.setGlobalSpeed(p => p * 1.25) },
    { id: 's3', type: 'clicks', req: 2000, cost: 25000, name: 'Titane', desc: 'Clic x10', effect: (s) => s.setClickPower(p => p * 10) },
    { id: 's4', type: 'score', req: 50000, cost: 100000, name: 'Overclocking', desc: 'Cycle à 0.66s', effect: (s) => s.setGlobalSpeed(p => p * 1.5) },
    { id: 's5', type: 'score', req: 1000000, cost: 5000000, name: 'Fusion Clic', desc: 'Synergie +5%', effect: (s) => s.setClickSynergy(p => p + 0.05) },
    { id: 's6', type: 'score', req: 100000000, cost: 250000000, name: 'Distorsion', desc: 'Cycle à 0.50s', effect: (s) => s.setGlobalSpeed(p => p * 2) },
];

function App() {
    // --- ÉTATS DU JEU ---
    const [score, setScore] = useState(() => loadSafe('clicker_score', 0));
    const [clickPower, setClickPower] = useState(() => loadSafe('clicker_clickPower', 1));
    const [clickSynergy, setClickSynergy] = useState(() => loadSafe('clicker_clickSynergy', 0));
    const [globalSpeed, setGlobalSpeed] = useState(() => loadSafe('clicker_globalSpeed', 1));

    const [upgradeClickCost, setUpgradeClickCost] = useState(() => loadSafe('clicker_upgradeClickCost', 10));
    const [synergyCost, setSynergyCost] = useState(() => loadSafe('clicker_synergyCost', 1000));

    const [totalClicks, setTotalClicks] = useState(() => loadSafe('clicker_totalClicks', 0));
    const [prestigeMultiplier, setPrestigeMultiplier] = useState(() => loadSafe('clicker_prestigeMultiplier', 1));
    const [boughtSecrets, setBoughtSecrets] = useState(() => loadSafe('clicker_boughtSecrets', []));
    const [ownedBuildings, setOwnedBuildings] = useState(() => loadSafe('clicker_buildings', {}));
    const [clicks, setClicks] = useState([]);

    // --- CALCULS MATHÉMATIQUES ---
    const baseGps = useMemo(() => {
        return BUILDINGS.reduce((total, b) => total + (ownedBuildings[b.id] || 0) * b.gps, 0);
    }, [ownedBuildings]);

    const realGps = baseGps * globalSpeed * prestigeMultiplier;
    const realClickPower = (clickPower + (baseGps * clickSynergy)) * prestigeMultiplier;

    // --- SAUVEGARDE AUTOMATIQUE ---
    useEffect(() => {
        // Si on est en train de réinitialiser le jeu, on bloque l'écriture !
        if (isWiping) return;

        localStorage.setItem('clicker_score', JSON.stringify(score));
        localStorage.setItem('clicker_clickPower', JSON.stringify(clickPower));
        localStorage.setItem('clicker_clickSynergy', JSON.stringify(clickSynergy));
        localStorage.setItem('clicker_globalSpeed', JSON.stringify(globalSpeed));
        localStorage.setItem('clicker_upgradeClickCost', JSON.stringify(upgradeClickCost));
        localStorage.setItem('clicker_synergyCost', JSON.stringify(synergyCost));
        localStorage.setItem('clicker_totalClicks', JSON.stringify(totalClicks));
        localStorage.setItem('clicker_prestigeMultiplier', JSON.stringify(prestigeMultiplier));
        localStorage.setItem('clicker_boughtSecrets', JSON.stringify(boughtSecrets));
        localStorage.setItem('clicker_buildings', JSON.stringify(ownedBuildings));
    }, [score, clickPower, clickSynergy, globalSpeed, upgradeClickCost, synergyCost, totalClicks, prestigeMultiplier, boughtSecrets, ownedBuildings]);

    // --- BOUCLE DE JEU TEMPORELLE ---
    useEffect(() => {
        if (realGps > 0) {
            const interval = setInterval(() => {
                setScore((prev) => prev + (realGps / 10));
            }, 100);
            return () => clearInterval(interval);
        }
    }, [realGps]);

    // --- ACTIONS ---
    const handleMainClick = (e) => {
        setScore((prev) => prev + realClickPower);
        setTotalClicks((prev) => prev + 1);

        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now() + Math.random();

        setClicks((prev) => [...prev, { id, x, y, value: realClickPower }]);
        setTimeout(() => { setClicks((prev) => prev.filter((c) => c.id !== id)); }, 800);
    };

    const buyClickUpgrade = () => {
        if (score >= upgradeClickCost) {
            setScore((prev) => prev - upgradeClickCost);
            setClickPower((prev) => prev * 1.5);
            setUpgradeClickCost((prev) => Math.floor(prev * 1.6));
        }
    };

    const buySynergyUpgrade = () => {
        if (score >= synergyCost) {
            setScore((prev) => prev - synergyCost);
            setClickSynergy((prev) => prev + 0.01);
            setSynergyCost((prev) => Math.floor(prev * 2.5));
        }
    };

    const buyBuilding = (building) => {
        const count = ownedBuildings[building.id] || 0;
        const cost = Math.floor(building.baseCost * Math.pow(1.15, count));
        if (score >= cost) {
            setScore((prev) => prev - cost);
            setOwnedBuildings((prev) => ({ ...prev, [building.id]: count + 1 }));
        }
    };

    const processSecretPurchase = (secret) => {
        if (score >= secret.cost && !boughtSecrets.includes(secret.id)) {
            setScore((prev) => prev - secret.cost);
            secret.effect({ setClickPower, setGlobalSpeed, setClickSynergy });
            setBoughtSecrets((prev) => [...prev, secret.id]);
        }
    };

    const activatePrestige = () => {
        if (score >= 1000000000) {
            if (window.confirm("ASCENSION : Tout effacer pour +1 Multiplicateur ?")) {
                setScore(0); setClickPower(1); setClickSynergy(0); setGlobalSpeed(1);
                setUpgradeClickCost(10); setSynergyCost(1000);
                setTotalClicks(0); setBoughtSecrets([]); setOwnedBuildings({});
                setPrestigeMultiplier((prev) => prev + 1);
            }
        }
    };

    // --- LA CORRECTION EST ICI ---
    const hardResetGame = () => {
        if (window.confirm("Effacer la sauvegarde complète ?")) {
            isWiping = true; // On déclenche le Kill Switch
            localStorage.clear(); // On atomise les données
            window.location.reload(); // On redémarre l'appli
        }
    };

    // --- FORMATAGE ---
    const formatNumber = (num) => {
        if (num >= 1000000000) return num.toExponential(2).replace('+', '');
        return Math.floor(num).toLocaleString('fr-FR');
    };

    const visibleSecrets = SECRETS.filter(s => {
        if (boughtSecrets.includes(s.id)) return false;
        return s.type === 'clicks' ? totalClicks >= s.req : score >= s.req;
    });

    return (
        <div className="game-layout">

            {/* --- COLONNE 1 : LE JEU --- */}
            <section className="col-left">
                <div className="score-box">
                    <h2>SCORE</h2>
                    <div className="score-number">{formatNumber(score)}</div>
                    <div className="stats">
                        <p>Gain/s : {formatNumber(realGps)}</p>
                        <p>Par clic : {formatNumber(realClickPower)}</p>
                        <p style={{color: '#fbbf24'}}>Cycle Temporel : {(1 / globalSpeed).toFixed(2)}s</p>
                        {clickSynergy > 0 && <p style={{color: '#4ade80'}}>Synergie : +{(clickSynergy * 100).toFixed(0)}% GPS au Clic</p>}
                    </div>
                    {prestigeMultiplier > 1 && (
                        <div className="prestige-badge">Prestige : x{prestigeMultiplier}</div>
                    )}
                </div>

                <button className="main-circle" onClick={handleMainClick}>
                    {clicks.map((click) => (
                        <span key={click.id} className="particle" style={{ top: `${click.y}px`, left: `${click.x}px` }}>
              +{formatNumber(click.value)}
            </span>
                    ))}
                </button>
            </section>

            {/* --- COLONNE 2 : AMÉLIORATIONS & SECRETS --- */}
            <section className="col-middle">
                <div className="shop-panel">
                    <h2 className="shop-title">Améliorations</h2>

                    <div className="shop-grid">
                        <button className="upgrade-btn" disabled={score < upgradeClickCost} onClick={buyClickUpgrade}>
                            <strong>Dopage Clic (+50%)</strong>
                            <span>{formatNumber(upgradeClickCost)} pts</span>
                        </button>
                        <button className="upgrade-btn" disabled={score < synergyCost} onClick={buySynergyUpgrade}>
                            <strong>Synergie Bâtiments (+1%)</strong>
                            <span>{formatNumber(synergyCost)} pts</span>
                        </button>
                    </div>

                    {visibleSecrets.length > 0 && (
                        <>
                            <h2 className="shop-title secret-title">Marché Noir</h2>
                            <div className="shop-grid">
                                {visibleSecrets.map(secret => (
                                    <button key={secret.id} className="upgrade-btn secret-btn" disabled={score < secret.cost} onClick={() => processSecretPurchase(secret)}>
                                        <strong>{secret.name}</strong>
                                        <span style={{color: '#ccc', fontSize: '0.75rem'}}>{secret.desc}</span>
                                        <span>{formatNumber(secret.cost)} pts</span>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {score >= 500000000 && (
                        <div className="prestige-section">
                            <h2 className="shop-title" style={{color: '#fbbf24'}}>Ascension</h2>
                            <button className="prestige-btn" disabled={score < 1000000000} onClick={activatePrestige}>
                                <strong>💎 PRESTIGE (1 Milliard) 💎</strong>
                            </button>
                        </div>
                    )}

                    <button className="reset-btn" onClick={hardResetGame}>Supprimer sauvegarde</button>
                </div>
            </section>

            {/* --- COLONNE 3 : BÂTIMENTS --- */}
            <section className="col-right">
                <h2 className="shop-title sticky-title">Bâtiments</h2>
                <div className="buildings-list">
                    {BUILDINGS.map((b) => {
                        const count = ownedBuildings[b.id] || 0;
                        const cost = Math.floor(b.baseCost * Math.pow(1.15, count));
                        const canAfford = score >= cost;

                        return (
                            <button key={b.id} className={`building-row ${!canAfford ? 'disabled' : ''}`} onClick={() => buyBuilding(b)} disabled={!canAfford}>
                                <div className="b-icon">{b.icon}</div>
                                <div className="b-details">
                                    <h3>{b.name}</h3>
                                    <p className="b-cost">{formatNumber(cost)} pts</p>
                                </div>
                                <div className="b-count">{count}</div>
                            </button>
                        );
                    })}
                </div>
            </section>

        </div>
    );
}

export default App;
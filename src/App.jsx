import { useGame } from './context/GameContext';
import { BUILDINGS } from './gameConfig';
import Clicker from './components/Clicker';
import UpgradeButton from './components/UpgradeButton';
import Building from './components/Building';
import './App.css';

function AppContent() {
    const {
        score, realGps, realClickPower, globalSpeed, clickSynergy, prestigeMultiplier,
        upgradeClickCost, synergyCost, ownedBuildings, visibleSecrets,
        buyBuilding, buyClickUpgrade, buySynergyUpgrade, processSecretPurchase,
        activatePrestige, hardResetGame, formatNumber
    } = useGame();

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
                    {prestigeMultiplier > 1 && <div className="prestige-badge">Prestige : x{prestigeMultiplier}</div>}
                </div>

                <Clicker />
            </section>

            {/* --- COLONNE 2 : AMÉLIORATIONS --- */}
            <section className="col-middle">
                <div className="shop-panel">
                    <h2 className="shop-title">Améliorations</h2>

                    <div className="shop-grid">
                        <UpgradeButton title="Dopage Clic (+50%)" cost={upgradeClickCost} score={score} formatNumber={formatNumber} onBuy={buyClickUpgrade} />
                        <UpgradeButton title="Synergie Bâtiments (+1%)" cost={synergyCost} score={score} formatNumber={formatNumber} onBuy={buySynergyUpgrade} />
                    </div>

                    {visibleSecrets.length > 0 && (
                        <>
                            <h2 className="shop-title secret-title">Marché Noir</h2>
                            <div className="shop-grid">
                                {visibleSecrets.map(s => (
                                    <UpgradeButton key={s.id} isSecret title={s.name} desc={s.desc} cost={s.cost} score={score} formatNumber={formatNumber} onBuy={() => processSecretPurchase(s)} />
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
                    {BUILDINGS.map(b => (
                        <Building key={b.id} building={b} owned={ownedBuildings[b.id] || 0} score={score} formatNumber={formatNumber} onBuy={buyBuilding} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default AppContent;
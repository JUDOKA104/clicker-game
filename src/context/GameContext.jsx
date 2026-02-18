/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useEffect } from 'react';
import { usePersistentState, setWiping } from '../hooks/usePersistentState';
import { BUILDINGS, SECRETS } from '../gameConfig';

const GameContext = createContext();
export const useGame = () => useContext(GameContext);

export function GameProvider({ children }) {
    // --- ÉTATS ---
    const [score, setScore] = usePersistentState('clicker_score', 0);
    const [clickPower, setClickPower] = usePersistentState('clicker_clickPower', 1);
    const [clickSynergy, setClickSynergy] = usePersistentState('clicker_clickSynergy', 0);
    const [globalSpeed, setGlobalSpeed] = usePersistentState('clicker_globalSpeed', 1);
    const [upgradeClickCost, setUpgradeClickCost] = usePersistentState('clicker_upgradeClickCost', 10);
    const [synergyCost, setSynergyCost] = usePersistentState('clicker_synergyCost', 1000);
    const [totalClicks, setTotalClicks] = usePersistentState('clicker_totalClicks', 0);
    const [prestigeMultiplier, setPrestigeMultiplier] = usePersistentState('clicker_prestigeMultiplier', 1);
    const [boughtSecrets, setBoughtSecrets] = usePersistentState('clicker_boughtSecrets', []);
    const [ownedBuildings, setOwnedBuildings] = usePersistentState('clicker_buildings', {});

    // --- CALCULS MATHÉMATIQUES ---
    const baseGps = useMemo(() => BUILDINGS.reduce((acc, b) => acc + (ownedBuildings[b.id] || 0) * b.gps, 0), [ownedBuildings]);
    const realGps = baseGps * globalSpeed * prestigeMultiplier;
    const realClickPower = (clickPower + (baseGps * clickSynergy)) * prestigeMultiplier;

    // --- BOUCLE DE JEU ---
    useEffect(() => {
        if (realGps > 0) {
            const interval = setInterval(() => setScore(prev => prev + (realGps / 10)), 100);
            return () => clearInterval(interval);
        }
    }, [realGps, setScore]);

    const addClick = () => {
        setScore(prev => prev + realClickPower);
        setTotalClicks(prev => prev + 1);
    };

    const buyBuilding = (id, cost) => {
        if (score >= cost) {
            setScore(prev => prev - cost);
            setOwnedBuildings(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
        }
    };

    const buyClickUpgrade = () => {
        if (score >= upgradeClickCost) {
            setScore(p => p - upgradeClickCost);
            setClickPower(p => p * 1.5);
            setUpgradeClickCost(p => Math.floor(p * 1.6));
        }
    };

    const buySynergyUpgrade = () => {
        if (score >= synergyCost) {
            setScore(p => p - synergyCost);
            setClickSynergy(p => p + 0.01);
            setSynergyCost(p => Math.floor(p * 2.5));
        }
    };

    const processSecretPurchase = (secret) => {
        if (score >= secret.cost && !boughtSecrets.includes(secret.id)) {
            setScore(p => p - secret.cost);
            secret.effect({ setClickPower, setGlobalSpeed, setClickSynergy });
            setBoughtSecrets(p => [...p, secret.id]);
        }
    };

    const activatePrestige = () => {
        if (score >= 1000000000) {
            if (window.confirm("ASCENSION : Tout effacer pour +1 Multiplicateur ?")) {
                setScore(0);
                setClickPower(1);
                setClickSynergy(0);
                setGlobalSpeed(1);
                setUpgradeClickCost(10);
                setSynergyCost(1000);
                setTotalClicks(0);
                setBoughtSecrets([]);
                setOwnedBuildings({});
                setPrestigeMultiplier(prev => prev + 1);
            }
        }
    };

    const hardResetGame = () => {
        if (window.confirm("Effacer la sauvegarde complète ?")) {
            setWiping(true);
            localStorage.clear();
            window.location.reload();
        }
    };

    const formatNumber = (num) => num >= 1000000000 ? num.toExponential(2).replace('+', '') : Math.floor(num).toLocaleString('fr-FR');
    const visibleSecrets = SECRETS.filter(s => !boughtSecrets.includes(s.id) && (s.type === 'clicks' ? totalClicks >= s.req : score >= s.req));

    const value = {
        score, realGps, realClickPower, globalSpeed, clickSynergy, prestigeMultiplier,
        upgradeClickCost, synergyCost, ownedBuildings, visibleSecrets,
        addClick, buyBuilding, buyClickUpgrade, buySynergyUpgrade, processSecretPurchase,
        activatePrestige, hardResetGame, formatNumber
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
import { useState, useEffect } from 'react';

export let isWiping = false;
export const setWiping = (val) => { isWiping = val; };

export function usePersistentState(key, defaultValue) {
    const [state, setState] = useState(() => {
        try {
            const saved = localStorage.getItem(key);
            if (saved !== null) {
                const parsed = JSON.parse(saved);
                if (typeof parsed === 'number' && isNaN(parsed)) return defaultValue;
                return parsed;
            }
        } catch (e) { console.error("Erreur de chargement", e); }
        return defaultValue;
    });

    useEffect(() => {
        if (!isWiping) {
            localStorage.setItem(key, JSON.stringify(state));
        }
    }, [key, state]);

    return [state, setState];
}
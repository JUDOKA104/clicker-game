import { useState } from 'react';
import { useGame } from '../context/GameContext';

export default function Clicker() {
    const { addClick, realClickPower, formatNumber } = useGame();
    const [clicks, setClicks] = useState([]);

    const handleMainClick = (e) => {
        addClick();

        const rect = e.target.getBoundingClientRect();
        const id = crypto.randomUUID();

        setClicks(prev => [...prev, {
            id,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            value: realClickPower
        }]);

        setTimeout(() => {
            setClicks(prev => prev.filter(c => c.id !== id));
        }, 800);
    };

    return (
        <button className="main-circle" onClick={handleMainClick}>
            {clicks.map((click) => (
                <span
                    key={click.id}
                    className="particle"
                    style={{ top: `${click.y}px`, left: `${click.x}px` }}
                >
          +{formatNumber(click.value)}
        </span>
            ))}
        </button>
    );
}
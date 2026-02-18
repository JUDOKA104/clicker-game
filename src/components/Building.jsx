export default function Building({ building, owned, score, formatNumber, onBuy }) {
    const cost = Math.floor(building.baseCost * Math.pow(1.15, owned));
    const canAfford = score >= cost;

    return (
        <button
            className={`building-row ${!canAfford ? 'disabled' : ''}`}
            onClick={() => onBuy(building.id, cost)}
            disabled={!canAfford}
        >
            <div className="b-icon">{building.icon}</div>
            <div className="b-details">
                <h3>{building.name}</h3>
                <p className="b-cost">{formatNumber(cost)} pts</p>
            </div>
            <div className="b-count">{owned}</div>
        </button>
    );
}
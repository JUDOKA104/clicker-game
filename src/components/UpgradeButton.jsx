export default function UpgradeButton({ title, desc, cost, score, formatNumber, onBuy, isSecret }) {
    return (
        <button
            className={`upgrade-btn ${isSecret ? 'secret-btn' : ''}`}
            disabled={score < cost}
            onClick={onBuy}
        >
            <strong>{title}</strong>
            {desc && <span style={{color: '#ccc', fontSize: '0.75rem'}}>{desc}</span>}
            <span>{formatNumber(cost)} pts</span>
        </button>
    );
}
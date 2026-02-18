export const BUILDINGS = [
    { id: 'b1', name: 'Curseur Auto', baseCost: 15, gps: 0.5, icon: '🖱️' },
    { id: 'b2', name: 'Apprenti', baseCost: 100, gps: 4, icon: '👨‍🎓' },
    { id: 'b3', name: 'Usine à Clics', baseCost: 1100, gps: 32, icon: '🏭' },
    { id: 'b4', name: 'Mine de Données', baseCost: 12000, gps: 260, icon: '⛏️' },
    { id: 'b5', name: 'Labo Spatial', baseCost: 130000, gps: 1400, icon: '🚀' },
    { id: 'b6', name: 'Réacteur Nucléaire', baseCost: 1500000, gps: 9500, icon: '☢️' },
    { id: 'b7', name: 'Portail Divin', baseCost: 20000000, gps: 85000, icon: '🌀' },
];

export const SECRETS = [
    { id: 's1', type: 'clicks', req: 100, cost: 500, name: 'Éveil Clic', desc: 'Clic x3', effect: (ctx) => ctx.setClickPower(p => p * 3) },
    { id: 's2', type: 'clicks', req: 500, cost: 5000, name: 'Frénésie', desc: 'Cycle à 0.80s', effect: (ctx) => ctx.setGlobalSpeed(p => p * 1.25) },
    { id: 's3', type: 'clicks', req: 2000, cost: 25000, name: 'Titane', desc: 'Clic x10', effect: (ctx) => ctx.setClickPower(p => p * 10) },
    { id: 's4', type: 'score', req: 50000, cost: 100000, name: 'Overclocking', desc: 'Cycle à 0.66s', effect: (ctx) => ctx.setGlobalSpeed(p => p * 1.5) },
    { id: 's5', type: 'score', req: 1000000, cost: 5000000, name: 'Fusion Clic', desc: 'Synergie +5%', effect: (ctx) => ctx.setClickSynergy(p => p + 0.05) },
    { id: 's6', type: 'score', req: 100000000, cost: 250000000, name: 'Distorsion', desc: 'Cycle à 0.50s', effect: (ctx) => ctx.setGlobalSpeed(p => p * 2) },
];
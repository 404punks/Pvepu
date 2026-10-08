/**
 * Launch checklist:
 * 1. Replace contractAddress after the token is created.
 * 2. Replace buyUrl with the live Pump.fun coin URL.
 * 3. Set isLive to true to enable the buy buttons.
 */
export const tokenConfig = {
  name: 'Pump Lolly Pop',
  symbol: 'LOLLY',
  contractAddress: 'CONTRACT_ADDRESS_COMING_SOON',
  buyUrl: '',
  isLive: false,
} as const

export const sourcePosts = [
  { id: '2108265460697624755', label: 'Custom Pairs announcement', type: 'Announcement' },
  { id: '2108265467249054125', label: 'The old PVP problem', type: 'Visual explainer' },
  { id: '2108265472080629853', label: 'A new PVE flywheel', type: 'Visual explainer' },
  { id: '2108265477588062696', label: 'Pair eligibility', type: 'FAQ' },
  { id: '2108265484810616848', label: 'Maximum pair depth', type: 'FAQ' },
  { id: '2108265500429947039', label: 'Fee protection', type: 'FAQ' },
  { id: '2108265506344231324', label: 'Multi-hop fee routing', type: 'Video' },
  { id: '2108265521967726904', label: 'The expanded whitelist', type: 'FAQ' },
  { id: '2108265528745750761', label: 'Pairing is permanent', type: 'FAQ' },
] as const

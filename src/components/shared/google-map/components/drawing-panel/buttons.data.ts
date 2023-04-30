export const buttons = [
  {
    status: '',
    text: 'Draw',
    action: 'draw',
  },
  {
    status: 'complete',
    text: 'Remove Boundary',
    action: 'reset',
  },
  {
    status: 'draw',
    text: 'Cancel',
    action: 'reset',
  },
  {
    status: 'draw',
    text: 'Apply',
    action: 'complete',
    disabled: true,
  },
];

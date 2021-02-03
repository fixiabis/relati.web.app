export const ShapePath = {
  '': '',
  '.': 'm 2.5 2 a 0.5 0.5 0 0 1 0 1 a 0.5 0.5 0 0 1 0 -1',
  '^': 'm 2.5 2 l 0.5 0.5 l -0.5 0.5 l -0.5 -0.5 z',
  '+': 'm 2.5 1.5 v 2 m -1 -1 h 2',
  '#': 'm 2 1 h -1 v 1 m 0 1 v 1 h 1 m 1 0 h 1 v -1 m 0 -1 v -1 h -1',
  O: 'm 2.5 1 a 1.5 1.5 0 0 1 0 3 a 1.5 1.5 0 0 1 0 -3',
  X: 'm 1 1 l 3 3 m 0 -3 l -3 3',
  D: 'm 2.5 1.5 l 1.5 2.5 l -3 0 z',
  U: 'm 1 1 l 0 3 l 3 0 l 0 -3 z',
  K: 'm 2.5 1 a 1.5 1.5 0 0 0 0 3 m 1.5 0 l -1.5 -1.5 l 1.5 -1.5',
  N:
    'm 2.5 1 a 1.5 1.5 0 0 1 1.5 1.5 m -3 0 a 1.5 1.5 0 0 0 1.5 1.5 m 1.5 0 l -3 -3',
};

export const ShapeColor = {
  '': '#ddd',
  O: 'crimson',
  X: 'royalblue',
  D: 'darkorange',
  U: 'seagreen',
  K: 'purple',
  N: '#888',
};

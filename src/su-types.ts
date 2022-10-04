export interface Cell {
  init?: boolean;
  val: number;
}

export interface Board {
  [idx: number]: Cell;
}

export interface Segment {
  // r1-r9: / c1-c9: /  g1-g9:
  [idx: string]: Cell[];
}

export const initRows: Segment = {
  r1: [], r2: [], r3: [], r4: [], r5: [], r6: [], r7: [], r8: [], r9: [],
}

export const initColumns: Segment = {
  c1: [], c2: [], c3: [], c4: [], c5: [], c6: [], c7: [], c8: [], c9: [],
}

// export interface Groups {
//   g1: Cell[];
//   g2: Cell[];
//   g3: Cell[];
//   g4: Cell[];
//   g5: Cell[];
//   g6: Cell[];
//   g7: Cell[];
//   g8: Cell[];
//   g9: Cell[];
// }
export const initGroups: Segment = {
  g1: [], g2: [], g3: [], g4: [], g5: [], g6: [], g7: [], g8: [], g9: [],
}

export interface SuCollection {
  rows: Segment;
  columns: Segment;
  groups: Segment;
}

const groupsIndexes = {
  1: [
    1, 2, 3,
    10, 11, 12,
    19, 20, 21
  ],
  2: [
    4, 5, 6,
    13, 14, 15,
    22, 23, 24
  ],
  3: [
    7, 8, 9,
    16, 17, 18,
    25, 26, 27
  ],
  4: [
    28, 29, 30,
    37, 38, 39,
    46, 47, 48,
  ],
  5: [
    31, 32, 33,
    40, 41, 42,
    49, 50, 51
  ],
  6: [
    34, 35, 36,
    43, 44, 45,
    52, 53, 54
  ],
  7: [
    55, 56, 57,
    64, 65, 66,
    73, 74, 75
  ],
  8: [
    58, 59, 60,
    67, 68, 69,
    76, 77, 78
  ],
  9: [
    61, 62, 63,
    70, 71, 72,
    79, 80, 81
  ],
};

// const groupsProcessed = new Set();

export const getGroupNumber = (cellNumber: number): number => {
  const entries = Object.entries(groupsIndexes);

  for (const entry of entries) {
    const [group, groupArray] = entry;
    const gNum = parseInt(group);

    if (groupArray.includes(cellNumber)) return gNum;
  }

  return 0;
};

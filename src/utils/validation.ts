import { Segment } from '../su-types';

const validateSegment = (segment: Segment) => {
  for (const idx in segment) {
    const segmentItem = segment[idx];
    const segmentItemValues: number[] = [];

    for (const cell of segmentItem) {
      if (cell.val === 0 || segmentItemValues.includes(cell.val)) return false;

      segmentItemValues.push(cell.val);
    }
  }

  return true;
};

export const validateData = ({ columns, rows, groups }: { columns: Segment; rows: Segment; groups: Segment }) => {
  return validateSegment(columns) || validateSegment(rows) || validateSegment(groups);
};

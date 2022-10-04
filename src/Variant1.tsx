import React, { useCallback, useEffect, useState } from 'react';
import Field, { BoardStyled } from './Field';
import { initData } from './init';
import {
  SuCollection,
  Board,
  Segment,
  Cell,
  initColumns,
  initGroups,
  initRows
} from './su-types';
import { getGroupNumber } from './utils/group.utils';
import styled from 'styled-components';
import { validateData } from './utils/validation';

const HeaderStyled = styled.div<{ check?: boolean }>`
  margin-bottom: ${({ check }) => check ? '1rem' : '3.4rem' };
`;

const MessageWrapper = styled.div`
  margin: 0.75rem 0 1.25rem;
  color: green;
  font-weight: bold;
  font-size: 1.5rem;
`
const ErrorMessageWrapper = styled(MessageWrapper)`
  color: red;
  font-size: 1.2rem;
`;


const Variant1 = () => {
  const [hasError, setHasError] = useState(false);
  const [check, setCheck] = useState(false);
  const [boardData, setBordData] = useState<Board>();

  // const initArr = [...(new Array(81))];
  const initArr = initData;
  const board: Board = {};

  let idx = 1;
  initArr.forEach(() => {
    const v = initArr[idx - 1];
    board[idx] = {
      val: v,
      init: v !== 0
    };
    idx++;
  });
  const boardKeys = Object.keys(board);

  /* ——————
  |  3 segments: 1) rows, 2) columns, 3) 9 groups 3x3.
  +———————— */
  const {
    rows,
    columns,
    groups,
  } = boardKeys.reduce((acc: SuCollection, currIdx, idx) => {
    const currIdxNum: number = parseInt(currIdx);
    const currCell: Cell = (boardData && boardData[currIdxNum]) || board[currIdxNum] ;
    const colNum: number = currIdxNum % 9 !== 0 ? currIdxNum % 9 : 9;
    const colName: string = `c${colNum}`;
    const rowNum: number = Math.ceil(currIdxNum / 9);
    const rowName: string = `r${rowNum}`;
    const gNum: number = getGroupNumber(currIdxNum);
    const gName: string = `g${gNum}`;

    return {
      ...acc,
      rows: {
        ...acc.rows,
        [rowName]: [
          ...acc.rows[rowName as keyof Segment],
          currCell
        ]
      },
      columns: {
        ...acc.columns,
        [colName]: [
          ...acc.columns[colName as keyof Segment],
          currCell
        ]
      },
      groups: {
        ...acc.groups,
        [gName]: [
          ...acc.groups[gName as keyof Segment],
          currCell
        ]
      },
    };
  }, {
    rows: initRows,
    columns: initColumns,
    groups: initGroups,
  });

  const handleCellInput = useCallback((cellIdx: number, value: number) => {
    setBordData(boardData && {
      ...boardData,
      [cellIdx]: {
        ...boardData[cellIdx],
        val: value
      },
    });
  }, [boardData]);

  const handleCheckClick = () => {
    const validated = validateData({ columns, rows, groups });
    setHasError(!validated);
    setCheck(true);
  }

  const handleBoardClick = () => {
    if (check) setCheck(false);
  }

  useEffect(() => {
    setBordData(board);
  }, []);


  return (
    <>
      <HeaderStyled check={check}>
        <button onClick={handleCheckClick}>Check answers</button>
        {check && hasError && <ErrorMessageWrapper>error message</ErrorMessageWrapper>}
        {check && !hasError && <MessageWrapper>Completed!</MessageWrapper>}
      </HeaderStyled>

      <BoardStyled onClick={handleBoardClick}>
        {boardData && boardKeys.map((key) => {
          const currIdxNum = parseInt(key);
          const currCell = boardData[currIdxNum];

          return (
            <Field
              key={currIdxNum}
              val={currCell.init ? currCell.val : undefined}
              cellIdx={currIdxNum}
              isInit={currCell.init}
              handleCellInput={handleCellInput}
            />
          );
        })}
      </BoardStyled>
    </>
  );
};

export default Variant1;

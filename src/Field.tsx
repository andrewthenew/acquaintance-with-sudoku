import React, { FC, FormEvent, useRef, useState } from 'react';
import styled from 'styled-components';

export const BoardStyled = styled.div`
  display: grid;
  grid-template-rows: [r1-start] repeat(9, 1fr) [r-end];
  grid-template-columns: repeat(9, 1fr);

  width: min-content;
`;

const InputStyled = styled.input<{ isInit?: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  margin: 0;
  font-size: ${({ isInit }) => isInit ? '1.75rem' : '1.35rem'};
  text-align: center;
  outline: none;
  border: 0.045rem solid #bab9b9;
  ${({ isInit }) => isInit && 'font-weight: bold;'}
  background: ${({ isInit }) => isInit ? '#f1f5f5' : '#fbffff'};
  color: ${({ isInit }) => isInit ? '#000' : '#1c5c5c'};

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
  }

  &:nth-of-type(3n) {
    border-right: 1px solid black;
  }
`;


const Field: FC<{
  isInit?: boolean;
  val?: number;
  cellIdx: number;
  handleCellInput?: (cellIdx: number, value: number) => void;
}> = ({
  isInit = false,
  val,
  cellIdx,
  handleCellInput,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [lastVal, setLastVal] = useState<number | null>(0);

  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    let val = parseInt(target.value);

    if (!inputRef || !inputRef.current) return;

    if (isNaN(val) || ['', 0].includes(val)) {
      inputRef.current.value = '';
      setLastVal(null);
      if (handleCellInput && Boolean(lastVal)) handleCellInput(cellIdx, 0);
    }
    else if (val < 1 || val > 9) {
      inputRef.current.value = `${lastVal}`;
    }
    else {
      setLastVal(val);
      if (handleCellInput) handleCellInput(cellIdx, val);
    }
  };


  return (
    <InputStyled
      ref={inputRef}
      type="number"
      disabled={isInit}
      isInit={isInit}
      min={1}
      max={9}
      onInput={handleChange}
      value={val}
    />
  );
};

export default Field;

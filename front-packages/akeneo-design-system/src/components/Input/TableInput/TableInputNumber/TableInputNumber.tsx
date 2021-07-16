import {TableInputRow} from '../TableInputRow/TableInputRow';
import styled, {css} from 'styled-components';
import {NumberInput} from '../../NumberInput/NumberInput';
import {AkeneoThemedProps, getColor} from '../../../../theme';

const TableInputNumber = styled(NumberInput)<{highlighted: boolean; inError: boolean} & AkeneoThemedProps>`
  height: 39px;
  padding-left: 10px;
  padding-right: 35px;
  border-radius: 0;
  border: none;
  background: none;

  ${({highlighted, inError}) =>
    highlighted &&
    !inError &&
    css`
      background: ${getColor('green', 10)};
      box-shadow: 0 0 0 1px ${getColor('green', 80)};
    `};

  ${({inError}) =>
    inError &&
    css`
      background: ${getColor('red', 10)};
      box-shadow: 0 0 0 1px ${getColor('red', 80)};
    `};

  &:focus {
    box-shadow: 0 0 0 1px ${getColor('grey', 100)};
  }
`;

TableInputRow.displayName = 'TableInput.NumberInput';

export {TableInputNumber};

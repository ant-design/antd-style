import { Box } from '@material-ui/core';

import { FC, PropsWithChildren } from 'react';
import { NUM_CARDS } from '../../const';

const MuiBoxContainer: FC<PropsWithChildren> = ({ children }) => (
  <Box border="1px dashed #ccc" padding="4px" height="150px" overflow="auto" width="120px">
    {children}
  </Box>
);

const MuiBoxCardContainer: FC<PropsWithChildren> = ({ children }) => (
  <Box border="1px solid #ccc" display="flex" marginBottom="4px" padding="4px" fontSize="12px">
    {children}
  </Box>
);
const MuiBoxItemOne = () => <Box width="5px" height="5px" ml="5px" bgcolor="red" />;
const MuiBoxItemTwo = () => <Box width="5px" height="5px" ml="5px" bgcolor="orange" />;
const MuiBoxItemThree = () => <Box width="5px" height="5px" ml="5px" bgcolor="yellow" />;
const MuiBoxItemFour = () => <Box width="5px" height="5px" ml="5px" bgcolor="green" />;
const MuiBoxItemFive = () => <Box width="5px" height="5px" ml="5px" bgcolor="blue" />;
const MuiBoxItemSix = () => <Box width="5px" height="5px" ml="5px" bgcolor="violet" />;
const MuiBoxItemSeven = () => <Box width="5px" height="5px" ml="5px" bgcolor="pink" />;

const MuiBox: FC = () => (
  <MuiBoxContainer>
    {new Array(NUM_CARDS).fill(0).map((_, i) => (
      <MuiBoxCardContainer key={i}>
        Card {i}
        <MuiBoxItemOne />
        <MuiBoxItemTwo />
        <MuiBoxItemThree />
        <MuiBoxItemFour />
        <MuiBoxItemFive />
        <MuiBoxItemSix />
        <MuiBoxItemSeven />
      </MuiBoxCardContainer>
    ))}
  </MuiBoxContainer>
);

export default MuiBox;

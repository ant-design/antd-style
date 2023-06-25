import { styled } from '@material-ui/core';

import { NUM_CARDS } from '../../const';

const StyledThemeContainer = styled('div')(({ theme }) => ({
  border: '1px dashed #ccc',
  padding: '4px',
  height: '150px',
  overflow: 'auto',
  width: '120px',
}));

const StyledThemeCardContainer = styled('div')(({ theme }) => ({
  border: '1px solid #ccc',
  display: 'flex',
  marginBottom: '4px',
  padding: '4px',
  fontSize: '12px',
}));

const StyledThemeItemOne = styled('div')(({ theme }) => ({
  width: '5px',
  height: '5px',
  marginLeft: '5px',
  background: 'red',
}));

const StyledThemeItemTwo = styled('div')(({ theme }) => ({
  width: '5px',
  height: '5px',
  marginLeft: '5px',
  background: 'orange',
}));

const StyledThemeItemThree = styled('div')(({ theme }) => ({
  width: '5px',
  height: '5px',
  marginLeft: '5px',
  background: 'yellow',
}));

const StyledThemeItemFour = styled('div')(({ theme }) => ({
  width: '5px',
  height: '5px',
  marginLeft: '5px',
  background: 'green',
}));

const StyledThemeItemFive = styled('div')(({ theme }) => ({
  width: '5px',
  height: '5px',
  marginLeft: '5px',
  background: 'blue',
}));

const StyledThemeItemSix = styled('div')(({ theme }) => ({
  width: '5px',
  height: '5px',
  marginLeft: '5px',
  background: 'violet',
}));

const StyledThemeItemSeven = styled('div')(({ theme }) => ({
  width: '5px',
  height: '5px',
  marginLeft: '5px',
  background: 'pink',
}));

const MuiStyledThemeTable = () => (
  <StyledThemeContainer>
    {new Array(NUM_CARDS).fill(0).map((_, i) => (
      <StyledThemeCardContainer key={i}>
        Card {i}
        <StyledThemeItemOne />
        <StyledThemeItemTwo />
        <StyledThemeItemThree />
        <StyledThemeItemFour />
        <StyledThemeItemFive />
        <StyledThemeItemSix />
        <StyledThemeItemSeven />
      </StyledThemeCardContainer>
    ))}
  </StyledThemeContainer>
);

export default MuiStyledThemeTable;

import { styled } from '@material-ui/core';

import { NUM_CARDS } from '../../const';

const StyledContainer = styled('div')({
  border: '1px dashed #ccc',
  padding: '4px',
  height: '150px',
  overflow: 'auto',
  width: '120px',
});

const StyledCardContainer = styled('div')({
  border: '1px solid #ccc',
  display: 'flex',
  marginBottom: '4px',
  padding: '4px',
  fontSize: '12px',
});

const StyledItemOne = styled('div')({
  width: '5px',
  height: '5px',
  marginLeft: '5px',
  background: 'red',
});

const StyledItemTwo = styled('div')({
  width: '5px',
  height: '5px',
  marginLeft: '5px',
  background: 'orange',
});

const StyledItemThree = styled('div')({
  width: '5px',
  height: '5px',
  marginLeft: '5px',
  background: 'yellow',
});

const StyledItemFour = styled('div')({
  width: '5px',
  height: '5px',
  marginLeft: '5px',
  background: 'green',
});

const StyledItemFive = styled('div')({
  width: '5px',
  height: '5px',
  marginLeft: '5px',
  background: 'blue',
});

const StyledItemSix = styled('div')({
  width: '5px',
  height: '5px',
  marginLeft: '5px',
  background: 'violet',
});

const StyledItemSeven = styled('div')({
  width: '5px',
  height: '5px',
  marginLeft: '5px',
  background: 'pink',
});

function MuiStyledTable(props) {
  return (
    <StyledContainer>
      {new Array(NUM_CARDS).fill(0).map((_, i) => (
        <StyledCardContainer key={i}>
          Card {i}
          <StyledItemOne />
          <StyledItemTwo />
          <StyledItemThree />
          <StyledItemFour />
          <StyledItemFive />
          <StyledItemSix />
          <StyledItemSeven />
        </StyledCardContainer>
      ))}
    </StyledContainer>
  );
}

export default MuiStyledTable;

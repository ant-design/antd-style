import { styled } from 'styled-components';

import { NUM_CARDS } from '../../const';

const EmotionStyledContainer = styled.div`
  border: 1px dashed #ccc;
  padding: 4px;
  height: 150px;
  overflow: auto;
  width: 120px;
`;

const EmotionStyledCardContainer = styled.div`
  border: 1px solid #ccc;
  display: flex;
  margin-bottom: 4px;
  padding: 4px;
  font-size: 12px;
`;

const EmotionStyledItemOne = styled.div`
  width: 5px;
  height: 5px;
  margin-left: 5px;
  background: red;
`;

const EmotionStyledItemTwo = styled.div`
  width: 5px;
  height: 5px;
  margin-left: 5px;
  background: orange;
`;

const EmotionStyledItemThree = styled.div`
  width: 5px;
  height: 5px;
  margin-left: 5px;
  background: yellow;
`;

const EmotionStyledItemFour = styled.div`
  width: 5px;
  height: 5px;
  margin-left: 5px;
  background: green;
`;

const EmotionStyledItemFive = styled.div`
  width: 5px;
  height: 5px;
  margin-left: 5px;
  background: blue;
`;

const EmotionStyledItemSix = styled.div`
  width: 5px;
  height: 5px;
  margin-left: 5px;
  background: violet;
`;

const EmotionStyledItemSeven = styled.div`
  width: 5px;
  height: 5px;
  margin-left: 5px;
  background: pink;
`;

function StyledComponentTable() {
  return (
    <EmotionStyledContainer>
      {new Array(NUM_CARDS).fill(0).map((_, i) => (
        <EmotionStyledCardContainer key={i}>
          Card {i}
          <EmotionStyledItemOne />
          <EmotionStyledItemTwo />
          <EmotionStyledItemThree />
          <EmotionStyledItemFour />
          <EmotionStyledItemFive />
          <EmotionStyledItemSix />
          <EmotionStyledItemSeven />
        </EmotionStyledCardContainer>
      ))}
    </EmotionStyledContainer>
  );
}

export default StyledComponentTable;

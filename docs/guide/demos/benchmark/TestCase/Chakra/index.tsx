import { Box } from '@chakra-ui/react';

import { NUM_CARDS } from '../../const';

const ChakraContainer = ({ children }) => (
  <Box border="1px dashed #ccc" padding="4px" height="150px" overflow="auto" width="120px">
    {children}
  </Box>
);

const ChakraCardContainer = ({ children }) => (
  <Box border="1px solid #ccc" display="flex" marginBottom="4px" padding="4px" fontSize="12px">
    {children}
  </Box>
);
const ChakraItemOne = () => <Box width="5px" height="5px" marginLeft="5px" background="red" />;
const ChakraItemTwo = () => <Box width="5px" height="5px" marginLeft="5px" background="orange" />;
const ChakraItemThree = () => <Box width="5px" height="5px" marginLeft="5px" background="yellow" />;
const ChakraItemFour = () => <Box width="5px" height="5px" marginLeft="5px" background="green" />;
const ChakraItemFive = () => <Box width="5px" height="5px" marginLeft="5px" background="blue" />;
const ChakraItemSix = () => <Box width="5px" height="5px" marginLeft="5px" background="violet" />;
const ChakraItemSeven = () => <Box width="5px" height="5px" marginLeft="5px" background="pink" />;

function Chakra() {
  return (
    <ChakraContainer>
      {new Array(NUM_CARDS).fill(0).map((_, i) => (
        <ChakraCardContainer key={i}>
          Card {i}
          <ChakraItemOne />
          <ChakraItemTwo />
          <ChakraItemThree />
          <ChakraItemFour />
          <ChakraItemFive />
          <ChakraItemSix />
          <ChakraItemSeven />
        </ChakraCardContainer>
      ))}
    </ChakraContainer>
  );
}

export default Chakra;

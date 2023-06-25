import { Center, Flexbox } from 'react-layout-kit';
import { TestCases } from '../TestCase';
import { TestSuit } from './TestSuit';

export const TestResult = () => {
  return (
    <Flexbox gap={24}>
      {TestCases.map((item) => (
        <Flexbox horizontal gap={24}>
          <Center width={100}>{item.name}</Center>
          <Flexbox horizontal gap={8}>
            {item.cases.map((testCase) => (
              <TestSuit key={testCase.name} name={testCase.name} Component={testCase.component} />
            ))}
          </Flexbox>
        </Flexbox>
      ))}
    </Flexbox>
  );
};

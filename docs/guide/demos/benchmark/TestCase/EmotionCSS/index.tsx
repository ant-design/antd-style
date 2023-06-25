import { css } from '@emotion/css';

import { NUM_CARDS } from '../../const';

const container = css`
  border: 1px dashed #ccc;
  padding: 4px;
  height: 150px;
  overflow: auto;
  width: 120px;
`;

const card = css`
  border: 1px solid #ccc;
  display: flex;
  margin-bottom: 4px;
  padding: 4px;
  font-size: 12px;
`;

const one = css`
  width: 5px;
  height: 5px;
  margin-left: 5px;
  background: red;
`;

const two = css`
  width: 5px;
  height: 5px;
  margin-left: 5px;
  background: orange;
`;

const three = css`
  width: 5px;
  height: 5px;
  margin-left: 5px;
  background: yellow;
`;

const four = css`
  width: 5px;
  height: 5px;
  margin-left: 5px;
  background: green;
`;

const five = css`
  width: 5px;
  height: 5px;
  margin-left: 5px;
  background: blue;
`;

const six = css`
  width: 5px;
  height: 5px;
  margin-left: 5px;
  background: violet;
`;

const seven = css`
  width: 5px;
  height: 5px;
  margin-left: 5px;
  background: pink;
`;

const EmotionCSS = () => (
  <div className={container}>
    {new Array(NUM_CARDS).fill(0).map((_, i) => (
      <div className={card} key={i}>
        Card {i}
        <div className={one} />
        <div className={two} />
        <div className={three} />
        <div className={four} />
        <div className={five} />
        <div className={six} />
        <div className={seven} />
      </div>
    ))}
  </div>
);

export default EmotionCSS;

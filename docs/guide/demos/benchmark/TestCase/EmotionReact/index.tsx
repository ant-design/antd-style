/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { NUM_CARDS } from '../../const';

const EmotionReactCSS = () => (
  <div
    css={css`
      border: 1px dashed #ccc;
      padding: 4px;
      height: 150px;
      overflow: auto;
      width: 120px;
    `}
  >
    {new Array(NUM_CARDS).fill(0).map((_, i) => (
      <div
        css={css`
          border: 1px solid #ccc;
          display: flex;
          margin-bottom: 4px;
          padding: 4px;
          font-size: 12px;
        `}
        key={i}
      >
        Card {i}
        <div
          css={css`
            width: 5px;
            height: 5px;
            margin-left: 5px;
            background: red;
          `}
        />
        <div
          css={css`
            width: 5px;
            height: 5px;
            margin-left: 5px;
            background: orange;
          `}
        />
        <div
          css={css`
            width: 5px;
            height: 5px;
            margin-left: 5px;
            background: yellow;
          `}
        />
        <div
          css={css`
            width: 5px;
            height: 5px;
            margin-left: 5px;
            background: green;
          `}
        />
        <div
          css={css`
            width: 5px;
            height: 5px;
            margin-left: 5px;
            background: blue;
          `}
        />
        <div
          css={css`
            width: 5px;
            height: 5px;
            margin-left: 5px;
            background: violet;
          `}
        />
        <div
          css={css`
            width: 5px;
            height: 5px;
            margin-left: 5px;
            background: pink;
          `}
        />
      </div>
    ))}
  </div>
);

export default EmotionReactCSS;

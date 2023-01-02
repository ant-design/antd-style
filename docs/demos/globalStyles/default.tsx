import { createGlobalStyle } from 'antd-style';

const Global = createGlobalStyle`
  .some-class {
    color: hotpink;
  }

`;

export default () => {
  return (
    <div>
      <Global />
      <div className="some-class">猛男最喜欢的颜色</div>
    </div>
  );
};

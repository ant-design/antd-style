import { Select } from 'antd';
import { createStyles } from 'antd-style';
import { FC, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

const useStyles = createStyles(
  ({ token, css, prefixCls }, { id, open }: { id: string; open: boolean }) => {
    const isSelected1 = id === '1';
    const selected1 = css`
      box-shadow: ${token.boxShadowSecondary};
      border-radius: 50%;

      // 修改选中元素的背景色和文本色
      &.${prefixCls}-select-single {
        .${prefixCls}-select-selector {
          background: ${token.colorPrimary};
          color: ${token.colorFillContent};
          border-color: transparent;
        }
      }

      .${prefixCls}-select-arrow {
        color: ${token.colorTextLightSolid};
      }
    `;

    return {
      select: css`
        .${prefixCls}-select-selector {
          border-color: ${open ? token.colorSuccess : ''} !important;
          box-shadow: ${open ? 'none' : ''} !important;
        }

        ${isSelected1 ? selected1 : ''}
      `,
    };
  },
);

interface SelectItemProps {
  value: string;
  onChange?: (value: string) => void;
}

const SelectItem: FC<SelectItemProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const { styles } = useStyles({ open, id: value });

  return (
    <Select
      open={open}
      onClick={() => {
        if (!open) setOpen(true);
      }}
      className={styles.select}
      options={[
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
        { label: '选项3', value: '3' },
      ]}
      value={value}
      onSelect={(e) => {
        onChange?.(e);
        setOpen(false);
      }}
    />
  );
};

const App = () => {
  const [id, setId] = useState<string>('2');
  const [id2, setId2] = useState<string>('1');

  return (
    <Flexbox gap={8}>
      打开面板时，描边会变色 / 当选中选项1时，变成主色样式
      <Flexbox horizontal gap={24}>
        <SelectItem value={id} onChange={setId} />
        <SelectItem value={id2} onChange={setId2} />
      </Flexbox>
    </Flexbox>
  );
};

export default App;

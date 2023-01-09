/**
 * iframe: 200
 */
import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input, InputRef } from 'antd';
import React, { useRef, useState } from 'react';

import classNames from 'classnames';
import useStyles from './style';

const HeaderSearch: React.FC = () => {
  const [searchMode, setSearchMode] = useState(false);
  const { styles } = useStyles();

  const inputRef = useRef<InputRef | null>(null);

  const inputClass = classNames(styles.input, searchMode ? styles.show : '');

  return (
    <div className={styles.container}>
      <div
        className={styles.headerSearch}
        onClick={() => {
          setSearchMode(true);
          inputRef.current?.focus();
        }}
      >
        <SearchOutlined
          key="Icon"
          style={{
            cursor: 'pointer',
          }}
        />
        <AutoComplete key="AutoComplete" className={inputClass}>
          <Input
            ref={inputRef}
            size="small"
            onBlur={() => {
              setSearchMode(false);
            }}
          />
        </AutoComplete>
      </div>
    </div>
  );
};

export default HeaderSearch;

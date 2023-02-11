import { ArrowRightOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { Link } from 'dumi';
import { CSSProperties, type FC } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import { useStyles } from './style';

export interface Feature {
  title: string;
  description?: string;
  avatar?: string;
  link?: string;
  imageStyle?: any;
  row?: number;
  column?: number;
  center?: boolean;
}

interface FeaturesProps {
  items: Feature[];
  style?: CSSProperties;
}

const Features: FC<FeaturesProps> = ({ items, style }) => {
  const { styles, cx, theme } = useStyles();

  if (!Boolean(items?.length)) return null;

  return (
    <div className={styles.container} style={style}>
      {items!.map(({ title, description, avatar, link, imageStyle, row, column, center }) => {
        return (
          <div
            key={title}
            className={cx(styles.cell)}
            style={{
              gridRow: `span ${row || 7}`,
              gridColumn: `span ${column || 1}`,
            }}
          >
            {avatar && (
              <Center
                padding={4}
                width={24}
                height={24}
                image-style={imageStyle}
                className={cx(styles.imgContainer)}
              >
                <img className={styles.img} src={avatar} alt={title} />
              </Center>
            )}
            {title && (
              <Flexbox as={'h3'} horizontal gap={8} align={'center'}>
                {title}
                {imageStyle === 'soon' ? (
                  <Tag
                    color={theme.isDarkMode ? 'pink-inverse' : 'cyan-inverse'}
                    // style={{ border: 'none' }}
                  >
                    SOON
                  </Tag>
                ) : null}
              </Flexbox>
            )}
            {description && <p dangerouslySetInnerHTML={{ __html: description }} />}{' '}
            {link && (
              <div className={styles.link}>
                <Link to={link}>
                  立即了解 <ArrowRightOutlined />
                </Link>
              </div>
            )}
            {center && <div className={styles.blur} />}
          </div>
        );
      })}
    </div>
  );
};

export default Features;

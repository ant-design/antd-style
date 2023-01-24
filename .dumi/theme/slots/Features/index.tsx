import { type FC } from 'react';
import { shallow } from 'zustand/shallow';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'dumi';
import { Center } from 'react-layout-kit';
import { featuresSel, useSiteStore } from '../../store/useSiteStore';
import { useStyles } from './style';

const Features: FC = () => {
  const features = useSiteStore(featuresSel, shallow);

  const { styles, cx } = useStyles();

  if (!Boolean(features?.length)) return null;

  return (
    <Center style={{ marginTop: 80 }}>
      <div className={styles.container}>
        {features!.map(({ title, description, image, link, imageStyle }) => {
          return (
            <div key={title} className={styles.cell}>
              {image && (
                <Center
                  padding={4}
                  width={24}
                  height={24}
                  image-style={imageStyle}
                  className={cx(styles.imgContainer)}
                >
                  <img className={styles.img} src={image} alt={title} />
                </Center>
              )}
              {title && <h3>{title}</h3>}
              {description && <p dangerouslySetInnerHTML={{ __html: description }} />}
              {link && (
                <div className={styles.link}>
                  <Link to={link}>
                    立即了解 <ArrowRightOutlined />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Center>
  );
};

export default Features;

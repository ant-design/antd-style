import { makeStyles } from '@material-ui/core';

import { NUM_CARDS } from '../../const';

const sharedItemStyles = {
  width: '5px',
  height: '5px',
  marginLeft: '5px',
};

const useStaticStyles = makeStyles({
  container: {
    border: '1px dashed #ccc',
    padding: '4px',
    height: '150px',
    overflow: 'auto',
    width: '120px',
  },
  cardContainer: {
    border: '1px solid #ccc',
    display: 'flex',
    marginBottom: '4px',
    padding: '4px',
    fontSize: '12px',
  },
  itemOne: {
    ...sharedItemStyles,
    background: 'red',
  },
  itemTwo: {
    ...sharedItemStyles,
    background: 'orange',
  },
  itemThree: {
    ...sharedItemStyles,
    background: 'yellow',
  },
  itemFour: {
    ...sharedItemStyles,
    background: 'green',
  },
  itemFive: {
    ...sharedItemStyles,
    background: 'blue',
  },
  itemSix: {
    ...sharedItemStyles,
    background: 'violet',
  },
  itemSeven: {
    ...sharedItemStyles,
    background: 'pink',
  },
});

function MuiStaticTable(props) {
  const classes = useStaticStyles();
  return (
    <div className={classes.container}>
      {new Array(NUM_CARDS).fill(0).map((_, i) => (
        <div className={classes.cardContainer} key={i}>
          Card {i}
          <div className={classes.itemOne} />
          <div className={classes.itemTwo} />
          <div className={classes.itemThree} />
          <div className={classes.itemFour} />
          <div className={classes.itemFive} />
          <div className={classes.itemSix} />
          <div className={classes.itemSeven} />
        </div>
      ))}
    </div>
  );
}
export default MuiStaticTable;

export default {
  entry: 'src/index.ts',
  cjs: 'babel',
  esm: {
    type: 'babel',
    importLibToEs: true,
  },
};

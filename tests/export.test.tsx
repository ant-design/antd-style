describe('export', () => {
  it('should work', async () => {
    const all = await import('antd-style');

    expect(Object.keys(all)).toMatchSnapshot();
  });
});

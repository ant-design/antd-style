import Previewer from 'dumi/theme-original/builtins/Previewer';

import DemoProvider from '../../components/DemoProvider';

export default (props: any) => (
  <DemoProvider>
    <Previewer {...props} />
  </DemoProvider>
);

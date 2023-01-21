import { useContext } from 'react';

import { StyleUtilsContext, type CommonStyleUtils } from '@/context/StyleUtilsContext';

export const useStyleUtils = (): CommonStyleUtils => useContext(StyleUtilsContext);

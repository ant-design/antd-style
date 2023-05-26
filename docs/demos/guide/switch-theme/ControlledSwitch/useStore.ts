import { ThemeMode } from 'antd-style';
import { create } from 'zustand';

export const useStore = create<ThemeMode>(() => 'dark');

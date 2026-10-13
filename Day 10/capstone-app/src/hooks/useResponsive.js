import { useWindowDimensions, Platform } from 'react-native';
import { breakpoints } from '../utils/theme';

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isMobile = width < breakpoints.tablet;
  const isTablet = width >= breakpoints.tablet && width < breakpoints.desktop;
  const isDesktop = width >= breakpoints.desktop;
  const isWide = width >= breakpoints.wide;
  const isWeb = Platform.OS === 'web';

  // Grid columns
  const gridColumns = isWide ? 5
    : isDesktop ? 4
    : isTablet ? 3
    : 2;

  // Content container max-width
  const contentMaxWidth = isDesktop ? 1000 : '100%';

  // Horizontal padding
  const hPad = isWide ? 32 : isDesktop ? 24 : isTablet ? 20 : 16;

  // Stats grid — 3 columns mobile, 3 desktop
  const statsColumns = isDesktop ? 3 : isMobile ? 3 : 3;

  return {
    width, height,
    isMobile, isTablet, isDesktop, isWide, isWeb,
    gridColumns, contentMaxWidth, hPad, statsColumns,
  };
}
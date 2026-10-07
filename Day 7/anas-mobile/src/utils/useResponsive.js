import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isPhone = width < 600;
  const isTablet = width >= 600 && width < 1024;
  const isDesktop = width >= 1024;

  // Product grid columns
  const gridColumns = isPhone ? 2 : isTablet ? 3 : 4;

  // Max content width (content centers on wide screens)
  const maxWidth = isPhone ? width : isTablet ? 900 : 1200;

  // Horizontal padding
  const hPad = isPhone ? 16 : isTablet ? 24 : 32;

  // Card image aspect ratio
  const cardAspect = isPhone ? 1 : isTablet ? 1.15 : 1.1;

  return {
    width,
    height,
    isPhone,
    isTablet,
    isDesktop,
    gridColumns,
    maxWidth,
    hPad,
    cardAspect,
  };
}
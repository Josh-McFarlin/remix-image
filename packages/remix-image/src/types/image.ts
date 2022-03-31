export type ResponsiveSize = {
  size: {
    width: number;
    height?: number;
  };
  maxWidth?: number;
};

/** RGBA hex values 0...255 */
export type Color = [number, number, number, number];

export const generateKey = (
  src: string,
  width: string,
  quality: string,
  webp: boolean
) => `${width}_${quality}_${src}_${webp}`;

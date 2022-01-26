import { fsResolver, fetchResolver } from "../server/resolvers";
import type { Resolver } from "../types/resolver";

export const fetchImage: Resolver = async (
  src: string,
  build
): Promise<{
  buffer: Buffer;
  contentType: string;
}> => {
  if (src.startsWith("/") && (src.length === 1 || src[1] !== "/")) {
    return fsResolver(src, build);
  } else {
    return fetchResolver(src);
  }
};

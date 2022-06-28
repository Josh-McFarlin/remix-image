export const textResponse = (status: number, message = ""): Response =>
  new Response(message, {
    status,
  });

export const imageResponse = (
  file: Uint8Array,
  status: number,
  contentType: string,
  cacheControl: string
): Response =>
  new Response(file, {
    status,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": cacheControl,
    },
  });

export const redirectResponse = (location: string): Response =>
  new Response(null, {
    status: 302,
    headers: {
      Location: location,
    },
  });

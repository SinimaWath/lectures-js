/// <reference types="vite/client" />

declare module "*.lesson" {
  const cards: ReadonlyArray<{
    id: string;
    title: string;
    description: string;
    reason: string;
  }>;

  export function toString() {}

  export default cards;
}

declare module "virtual:lecture-meta" {
  export const pluginMeta: {
    pluginName: string;
    hmrEvent: string;
    chunkName: string;
    note: string;
  };
}

declare module "*.svg" {
  const svg: string;
  export default svg;
}

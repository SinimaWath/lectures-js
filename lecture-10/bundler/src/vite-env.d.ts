/// <reference types="vite/client" />

declare module "*.lesson" {
  const cards: ReadonlyArray<{
    id: string;
    title: string;
    description: string;
    reason: string;
  }>;

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

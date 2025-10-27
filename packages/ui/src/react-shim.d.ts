declare module 'react' {
  export type ReactNode = unknown;
  export type ReactElement = unknown;
  export interface FC<P = Record<string, unknown>> {
    (props: P & { children?: ReactNode }): ReactElement | null;
  }
}

declare module 'react-dom/server' {
  export function renderToString(node: unknown): string;
}

declare module 'react/jsx-runtime' {
  export const jsx: unknown;
  export const jsxs: unknown;
  export const Fragment: unknown;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: unknown;
  }
}

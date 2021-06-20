declare module "kvdb.io" {
  export function bucket(a: string, b?: string): any;
  export function get(a: string): any;
  export function set(a: string, b: string, c?: any): any;
}

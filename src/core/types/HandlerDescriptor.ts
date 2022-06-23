export interface HandlerDescriptor extends PropertyDescriptor {
  value?: (...args: any) =>
    | string
    | {
        [key: string]: string | any[] | { [key: string]: any };
      }
    | Promise<any>;
}

interface Class {
    prototype: object;
    super_: Class;
    [key: string]: unknown;
}
export default function inherits(child: Class, parent: Class): void;
export {};

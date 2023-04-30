export function validateForm(...args: string[]): boolean {
  return args.every((arg: string) => !arg.trim());
}

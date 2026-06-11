export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ')
}
//mehrere CSS-Klassen kombiniert und ungültige Werte automatisch entfernt

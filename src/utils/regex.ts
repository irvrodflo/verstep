export function findLineByRegex(
  lines: string[],
  regex: RegExp,
  strategy: 'partial' | 'total' = 'total'
): string | null {
  return lines.find(l => testRegex(l, regex, strategy)) || null;
}

export function testRegex(
  input: string,
  regex: RegExp,
  strategy: 'partial' | 'total' = 'total'
): boolean {
  let pattern = regex.source;
  const flags = regex.flags;

  if (strategy === 'partial') {
    if (pattern.startsWith('^')) pattern = pattern.slice(1);
    if (pattern.endsWith('$')) pattern = pattern.slice(0, -1);
  } else if (strategy === 'total') {
    if (!pattern.startsWith('^')) pattern = '^' + pattern;
    if (!pattern.endsWith('$')) pattern = pattern + '$';
  }

  const adjustedRegex = new RegExp(pattern, flags);

  return adjustedRegex.test(input);
}

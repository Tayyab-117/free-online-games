export const cls = (...x: (string | false | undefined)[]) => x.filter(Boolean).join(" ");

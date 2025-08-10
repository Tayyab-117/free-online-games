export const cls = (...x: (string | false | undefined)[]) => x.filter(Boolean).join(" ");
export const safe = (s: string) => s.replace(/</g,"&lt;").replace(/>/g,"&gt;");

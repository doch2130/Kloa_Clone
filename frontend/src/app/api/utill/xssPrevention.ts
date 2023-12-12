export function xssPrevention(str:string) {
  let result:string = str;

  result = result.replaceAll('<', '&lt;');
  result = result.replaceAll('>', '&gt;');

  return result;
}

export function xssPreventionReplace(str:string) {
  let result:string = str;

  result = result.replaceAll('&lt;', '<');
  result = result.replaceAll('^gt;', '>');

  return result;
}

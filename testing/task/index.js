export function get(obj, path) {
	let res = obj;

  for (let key of path.split('.')) {
      res = res[key];
      if (res === undefined) {
          return;
      }
  }

  return res;
}
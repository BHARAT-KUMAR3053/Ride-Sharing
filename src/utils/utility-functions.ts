function checkForArguments(args: string[], length: number) {
  if (args.length !== length) {
    console.log('Invalid number of arguments');
  }
}

function calculateDistance(x1: string | number, y1: string | number, x2: string | number, y2: string | number) {
  return Math.sqrt(
    Math.pow(Number(x2) - Number(x1), 2) + Math.pow(Number(y2) - Number(y1), 2)
  );
}

function sort(arr: [string, number][]) {
  return arr.sort((a, b) => {
    if (a[1] < b[1]) {return -1;}
    if (a[1] > b[1]) {return 1;}
    if (a[0] < b[0]) {return -1;}
    if (a[0] > b[0]) {return 1;}
    return 0;
  });
}

function isValidCoordinate(coordinate: number) {
  return !isNaN(coordinate) && isFinite(coordinate);
}

export { checkForArguments, calculateDistance, sort, isValidCoordinate };

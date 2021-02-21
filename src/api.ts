export interface IItem {
  ID: number;
  Name: string;
  DateCreated: Date;
  Price: number;
  Owners: string[];
}

function getRandom(max: number = 100, min: number = 0): number {
  return Math.round(Math.random() * (max - min) + min);
}
function getRandomString(
  strLength: number,
  isRandomCase: boolean = false
): string {
  let randomString = "";
  for (let i = 0; i < strLength; i++) {
    let number = getRandom(35, 0);
    let l = number.toString(36);
    if (isRandomCase && number > 23) {
      l = l.toUpperCase();
    }
    randomString += l;
  }
  return randomString;
}

export const api = {
  getItems(): Promise<IItem[]> {
    let count = getRandom(7, 4);
    let items: IItem[] = [];
    const today = new Date();
    const ms = today.valueOf();

    for (let i = 0; i < count; i++) {
      items.push({
        ID: 1000 + getRandom(100, 10) + i,
        Name: getRandomString(getRandom(10, 5), true),
        DateCreated: new Date(ms - 86400000 * getRandom(50, 1)),
        Price: getRandom(150, 10) * 100,
        Owners: new Array(getRandom(0, 2))
          .fill(0)
          .map(() => getRandomString(3).toUpperCase()),
      });
    }

    return new Promise((resolve) => resolve(items));
  },
};

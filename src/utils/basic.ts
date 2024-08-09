import { Types } from 'mongoose';

/**
 *
 * @returns new MongoDB id in string format
 */
export const newMongoId = (): string => {
  return new Types.ObjectId().toHexString();
};

/**
 *
 * @param min minimum random number
 * @param max maximum random number
 * @returns random number between min and max
 */
export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

type randomStringTypes =
  | 'alphanumeric'
  | 'alpha'
  | 'lower'
  | 'hex'
  | 'num'
  | 'special'
  | 'all';
/**
 * generate random string
 * @param length length of random string
 * @param type alpha, alphanumeric, hex, num, special char or all characters
 * @returns random string
 */
export function getRandomString(
  length: number,
  type: randomStringTypes = 'alpha',
): string {
  let result = '';
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const alphaChars = lowerChars + upperChars;
  const numChars = '0123456789';
  const specialChars = '';
  let characters = alphaChars;
  if (type === 'num') characters = numChars;
  if (type === 'hex') characters = 'ABCDEFabcdef0123456789';
  if (type === 'all') characters = alphaChars + numChars + specialChars;
  if (type === 'special') characters = specialChars;
  if (type === 'alphanumeric') characters = alphaChars + numChars;
  if (type === 'alpha') characters = alphaChars;
  if (type === 'lower') characters = lowerChars;
  for (let index = 0; index < length; index++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * parse duration string and return in milliseconds format
 * @param duration string duration like: 1d2h37m, 10d, 20h, 2m 30s
 * @returns duration number in milliseconds
 */
export const parseDuration = (duration: string): number => {
  let sum = 0;
  const days = duration.match(/(\d+)\s*d/);
  const hours = duration.match(/(\d+)\s*h/);
  const minutes = duration.match(/(\d+)\s*m/);
  const seconds = duration.match(/(\d+)\s*s/);

  if (days) sum += parseInt(days[1]) * 24 * 60 * 60;
  if (hours) sum += parseInt(hours[1]) * 60 * 60;
  if (minutes) sum += parseInt(minutes[1]) * 60;
  if (seconds) sum += parseInt(seconds[1]);

  return sum * 1000;
};

/**
 * convert float number into percentage
 * @param input float input number
 * @param decimal number of decimal points
 * @returns number in percent format for example: 0.273 => 27.3
 */
export const convertPercentage = (
  input: number,
  decimal: number = 0,
): number => {
  return +(input * 100).toFixed(decimal);
};

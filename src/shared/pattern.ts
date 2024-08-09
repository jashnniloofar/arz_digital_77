export const passwordRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9\\W])(?=.{8,})',
);
export const username = '^[0-9a-zA-Z\\-_]+$';
export const usernameRegex = new RegExp(username);
export const objectId = '[0-9A-Fa-f]{24}';
export const objectIdRegex = new RegExp(objectId);

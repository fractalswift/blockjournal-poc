import hash from 'hash.js';

function generateRandomString(length: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function generateFakeOutputPath() {
  return `fake/path/${generateRandomString(10)}`;
}

// TODO - investigate secure & reliable hashing libraries, this is just the first one I found
export function generateHashFromString(str: string) {
  return hash.sha256().update(str).digest('hex');
}

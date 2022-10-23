import hash from 'hash.js';

export function generateFakeOutputPath() {
  return `fake/path/${Math.random()}`;
}

// TODO - investigate secure & reliable hashing libraries, this is just the first one I found
export function generateHashFromString(str: string) {
  console.log({ str });
  const myHash = hash.sha256().update(str).digest('hex');

  console.log({ myHash });
}

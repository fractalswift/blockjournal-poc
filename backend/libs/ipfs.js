import { create } from 'ipfs-http-client';

export async function uploadOutputToIPFS(str) {
  const { INFURA_API_KEY, INFURA_API_SECRET } = process.env;

  console.log(INFURA_API_KEY, INFURA_API_SECRET);
  const auth =
    'Basic ' +
    Buffer.from(INFURA_API_KEY + ':' + INFURA_API_SECRET).toString('base64');

  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth
    }
  });

  console.log('sending to ipfs');
  const result = await client.add('my output');
  // the result contains the path
  // to the file on IPFS
  console.log(result);
  return result;
}

import { create } from 'ipfs-http-client';

function getAuthorizedClient() {
  console.debug('instantiating infura ipfs client');

  const { INFURA_API_KEY, INFURA_API_SECRET } = process.env;

  const auth =
    'Basic ' +
    Buffer.from(INFURA_API_KEY + ':' + INFURA_API_SECRET).toString('base64');

  return create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth
    }
  });
}

function getIPFSLink(path) {
  return `https://ipfs.infura.io/ipfs/${path}`;
}

export async function uploadOutputToIPFS(outputContent) {
  const client = getAuthorizedClient();

  console.debug('sending output to ipfs');

  const result = await client.add(outputContent);

  return result;
}

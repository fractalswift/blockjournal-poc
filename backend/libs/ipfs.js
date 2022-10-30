import { create } from 'ipfs-http-client';

export async function uploadOutputToIPFS(outputContent) {
  const client = getAuthorizedClient();

  console.debug('sending output to ipfs');

  const result = await client.add(outputContent);

  return result;
}

export async function getOutputFromIPFS(path) {
  const client = getAuthorizedClient();

  console.debug('getting output from ipfs');

  const response = await client.cat(path);

  const result = generateFromIPFSresponse(response);

  return result;
}

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

// TODO test this with bigger files
async function generateFromIPFSresponse(ipfsResult) {
  let str = '';
  for await (const val of ipfsResult) {
    str = str + val;
  }
  const raw = Buffer.from(str).toString('utf8');
  return raw;
}

require('dotenv/config');
const { BlobServiceClient } = require('@azure/storage-blob');


async function main(){

  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
  const containerName = 'mycontainer';

  const containerClient = blobServiceClient.getContainerClient(containerName);
  
  const blobName = 'myblob.txt';
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const deleteBlockBlobResponse = await blockBlobClient.deleteIfExists({ deleteSnapshots: 'include' });
  console.log('\t Blob deleted. requestId: ', deleteBlockBlobResponse.requestId);
}

main().then(() => console.log('Done')).catch((ex) => console.log(ex.message));
require('dotenv/config');
const { BlobServiceClient } = require('@azure/storage-blob');


async function main(){

  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
  const containerName = 'mycontainer';

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const deleteContainerResponse = await containerClient.delete();
  console.log("Container was deleted successfully. requestId: ", deleteContainerResponse.requestId);
}

main().then(() => console.log('Done')).catch((ex) => console.log(ex.message));
require('dotenv/config');
const { BlobServiceClient } = require('@azure/storage-blob');

async function main() {
  console.log('Azure Blob storage v12 - JavaScript quickstart sample');

  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);

  const containerName = 'mycontainer';

  console.log('Creating container...');
  console.log('\t' + containerName);

  // create container
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const createContainerResponse = await containerClient.createIfNotExists();
  console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);
  // => Upload blob to container
  const blobName = 'myblob.txt';

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  console.log('\nUploading to Azure storage as blob:\n\t', blobName);

  // upload data to the blob
  const data = 'Hello World';
  const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
  console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);


  // => List container blobs
  console.log('\nListing blobs...');
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log('\t', blob.name);
  }

}

main().then(() => console.log('Done')).catch((ex) => console.log(ex.message));

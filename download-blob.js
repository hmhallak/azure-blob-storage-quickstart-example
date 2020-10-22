require('dotenv/config');
const { BlobServiceClient } = require('@azure/storage-blob');


async function main(){

  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
  const containerName = 'mycontainer';

  const containerClient = blobServiceClient.getContainerClient(containerName);
  
  const blobName = 'myblob.txt';
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const downloadBlockBlobResponse = await blockBlobClient.download(0);
  console.log('\nDownloaded blob content...');
  console.log('\t', await streamToString(downloadBlockBlobResponse.readableStreamBody));
}

async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
}

main().then(() => console.log('Done')).catch((ex) => console.log(ex.message));
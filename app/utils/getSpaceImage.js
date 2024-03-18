// getSpaceImage.js

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export const doSpace = new S3Client({
  region: process.env.NEXT_PUBLIC_DO_DEFAULT_REGION,
  bucket: process.env.NEXT_PUBLIC_DO_BUCKET,
  endpoint: process.env.NEXT_PUBLIC_DO_ENDPOINT,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_DO_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_DO_SECRET_ACCESS_KEY,
  },
});

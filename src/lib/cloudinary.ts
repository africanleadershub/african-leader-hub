import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  width?: number;
  height?: number;
  format?: string;
  bytes: number;
  resource_type: string;
  original_filename?: string;
}

const DEFAULT_FOLDER = "african-leaders-hub";

export async function uploadToCloudinary(
  file: Buffer,
  options: {
    folder?: string;
    resourceType?: "image" | "raw" | "auto" | "video";
    publicId?: string;
    tags?: string[];
    filename?: string;
  } = {}
): Promise<CloudinaryUploadResult> {
  const folder = options.folder || DEFAULT_FOLDER;
  const resourceType = options.resourceType || "auto";

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        public_id: options.publicId,
        tags: options.tags,
        use_filename: Boolean(options.filename),
        unique_filename: true,
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Cloudinary upload failed"));
          return;
        }
        resolve(result as CloudinaryUploadResult);
      }
    );
    stream.end(file);
  });
}

export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "raw" | "video" = "image"
): Promise<void> {
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

export { cloudinary };

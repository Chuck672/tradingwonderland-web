import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserBBSRole, getPermissions } from "@/lib/bbs/permissions";
import { successResponse, errorResponse } from "@/lib/bbs/utils";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 提升到 10MB，因为我们会进行后端压缩
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", "You must be logged in to upload images", 401);
    }

    const role = await getUserBBSRole(session);
    const permissions = getPermissions(role);

    if (!permissions.canUploadImage) {
      return errorResponse("Forbidden", "You do not have permission to upload images. Please upgrade to VIP.", 403);
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return errorResponse("Bad Request", "No file uploaded", 400);
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      return errorResponse("Payload Too Large", "图片大小不能超过 10MB。请压缩后再上传。", 413);
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return errorResponse("Unsupported Media Type", "Only JPG, PNG, and WEBP images are allowed", 415);
    }

    // Validate extension
    const originalName = file.name;
    const ext = path.extname(originalName).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return errorResponse("Unsupported Media Type", "Invalid file extension", 415);
    }

    // Read file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename (convert all to webp for better compression)
    const timestamp = Date.now();
    const randomString = crypto.randomBytes(4).toString("hex"); // 8 chars
    const filename = `${timestamp}-${randomString}.webp`;

    // Define save path (public/uploads/bbs/)
    // Next.js absolute path to public folder
    const publicDir = path.join(process.cwd(), "public");
    const uploadDir = path.join(publicDir, "uploads", "bbs");
    const filePath = path.join(uploadDir, filename);

    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });

    // Process and write file
    // 使用 sharp 进行无损/高质量压缩，并转换为 WebP
    await sharp(buffer)
      .resize({
        width: 1920, // 限制最大宽度，超出的等比例缩小
        withoutEnlargement: true,
      })
      .webp({ 
        quality: 85, // 85 是画质和体积非常好的平衡点
        effort: 4 // 压缩级别 (0-6)
      })
      .toFile(filePath);

    // Return the public URL
    const fileUrl = `/uploads/bbs/${filename}`;

    return NextResponse.json(successResponse({ url: fileUrl }, "Image uploaded successfully"), { status: 201 });
  } catch (error) {
    console.error("[BBS_UPLOAD_POST]", error);
    return errorResponse("Internal Error", "Failed to upload image", 500);
  }
}

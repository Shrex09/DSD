import { sendInquiry } from "../server/sendInquiry.js";

// Vercel serverless function served at POST /api/contact
export async function POST(request: Request): Promise<Response> {
  const { status, body } = await sendInquiry(await request.text(), process.env);
  return Response.json(body, { status });
}

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const apiKey = process.env.MOBILE_API_KEY;
  const url = `https://api.mobileapi.dev/devices/${id}/image/?key=${apiKey}`;

  try {
    const res = await fetch(url, {
      // 429 エラー対策
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error(`Mobile API Error: ${res.status}`);
      return new NextResponse("Image fetch failed", { status: res.status });
    }

    const contentType = res.headers.get("Content-Type");

    // バイナリデータのダウンロード
    const arrayBuffer = await res.arrayBuffer();

    // Buffer に変換（Node.js で扱いやすいらしい）
    const buffer = Buffer.from(arrayBuffer);

    const headers = new Headers();

    if (contentType) {
      headers.set("Content-Type", contentType);
    }

    return new NextResponse(buffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Internal Proxy Error: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

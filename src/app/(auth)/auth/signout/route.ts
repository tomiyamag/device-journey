import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { getSessionUser } from "@/lib/queries/user";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  // Check if a user's logged in
  const user = await getSessionUser();

  if (user) {
    await supabase.auth.signOut();
  }

  revalidatePath("/", "layout");
  return NextResponse.redirect(new URL("/login", req.url), {
    status: 302,
  });
}

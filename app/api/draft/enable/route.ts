import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const draft = await draftMode();
  draft.enable();
  
  // Redirect back to our demo page after enabling draft mode
  return redirect("/draft-demo");
}

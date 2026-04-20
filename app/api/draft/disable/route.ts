import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const draft = await draftMode();
  draft.disable();
  
  // Redirect back to our demo page after disabling draft mode
  return redirect("/draft-demo");
}

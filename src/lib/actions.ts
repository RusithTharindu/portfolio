"use server";

import { revalidateTag } from "next/cache";

export async function revalidateGitHubActivity() {
  revalidateTag("github-activity", "max");
}

// clerk handles everything for us but we need a route to point it to
'use server';

import { createUser } from '@/server/auth';
import { redirect } from 'next/navigation';
import { toast } from "sonner";

export default async function SSOCallback() {

  try {
    await createUser(); //check index.ts inside server folder
    console.log("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);

    //TODO: Add a fallback when user is not created.
  }
  redirect(`/dashboard`) // Navigate to the new post page
  return null; // Clerk handles everything in the background
}
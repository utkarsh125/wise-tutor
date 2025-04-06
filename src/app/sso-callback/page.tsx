// clerk handles everything for us but we need a route to point it to
'use server';
import { redirect } from 'next/navigation'

export default function SSOCallback() {
  redirect(`/dashboard`) // Navigate to the new post page
  return null; // Clerk handles everything in the background
}
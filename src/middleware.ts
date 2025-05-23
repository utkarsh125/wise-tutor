import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

//routes that need user to be signed in
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', 'billing(.*)', '/settings(.*)', '/chat(.*)'])

export default clerkMiddleware(
  async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect()
  },
  {debug: true}, 
);

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// }

// stuff copied from clerk next js quick start
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
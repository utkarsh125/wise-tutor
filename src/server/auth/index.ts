import { auth, clerkClient } from "@clerk/nextjs/server";

import { db } from "@/server/db";

export async function createUser(): Promise <void> {

    console.timeLog("createUser", "Creating user...");

    const { userId } = await auth();
    console.log("User Id fetched: ", userId);

    if(!userId){

        throw new Error("User not authenticated");
    }

    //call the clerk client 
    const clerk = await clerkClient();

    const clerkUser = await clerk.users.getUser(userId);
    console.log("Clerk User fetched: ", clerkUser);
    const email = clerkUser.emailAddresses?.[0]?.emailAddress;
    const name = clerkUser.firstName ?? null;

    //TODO: Update schema for imageUrl.
    //const imageUrl = clerkUser.imageUrl ?? null;

    if(!email){
        throw new Error("User email not found in clerk database");
    }

    await db.user.upsert({

        where:{
            clerkId: userId,
        },
        update:{
            email,
            name,
        },
        create:{
            clerkId: userId,
            email,
            name,
        }
    })

    console.log("User upserted successfully:", { userId, email, name });



 
}
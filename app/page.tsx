
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";


export default async function Home() {

  const session = await auth();
  console.log(session)

  if(session?.user) redirect("/dashboard")
  return (
   <div>
    <form action={async ()=>{
      "use server"
      await signOut();
    }}>

    <Button type="submit">
      logout
    </Button>
    </form>
   </div>
  );
}

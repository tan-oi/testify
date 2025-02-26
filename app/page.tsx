
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";


export default async function Home() {

  const session = await auth();
  console.log(session)
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

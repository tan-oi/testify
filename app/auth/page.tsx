
import { auth } from "@/auth";
import { AuthForm } from "@/components/auth-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const session = await auth();
  if(session) redirect("/dashboard");
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-16 space-y-2">
        <Tabs defaultValue="signup" className="w-[350px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Signup</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <AuthForm header={"Want to create an account?"}
            description={"Good to see you :)"}
            type={"signup"}
            />
          </TabsContent>

          <TabsContent value="login">
            <AuthForm header={"Welcome back!"} description={"Get back to your account"} type={"login"}/>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

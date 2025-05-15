"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import {
  googleAuthSubmit,
  handleCredentials,
} from "@/app/actions/auth.actions";
import { FormInputTypes } from "@/lib/types";

const AuthSchema = z.object({
  email: z.string().email({
    message: "Invalid email! You need to put in a valid email",
  }),
  password: z.string().min(8, {
    message: "Password must be of atleast 8 characters.",
  }),
});

export function AuthForm({ header, description, type }: FormInputTypes) {
  const [isPending, startTransition] = useTransition();
  // const form = useForm<z.infer<typeof AuthSchema>>({
  //   resolver: zodResolver(AuthSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // });

  // const onSubmit = (values: z.infer<typeof AuthSchema>) => {
  //   startTransition(async () =>{
  //    const res: {
  //     success: boolean;
  //     errorType?:string;
  //     message?:string;
  //    } =
  //      await handleCredentials({
  //       ...values,
  //       type: type,
  //     });
      
  //     if(!res.success && res.errorType) {
  //       form.setError(res.errorType as "email" | "password" | `root.${string}` | "root",{
  //         message : res.message
  //       })
  //     }
  //     form.reset();
  //   })
  //   };

  const handleGoogleOAuth = () => {
    startTransition(async () => {
      const result = await googleAuthSubmit();
      if (!result.success) {
        console.log("google oauth failed");
      }
    });
  };
  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{header}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 relative">
          <div className="space-y-3">
            <Button
              className="w-full"
              variant={"default"}
              disabled={isPending}
              onClick={handleGoogleOAuth}
            >
              {isPending && <Loader2 className="mr-4 animate-spin" />}

              <span>
                {isPending ? (
                  "Authenticating..."
                ) : (
                  <div className="flex items-center">
                    {/* <svg
                      fill="white"
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className=""
                    >
                      <title>Google</title>
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg> */}
                    <span className="ml-2">Continue with Google</span>
                  </div>
                )}
              </span>
            </Button>

            <div className="w-full border-t border-muted"></div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

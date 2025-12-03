  "use client";

  import { z } from "zod";

  import { StepChange } from "../stepChange";
  import { zodResolver } from "@hookform/resolvers/zod";
  import {
    Form,
    FormControl,
    
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { useForm } from "react-hook-form";
  import { Input } from "@/components/ui/input";
  import { useSpaceModalStore } from "@/lib/store/spaceStore";
  import { Switch } from "@/components/ui/switch";
import { thankYouSchema } from "@/lib/schema";



  export function ThankYouDetails() {
    const { formData, nextStep, updateFormData } = useSpaceModalStore();
    console.log(formData);
    // const initialData = (type === "edit") ? formData : null
    const initialData = formData;
    const form = useForm<z.infer<typeof thankYouSchema>>({
      resolver: zodResolver(thankYouSchema),
      defaultValues:  {
        thankYouHeader: initialData?.thankYouHeader || "",
        thankYouMessage: initialData?.thankYouMessage || "",
        allowShare: initialData?.allowShare === undefined ? true : initialData.allowShare,
      }
      
    });

    const onSubmit = (values: z.infer<typeof thankYouSchema>) => {
      console.log(values);
      updateFormData(values);
      nextStep();
    };
    return (
      <>
        <Form {...form}>
          <div className="md:my-2">
            <h1 className="md:text-3xl font-bold">Customise a thank you page</h1>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <FormField
              control={form.control}
              name="thankYouHeader"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Enter the thank you header
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="thank you" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thankYouMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                  Enter the thank you description/message
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="thank you" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allowShare"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="">
                    Allow users to share on social media
                  </FormLabel>
                </FormItem>
              )}
            />

            <StepChange />
          </form>
        </Form>
      </>
    );
  }

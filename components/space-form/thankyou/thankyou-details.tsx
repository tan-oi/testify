  "use client";

  import { z } from "zod";

  import { StepChange } from "../stepChange";
  import { zodResolver } from "@hookform/resolvers/zod";
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { useForm } from "react-hook-form";
  import { Input } from "@/components/ui/input";
  import { useSpaceModalStore } from "@/lib/store/spaceStore";
  import { Checkbox } from "@/components/ui/checkbox";
  import { Switch } from "@/components/ui/switch";

  const thankYouSchema = z.object({
    thankYouHeader: z
      .string()
      .min(5, {
        message: "Cmon, you gotta be a bit grateful",
      })
      .max(50, {
        message:
          "okay, that's enough, you don't have to put in the whole block of butter",
      }),
    thankYouMessage: z.string().min(5).max(50),
    allowShare: z.boolean().default(true),
  });

  export function ThankYouDetails() {
    const { formData, nextStep, updateFormData } = useSpaceModalStore();
    const form = useForm<z.infer<typeof thankYouSchema>>({
      resolver: zodResolver(thankYouSchema),
      defaultValues:  {
        thankYouHeader: formData?.thankYouHeader || "",
        thankYouMessage: formData?.thankYouMessage || "",
        allowShare: formData?.allowShare === undefined ? true : formData.allowShare,
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
                    Enter the text you'd want to show after the form is filled
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
                    Enter the text you'd want to show after the form is filled
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

// "use client";

// import { z } from "zod";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useSession } from "next-auth/react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useSpaceModalStore } from "@/lib/store/spaceStore";
// import { Input } from "@/components/ui/input";

// import { StepChange } from "../stepChange";

// import { Switch } from "@/components/ui/switch";
// import { useRouter } from "next/navigation";
// import { basicDetailsSchema } from "@/lib/schema";
// import { useEffect } from "react";

// export function BasicDetails() {
//   const router = useRouter();
//   const { data: session } = useSession();

//   useEffect(() => {
//     if (!session || !session?.user) {
//       router.push("/auth");
//     }
//   }, [session, router]);

//   const { formData, type, updateFormData, nextStep } = useSpaceModalStore();

//   const form = useForm<z.infer<typeof basicDetailsSchema>>({
//     resolver: zodResolver(basicDetailsSchema),
//     defaultValues: formData || {
//       headerDescription: "",
//       headerTitle: "",
//       name: "",
//       allowVideo: true,
//       askConsent: true,
//       allowStarRatings: true,
//     },
//   });

//   const onSubmit = (data: z.infer<typeof basicDetailsSchema>) => {
//     console.log(data);
//     updateFormData(data);
//     nextStep();
//   };

//   return (
//     <Form {...form}>
//       <div className="md:mt-2">
//         <h1 className="md:text-3xl font-bold">
//           {type === "create" ? "Create a new space" : "Edit a space"}
//         </h1>
//       </div>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Space Name</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="myspace"
//                   {...field}
//                   disabled={type === "edit"}
//                 />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="headerTitle"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Header Title</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="hey, hope you're having a blast with our product"
//                   {...field}
//                 />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="headerDescription"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Your custom messsage</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="please make sure you give apt details regarding what this form is for"
//                   {...field}
//                 />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="askConsent"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
//               <FormControl>
//                 <Switch
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//               <div className="space-y-1 leading-none">
//                 <FormLabel>Ask for consent</FormLabel>
//                 <FormDescription>
//                   We recommend taking users permission, it is better to use a
//                   testimonial after getting a consent
//                 </FormDescription>
//               </div>
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="allowVideo"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
//               <FormControl>
//                 <Switch
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//               <FormLabel>
//                 Allow users to submit videos as testimonial?
//               </FormLabel>
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="allowStarRatings"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
//               <FormControl>
//                 <Switch
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//               <FormLabel>
//                 Allow users to rate your [service/product] out of 5 stars?
//               </FormLabel>
//             </FormItem>
//           )}
//         />

//         <StepChange />
//       </form>
//     </Form>
//   );
// }

"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
// <ADD_START> Import useFieldArray
import { useForm, useFieldArray } from "react-hook-form";
// <ADD_END>
import { useSpaceModalStore } from "@/lib/store/spaceStore";
import { Input } from "@/components/ui/input";

import { StepChange } from "../stepChange";

import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
// <MODIFIED> Import only basicDetailsSchema
import { basicDetailsSchema } from "@/lib/schema";
// <ADD_START> Import Button and Icons for Add/Remove
import { Button } from "@/components/ui/button";

// <ADD_END>
import { useEffect } from "react";
import { PlusCircleIcon, Trash2 } from "lucide-react";


export function BasicDetails() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !session?.user) {
      router.push("/auth");
    }
  }, [session, router]);

  const { formData, type, updateFormData, nextStep } = useSpaceModalStore();
  console.log(formData, "comes from formData");

  const form = useForm<z.infer<typeof basicDetailsSchema>>({
    resolver: zodResolver(basicDetailsSchema),
 
    defaultValues: {
      name: formData?.name || "",
      headerDescription: formData?.headerDescription || "",
      headerTitle: formData?.headerTitle || "",
      allowVideo: formData?.allowVideo ?? true,
      askConsent: formData?.askConsent ?? true,
      allowStarRatings: formData?.allowStarRatings ?? true,
     
      questions: formData?.spaceQuestions || [],
    
    },
  });

 
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions", 
  });
  // <ADD_END>


 
  const onSubmit = (data: z.infer<typeof basicDetailsSchema>) => {
    console.log("Form Data:", data);


    const questionsToSave = data.questions
        ?.filter(q => q.text.trim() !== '') 
        .map((q,i) => ({
           
            id: q.id || i+1, // Simple unique ID generation
            text: q.text,
        })) || [];

   
    const dataToUpdateStore = {
        ...data, 
        questions: questionsToSave, 
    };
    // <ADD_END>

    console.log("Data to Update Store:", dataToUpdateStore);
    updateFormData(dataToUpdateStore); // Use the transformed data
    nextStep();
  };

  return (
    <Form {...form}>
      <div className="md:mt-2">
        <h1 className="md:text-3xl font-bold">
          {type === "create" ? "Create a new space" : "Edit a space"}
        </h1>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {/* Existing Fields */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Space Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="myspace"
                  {...field}
                  disabled={type === "edit"}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="headerTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Header Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="hey, hope you're having a blast with our product"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="headerDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your custom message</FormLabel>
              <FormControl>
                <Input
                  placeholder="please make sure you give apt details regarding what this form is for"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* <ADD_START> Dynamic Fields for Questions */}
        <div className="space-y-4">
            <h2 className="text-xl font-semibold mt-6">Custom Questions</h2>
             <FormDescription className="-mt-4 mb-4">
              Add up to 3 questions you want to ask users when collecting testimonials.
            </FormDescription>

            {/* Map over the fields from useFieldArray */}
            {fields.map((field, index) => (
                <div key={field.id} className="flex items-center space-x-2"> {/* field.id is a temporary ID from useFieldArray */}
                     <FormField
                        control={form.control}
                        // <MODIFIED> Use the correct name format for array fields
                        name={`questions.${index}.text`} // Link input to the correct field in the array
                        // <MODIFIED> Rename field prop to avoid collision with parent scope 'field'
                        render={({ field: questionField }) => (
                            <FormItem className="flex-grow"> {/* Allow input to take available space */}
                                <FormLabel>Question {index + 1}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={`Question ${index + 1} text`}
                                        {...questionField}
                                    />
                                </FormControl>
                                <FormMessage /> {/* Display error message for this specific question */}
                            </FormItem>
                        )}
                     />
                     {/* Button to remove this question */}
                     {fields.length > 0 && ( // Optionally only show remove if there's more than 0 questions
                        <Button
                            type="button" // Important: Prevent form submission
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            aria-label={`Remove Question ${index + 1}`}
                            className="mt-8" // Align with input baseline
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                     )}
                </div>
            ))}

            {/* Button to add a new question (show only if less than 3 questions) */}
            {fields.length < 3 && (
                 <Button
                    type="button" // Important: Prevent form submission
                    variant="outline"
                    size="sm"
                    onClick={() => append({ text: '' })} // Append a new question object with empty text
                 >
                    <PlusCircleIcon className="mr-2 h-4 w-4" />
                    Add Question
                 </Button>
            )}

             {/* Display global error message for the questions array (e.g., max items) */}
             {/* Check if the questions array error exists and has a message */}
             {form.formState.errors.questions && form.formState.errors.questions.message && (
                <FormMessage>{form.formState.errors.questions.message}</FormMessage>
             )}

        </div>
        {/* <ADD_END> */}


        {/* Existing Toggle Fields */}
        <FormField
          control={form.control}
          name="askConsent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Ask for consent</FormLabel>
                <FormDescription>
                  We recommend taking users permission, it is better to use a
                  testimonial after getting a consent
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="allowVideo"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Allow users to submit videos as testimonial?
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="allowStarRatings"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
               <div className="space-y-1 leading-none">
                <FormLabel>
                  Allow users to rate your [service/product] out of 5 stars?
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        {/* Step change buttons */}
        <StepChange />
      </form>
    </Form>
  );
}
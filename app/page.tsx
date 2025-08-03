import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Star, Users, MessageSquare, Zap, Shield, Globe, Download, Share2 } from "lucide-react";

// export default async function Home() {
//   const session = await auth();
  
  // if (session?.user) {
  //   redirect("/dashboard");
  // }

  // return 
  // (
  //   <div className="min-h-screen">
  //     {/* Hero Section */}
  //     <section className="py-20 px-4 text-center">
  //       <div className="max-w-4xl mx-auto">
  //         <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-6">
  //           Collect & Display Testimonials
  //         </h1>
  //         <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
  //           Build trust with your customers by showcasing authentic testimonials. 
  //           Create beautiful testimonial pages in minutes.
  //         </p>
  //         <div className="flex flex-col sm:flex-row gap-4 justify-center">
  //           <Link href="/auth">
  //             <Button size="lg" className="text-lg px-8 py-3">
  //               Get Started Free
  //             </Button>
  //           </Link>
  //           <Button size="lg" variant="outline" className="text-lg px-8 py-3">
  //             View Demo
  //           </Button>
  //         </div>
  //       </div>
  //     </section>

  //     {/* Features Section */}
  //     <section className="py-20 px-4 bg-muted/30">
  //       <div className="max-w-6xl mx-auto">
  //         <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
  //           Everything you need to showcase testimonials
  //         </h2>
  //         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  //           <div className="text-center p-6 rounded-lg bg-background border">
  //             <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
  //               <MessageSquare className="w-6 h-6 text-primary" />
  //             </div>
  //             <h3 className="text-xl font-semibold mb-2">Easy Collection</h3>
  //             <p className="text-muted-foreground">
  //               Collect testimonials through text, video, or import from social media platforms.
  //             </p>
  //           </div>
  //           <div className="text-center p-6 rounded-lg bg-background border">
  //             <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
  //               <Star className="w-6 h-6 text-primary" />
  //             </div>
  //             <h3 className="text-xl font-semibold mb-2">Beautiful Display</h3>
  //             <p className="text-muted-foreground">
  //               Customize your testimonial pages with themes, colors, and layouts.
  //             </p>
  //           </div>
  //           <div className="text-center p-6 rounded-lg bg-background border">
  //             <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
  //               <Globe className="w-6 h-6 text-primary" />
  //             </div>
  //             <h3 className="text-xl font-semibold mb-2">Embed Anywhere</h3>
  //             <p className="text-muted-foreground">
  //               Embed testimonials on your website, social media, or anywhere online.
  //             </p>
  //           </div>
  //           <div className="text-center p-6 rounded-lg bg-background border">
  //             <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
  //               <Users className="w-6 h-6 text-primary" />
  //             </div>
  //             <h3 className="text-xl font-semibold mb-2">Customer Management</h3>
  //             <p className="text-muted-foreground">
  //               Organize and manage your customer testimonials with ease.
  //             </p>
  //           </div>
  //           <div className="text-center p-6 rounded-lg bg-background border">
  //             <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
  //               <Zap className="w-6 h-6 text-primary" />
  //             </div>
  //             <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
  //             <p className="text-muted-foreground">
  //               Built with modern technology for speed and reliability.
  //             </p>
  //           </div>
  //           <div className="text-center p-6 rounded-lg bg-background border">
  //             <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
  //               <Shield className="w-6 h-6 text-primary" />
  //             </div>
  //             <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
  //             <p className="text-muted-foreground">
  //               Your data is secure with enterprise-grade security measures.
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     </section>

  //     {/* CTA Section */}
  //     <section className="py-20 px-4">
  //       <div className="max-w-4xl mx-auto text-center">
  //         <h2 className="text-3xl md:text-4xl font-bold mb-6">
  //           Ready to build trust with testimonials?
  //         </h2>
  //         <p className="text-xl text-muted-foreground mb-8">
  //           Join thousands of businesses using Testify to showcase their customer success stories.
  //         </p>
  //         <Link href="/auth">
  //           <Button size="lg" className="text-lg px-8 py-3">
  //             Start Your Free Trial
  //           </Button>
  //         </Link>
  //       </div>
  //     </section>

  //     {/* Footer */}
  //     <footer className="py-12 px-4 border-t">
  //       <div className="max-w-6xl mx-auto text-center">
  //         <p className="text-muted-foreground">
  //           © 2024 Testify. All rights reserved.
  //         </p>
  //       </div>
  //     </footer>
  //   </div>
  // )

// }



export default function Home() {
  
  return (
    <>
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-[3px] bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-[3px] bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-[3px] bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
        <div className="absolute inset-x-0 bottom-0 h-[3px] w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-[3px] w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-primary md:text-4xl lg:text-7xl">
          {"Get testimonials in seconds, not hours"
            .split(" ")
            .map((word, index) => (
              <span key={index} className={`${index === 0 ? "text-primary mr-3" : "mr-2"} inline-block`}>
                {word}
              </span>
            ))}
        </h1>
        <p className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-gray-300">
              Collect testimonials in just a few clicks. No more manual data entry. Just share your unique link and let your customers share their testimonials.
            </p>
        <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href="/auth">
        <Button size="lg" className="text-lg px-8 py-3 rounded-xl">
                Get Started Free
         </Button>
         </Link>
        </div>
        <div className="relative z-10 mt-20 rounded-3xl  p-4 shadow-md border ">
          <div className="w-full overflow-hidden rounded-xl border">
            <img
              src={"/demo.png"}
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </div>
      </div>
           
    </div>  
    <div className="max-w-7xl mx-auto my-10 py-6 px-4">
      <div>

     
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">How does it work?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
              <Share2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">Step 1</div>
            <h3 className="text-xl font-semibold mb-3 text-primary">Share Your Link</h3>
            <p className="text-gray-400 leading-relaxed">
              Create your unique testimonial collection link and share it with your customers via email, social media,
              or embed it on your website.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
              <MessageSquare className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">Step 2</div>
            <h3 className="text-xl font-semibold mb-3 text-primary">Customers Submit</h3>
            <p className="text-gray-400 leading-relaxed">
              Your customers click the link and submit their testimonials through our simple, user-friendly form in just
              a few seconds.
            </p>
          </div>

       
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6">
              <Download className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="bg-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">Step 3</div>
            <h3 className="text-xl font-semibold mb-3 text-primary">Collect & Use</h3>
            <p className="text-gray-400 leading-relaxed">
              Automatically collect all testimonials in your dashboard. Export, embed, or showcase them anywhere to
              boost your credibility.
            </p>
          </div>
        </div>
        </div>
        
        <div className="py-6 px-4 my-10">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Watch it in action below</h1>
            <div className="flex flex-col md:flex-row items-center w-full gap-2">
            {/* <iframe src="http://localhost:3000/embeds/testimonial/w8chXE" width="100%" height="300" ></iframe> */}

{/* <iframe src="http://localhost:3000/embeds/testimonial/652TtR" width="50%" height="300"></iframe> */}

{/* <iframe src="http://localhost:3000/embeds/testimonial/tvvMZ1" width="50%" height="300" ></iframe> */}

{/* <iframe src="http://localhost:3000/embeds/testimonial/AqiwAh" width="100%" height="300"></iframe> */}
            </div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-3xl font-bold text-white mb-6">Ready to Start Collecting Testimonials?</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses who trust our platform to showcase their success stories and build credibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100 text-lg px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Started Free
              </Button>
            </Link>
          
          </div>
          <p className="text-slate-400 text-sm mt-4">Setup in 2 minutes</p>
        </div>
      </div>
      
            
            
    </>
        
  );
}


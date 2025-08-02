import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Star, Users, MessageSquare, Zap, Shield, Globe } from "lucide-react";

export default async function Home() {
  const session = await auth();
  
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-6">
            Collect & Display Testimonials
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Build trust with your customers by showcasing authentic testimonials. 
            Create beautiful testimonial pages in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="text-lg px-8 py-3">
                Get Started Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Everything you need to showcase testimonials
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-background border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Collection</h3>
              <p className="text-muted-foreground">
                Collect testimonials through text, video, or import from social media platforms.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-background border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Beautiful Display</h3>
              <p className="text-muted-foreground">
                Customize your testimonial pages with themes, colors, and layouts.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-background border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Embed Anywhere</h3>
              <p className="text-muted-foreground">
                Embed testimonials on your website, social media, or anywhere online.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-background border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Management</h3>
              <p className="text-muted-foreground">
                Organize and manage your customer testimonials with ease.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-background border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
              <p className="text-muted-foreground">
                Built with modern technology for speed and reliability.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-background border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your data is secure with enterprise-grade security measures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to build trust with testimonials?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of businesses using Testify to showcase their customer success stories.
          </p>
          <Link href="/auth">
            <Button size="lg" className="text-lg px-8 py-3">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Testify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

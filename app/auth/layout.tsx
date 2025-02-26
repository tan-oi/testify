export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body
          className="min-h-screen" suppressHydrationWarning
        >
          {children}
        </body>
      </html>
    );
  }
  
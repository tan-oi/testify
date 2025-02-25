export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body
          className={``}
        >
          {children}
        </body>
      </html>
    );
  }
  
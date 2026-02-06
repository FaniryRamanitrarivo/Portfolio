export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        <div className="min-h-screen bg-neutral-50">
          {children}
        </div>
      </body>
    </html>
  );
}

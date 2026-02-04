export default function PublicLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <main className="mx-auto">
      {children}
      {modal}
    </main>
  );
}

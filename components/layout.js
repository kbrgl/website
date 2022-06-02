export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-300">
      <main className="flex-1 md:py-5">
        <div className="mx-auto max-w-3xl bg-white md:border border-black">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-300">
      <main className="flex-1 px-2 md:px-0 py-2 md:py-5">
        <div className="mx-auto max-w-3xl bg-white border border-black">
          {children}
        </div>
      </main>
    </div>
  );
}

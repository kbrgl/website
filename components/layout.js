export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-300">
      <main className="flex-1">
        <div className="mx-auto max-w-3xl h-full bg-white border-l border-r border-black">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function SectionHeading({ children }) {
  return (
    <h2 className="text-xl font-serif font-bold flex items-center space-x-5 uppercase tracking-widest">
      <span>{children}</span>
      <span className="border-t flex-1" />
    </h2>
  );
}

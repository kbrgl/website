export default function SectionHeading({ children }) {
  return (
    <h2 className="text-lg font-bold flex items-center space-x-5">
      <span>{children}</span>
      <span className="border-t flex-1" />
    </h2>
  );
}

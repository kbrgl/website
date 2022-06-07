export default function Title({ children, className = "" }) {
  return (
    <h1 className={`font-title text-3xl leading-tight py-12 ${className}`}>
      {children}
    </h1>
  );
}

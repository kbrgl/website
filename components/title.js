export default function Title({ children, className = "" }) {
  return (
    <h1
      className={`font-title font-bold text-3xl md:text-5xl leading-tight ${className}`}
    >
      {children}
    </h1>
  );
}

export default function Container({ children, className = "" }) {
  return (
    <div className={`container mx-auto px-5 max-w-2xl ${className}`}>
      {children}
    </div>
  );
}

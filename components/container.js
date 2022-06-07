export default function Container({ children, className = "" }) {
  return (
    <div className={`container mx-auto px-5 md:px-10 max-w-4xl ${className}`}>
      {children}
    </div>
  );
}

export default function Container({ children, className = "" }) {
  return (
    <div className={`container px-10 max-w-2xl ${className}`}>{children}</div>
  );
}

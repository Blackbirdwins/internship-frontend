export default function Card({ title, children }) {
  return (
    <div className="card">
      {title && <div className="card-header">{title}</div>}
      {children}
    </div>
  );
}
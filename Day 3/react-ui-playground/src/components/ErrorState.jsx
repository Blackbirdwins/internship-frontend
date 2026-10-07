export default function ErrorState({
  title = 'Something went wrong',
  message = 'Please try again',
}) {
  return (
    <div className="error-state">
      <div className="error-state-icon">⚠️</div>
      <div className="error-state-title">{title}</div>
      <p>{message}</p>
    </div>
  );
}
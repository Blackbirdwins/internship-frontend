export default function EmptyState({
  icon = '📭',
  title = 'Nothing here',
  message = 'No items to display',
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <div className="empty-state-title">{title}</div>
      <p>{message}</p>
    </div>
  );
}
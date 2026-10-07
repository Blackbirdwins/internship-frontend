export default function ConfirmDialog({ isOpen, onClose, onConfirm, itemName }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">⚠️</div>
        <h2 className="confirm-title">Delete Item?</h2>
        <p className="confirm-text">
          Are you sure you want to delete <strong>"{itemName}"</strong>?
          This action cannot be undone.
        </p>
        <div className="form-actions">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
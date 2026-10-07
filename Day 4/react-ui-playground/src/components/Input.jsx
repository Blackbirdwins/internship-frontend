export default function Input({ label, error, id, type = 'text', ...rest }) {
  return (
    <div className="input-group">
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <input
        id={id}
        type={type}
        className={`input ${error ? 'input-error' : ''}`}
        {...rest}
      />
      {error && <p className="input-error-msg">{error}</p>}
    </div>
  );
}
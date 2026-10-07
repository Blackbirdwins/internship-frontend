export default function Loader({ size = 'md', text }) {
  return (
    <div className="loader-wrapper">
      <div className={`loader loader-${size}`}></div>
      {text && <span style={{ marginLeft: '0.5rem' }}>{text}</span>}
    </div>
  );
}
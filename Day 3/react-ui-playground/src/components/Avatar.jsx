export default function Avatar({ name = '', src, size = 'md' }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`avatar avatar-${size}`}>
      {src ? <img src={src} alt={name} /> : initials}
    </div>
  );
}
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
}) {
  const classes = `btn btn-${variant} btn-${size}`;

  return (
    <button className={classes} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
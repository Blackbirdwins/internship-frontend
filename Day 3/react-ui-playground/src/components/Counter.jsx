import { useState } from 'react';

export default function Counter({ initialValue = 0, step = 1, label = 'Counter' }) {
  const [count, setCount] = useState(initialValue);

  return (
    <div style={{ textAlign: 'center' }}>
      <h4>{label}: {count}</h4>
      <button className="btn btn-primary btn-sm" onClick={() => setCount(count - step)}>−</button>{' '}
      <button className="btn btn-secondary btn-sm" onClick={() => setCount(initialValue)}>Reset</button>{' '}
      <button className="btn btn-primary btn-sm" onClick={() => setCount(count + step)}>+</button>
    </div>
  );
}
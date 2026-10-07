import { AlertCircle, RotateCw } from 'lucide-react';
import { Button } from './UI';

export default function RetryState({ message = 'Failed to load data', onRetry }) {
  return (
    <div className="bg-bg-card border border-danger/30 rounded-2xl p-12 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-danger/15 flex items-center justify-center">
        <AlertCircle size={28} className="text-danger" />
      </div>
      <h3 className="text-lg font-bold mb-1">Oops!</h3>
      <p className="text-sm text-text-muted mb-5">{message}</p>
      {onRetry && (
        <Button onClick={onRetry}>
          <RotateCw size={14} className="inline mr-1.5" />
          Retry
        </Button>
      )}
    </div>
  );
}
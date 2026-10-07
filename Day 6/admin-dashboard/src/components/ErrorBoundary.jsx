import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './UI';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-bg-card border border-danger/30 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-danger/15 flex items-center justify-center">
            <AlertTriangle size={28} className="text-danger" />
          </div>
          <h3 className="text-lg font-bold mb-1">Something went wrong</h3>
          <p className="text-sm text-text-muted mb-5">
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <Button onClick={this.handleReset}>Try Again</Button>
        </div>
      );
    }
    return this.props.children;
  }
}
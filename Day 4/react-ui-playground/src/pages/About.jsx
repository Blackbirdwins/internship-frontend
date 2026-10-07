import Card from '../components/Card';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function About() {
  useDocumentTitle('About | React Shop');

  return (
    <Card title="ℹ️ About">
      <p>Yeh React Router demo hai — Day 4 ka task.</p>
      <p>Built with React, React Router, Axios, Fake Store API.</p>
    </Card>
  );
}
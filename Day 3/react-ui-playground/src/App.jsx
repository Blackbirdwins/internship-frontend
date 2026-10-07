import { useState } from 'react';
import Card from './components/Card';
import Button from './components/Button';
import Input from './components/Input';
import Badge from './components/Badge';
import Avatar from './components/Avatar';
import Loader from './components/Loader';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';
import Modal from './components/Modal';
import Tabs from './components/Tabs';
import Accordion from './components/Accordion';
import Dropdown from './components/Dropdown';
import Toast from './components/Toast';
import Counter from './components/Counter';
import LoginForm from './components/LoginForm';
import TodoList from './components/TodoList';
import './components/components.css';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [selected, setSelected] = useState('None');

  const showToast = (message, type = 'info') => setToast({ message, type });

  const tabs = [
    { label: 'Tab 1', content: <p>Content of Tab 1</p> },
    { label: 'Tab 2', content: <p>Content of Tab 2</p> },
    { label: 'Tab 3', content: <p>Content of Tab 3</p> },
  ];

  const accordionItems = [
    { title: 'What is React?', content: 'React is a JavaScript library for UI.' },
    { title: 'What is JSX?', content: 'JSX looks like HTML but is JavaScript.' },
    { title: 'What is a Component?', content: 'A reusable piece of UI.' },
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>React UI Playground</h1>
        <p>By Anas — Day 3</p>
      </header>

      <main className="main">
        <Card title="Task 6: Props & Composition">
          <Counter initialValue={10} step={2} label="Score" />
          <br />
          <Counter initialValue={0} step={1} label="Clicks" />
        </Card>

        <Card title="Task 7: State Management">
          <Counter />
        </Card>

        <Card title="Task 8: Controlled Forms">
          <LoginForm />
        </Card>

        <Card title="Task 9: List Rendering">
          <TodoList />
        </Card>

        <Card title="Buttons">
          <Button onClick={() => showToast('Primary clicked!', 'info')}>Primary</Button>{' '}
          <Button variant="secondary">Secondary</Button>{' '}
          <Button variant="danger">Delete</Button>{' '}
          <Button variant="success">Success</Button>{' '}
          <Button variant="outline">Outline</Button>
        </Card>

        <Card title="Inputs">
          <Input id="name" label="Name" placeholder="Enter your name" />
          <Input id="email" label="Email" type="email" placeholder="you@example.com" />
          <Input id="error" label="With Error" error="This field is required" />
        </Card>

        <Card title="Badges">
          <Badge>Default</Badge>{' '}
          <Badge variant="success">Active</Badge>{' '}
          <Badge variant="warning">Pending</Badge>{' '}
          <Badge variant="danger">Failed</Badge>{' '}
          <Badge variant="gray">Draft</Badge>
        </Card>

        <Card title="Avatars">
          <Avatar name="Anas Khan" />{' '}
          <Avatar name="Ali Raza" size="sm" />{' '}
          <Avatar name="Fatima B" size="lg" />
        </Card>

        <Card title="Loaders">
          <Loader />
          <Loader size="lg" text="Loading..." />
        </Card>

        <Card title="Modal">
          <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Welcome">
            <p>Yeh modal hai! Bahar click karke band kar sakte ho.</p>
          </Modal>
        </Card>

        <Card title="Tabs">
          <Tabs tabs={tabs} />
        </Card>

        <Card title="Accordion">
          <Accordion items={accordionItems} />
        </Card>

        <Card title="Dropdown">
          <p>Selected: <strong>{selected}</strong></p>
          <Dropdown
            label="Choose option"
            options={['Option 1', 'Option 2', 'Option 3']}
            onSelect={setSelected}
          />
        </Card>

        <Card title="Toast">
          <Button onClick={() => showToast('Success!', 'success')}>Success Toast</Button>{' '}
          <Button variant="danger" onClick={() => showToast('Error!', 'error')}>Error Toast</Button>
        </Card>

        <Card title="Empty & Error States">
          <EmptyState icon="📝" title="No Tasks" message="Add your first task" />
          <ErrorState title="Failed to load" message="Check internet" />
        </Card>
      </main>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}

export default App;
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import Filters from '@/components/Filters';
import Stats from '@/components/Stats';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Redux Todo Application
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your tasks with an e-commerce-style interface. Built with Next.js, Redux
            Toolkit, and Tailwind CSS.
          </p>
        </header>

        {/* Stats Section */}
        <Stats />

        {/* Filters Section */}
        <div className="mb-6">
          <Filters />
        </div>

        {/* Add Todo Form */}
        <div className="mb-6">
          <TodoForm />
        </div>

        {/* Todo List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Todos</h2>
          <TodoList />
        </div>
      </div>
    </div>
  );
}

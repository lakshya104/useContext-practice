import AddTask from './components/AddTask';
import { TasksProvider } from './components/TaskContext';
import TaskList from './components/TaskList';

export default function Home() {
  return (
     <div className='flex justify-center text-white bg-gray-800 items-center flex-col h-screen'>
    <TasksProvider>
     <h1 className='text-3xl font-black p-5'>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
     </div>
  );
}
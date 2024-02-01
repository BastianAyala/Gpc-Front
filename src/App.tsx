import NavBar from './components/layout/navBar';
import { CollaboratorsProvider } from './context/collaboratorsContext';
import Collaborators from './pages/CollaboratorsPage';

function App(){
  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      {/* className="bg-zinc-900 h-screen text-white flex items-center justify-center" */}
      {/* <div className="bg-gray-950 p-4 w-1/5">
        <h1 className="text-3xl font-bold text-center block my-2">Tasks App</h1> */}
        <NavBar></NavBar>
        <CollaboratorsProvider>
          {/* <TaskForm/>
          <TaskList/> */}
          <Collaborators></Collaborators>
        </CollaboratorsProvider>
    </div>
  )
}

export default App
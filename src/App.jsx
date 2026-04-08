import { useState } from 'react'
import './App.css'
import NewProject from './components/NewProject'
import NoProjectSelected from './components/NoProjectSelected'
import ProjectsSidebar from './components/ProjectsSidebar'

// Login-form
// import { LoginForm } from './components/login-form'
// //firebase
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
// import { app } from './firebase'
// const auth = getAuth(app);

function App() {

  const signUpUser = () =>{
    createUserWithEmailAndPassword(
      auth,
      "parascharaya02@gmail.com",
      "Paras@123"
    ).then(value => console.log(value))
  }


  const[projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: []
  })

  function handleStartAddProject(){
    setProjectState(prevState =>{
        return {
          ...prevState,
          selectedProjectId: null,
        }
      }
    )
  }

  function handleAddProject(projectData){
    setProjectState(prevState=>{
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      }
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  console.log(projectState);

  let content;

  if(projectState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} />
  }else if(projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onAddProject={handleStartAddProject}/>
  }

  return (
    <main className='flex gap-6 h-screen bg-gray-200'>
      <ProjectsSidebar onAddProject ={handleStartAddProject}
        projects = {projectState.projects}
      />
      {content}
      {/* <LoginForm/>
      <button onClick={signUpUser}>Create User</button> */}
    </main>
  )
}

export default App

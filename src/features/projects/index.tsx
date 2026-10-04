import ProjectTable from './Table'

import { useProject } from './hooks/useProject'

const Projects = () => {
  const projects = useProject()
  return (
    <div className='px-6! md:px-12! py-12! md:py-18!'>
      <ProjectTable data={projects.data?.data} />
    </div>
  )
}

export default Projects

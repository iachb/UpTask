import { useLocation, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getTaskbyId } from "@/api/TasksAPI";

export default function EditTaskData() {
  
  // Get the Project ID from the URL
  const params = useParams();
  const projectId = params.projectId!;

  // Get the Task ID from the URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("editTask")!;

  const {data} = useQuery({
    queryKey:['task', taskId],
    queryFn: () => getTaskbyId({projectId, taskId}),
  })
  return (
    <>
      
    </>
  )
}

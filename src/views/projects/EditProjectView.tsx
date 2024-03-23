import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectbyId } from "@/api/ProjectAPI";

export default function EditProjectView() {
  // Get the projectId from the URL
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectbyId(projectId),
    retry: false,
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (<
    
  ></>);
}

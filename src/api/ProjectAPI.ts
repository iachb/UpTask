import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Project, ProjectFormData, dashboardProjectSchema } from "../types";

// Create a new project with the given data in the form data object and return the created project data
export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post("/projects", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while creating the project"
      );
    }
  }
}

// Get all projects and return them
export async function getProjects() {
  try {
    const { data } = await api.get("/projects");
    const response = dashboardProjectSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while getting the projects"
      );
    }
  }
}
// Get a project by its ID and return it
export async function getProjectbyId(id: Project["_id"]) {
  try {
    const { data } = await api(`/projects/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

type ProjectAPIType = {
  formData: ProjectFormData;
  projectId: Project["_id"];
};

// Update a project with the given ID and return the updated project data
export async function updateProject({ formData, projectId }: ProjectAPIType) {
  try {
    const { data } = await api.put<string>(`/projects/${projectId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

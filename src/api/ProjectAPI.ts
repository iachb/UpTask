import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ProjectFormData } from "../types";

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

export async function getProjects() {
  try {
    const { data } = await api.get("/projects");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while getting the projects"
      );
    }
  }
}

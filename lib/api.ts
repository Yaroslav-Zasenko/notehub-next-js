import axios from "axios";
import { NoteListResponse, NoteResponse } from "./types";

axios.defaults.baseURL = "https://next-v1-notes-api.goit.study";

export const getNotes = async (page: number = 1, limit: number = 10) => {
  const { data } = await axios.get<NoteListResponse>("/notes", {
    params: { page, limit }, // Axios автоматично перетворить це на /notes?page=1&limit=10
  });
  return data;
};

export const getSingleNote = async (id: string) => {
  const { data } = await axios.get<NoteResponse>(`/notes/${id}`);
  return data;
};

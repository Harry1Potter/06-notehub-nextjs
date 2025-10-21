import axios from "axios";
import type { NewNoteData, Note } from "./types";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

function getAuthHeader() {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search = "",
  page = 1,
  perPage = 10
): Promise<NotesResponse> => {
  const res = await axios.get<NotesResponse>("/notes", {
    headers: getAuthHeader(),
    params: { search, page, perPage },
  });
  console.log("NOTEHUB TOKEN:", process.env.NEXT_PUBLIC_NOTEHUB_TOKEN);
  return res.data;
};

export const addNote = async (noteData: NewNoteData): Promise<Note> => {
  const res = await axios.post<Note>("/notes", noteData, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = getAuthHeader();
  console.log("Token used in fetchNoteById:", headers);
  const res = await axios.get<Note>(`/notes/${id}`, { headers });
  console.log("Fetching note by id:", id, res.data);
  return res.data;
};

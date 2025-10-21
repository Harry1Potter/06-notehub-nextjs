import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetailsClient";

interface Params {
  noteId: string;
}

export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { noteId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const state = dehydrate(queryClient);

  return (
    <HydrationBoundary state={state}>
      <NoteDetailsClient noteId={noteId} />
    </HydrationBoundary>
  );
}
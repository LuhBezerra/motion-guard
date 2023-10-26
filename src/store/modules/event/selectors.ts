import { RootState } from "@/store";
import { EventDto } from "@/store/services/event/event.types";

export const getAllEventsSelector = (state: RootState): EventDto[] | undefined => state.events.events;

export const getEventByIdSelector = (state: RootState, id: string): EventDto | undefined => {
  const events = getAllEventsSelector(state);

  return events?.find((event) => event.id === id);
}
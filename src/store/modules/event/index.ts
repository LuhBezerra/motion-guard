import { createSlice } from "@reduxjs/toolkit";
import {
  setFulfilledThunkActionStatus,
  setThunkActionStatus,
} from "@/hooks/useThunkFetchCall";
import { EventDto } from "@/store/services/event/event.types";
import {
  createEvent,
  createOrUpdateUser,
  deleteEvent,
  deleteUser,
  getAllEvents,
} from "./actions";

interface EventState {
  events?: EventDto[];
}

const initialState: EventState = {};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { id, ...payload } = action.payload;

      // Percorre o array de eventos e atualiza o usuário pelo id do usuário
      state.events = state.events?.map((event) => {
        // Verifica se o evento tem um array de usuários
        if (event.users && event.users.length > 0) {
          // Mapeia o array de usuários e atualiza o usuário que tem o mesmo ID do payload
          event.users = event.users.map((user) => {
            return user.id === id ? { ...user, ...payload } : user;
          });
        }
        return event;
      });
    },
  },
  extraReducers: (builder) => {
    setThunkActionStatus(builder, getAllEvents);
    setThunkActionStatus(builder, createEvent);
    setThunkActionStatus(builder, createOrUpdateUser);
    setThunkActionStatus(builder, deleteEvent);
    setThunkActionStatus(builder, deleteUser);
    builder.addCase(getAllEvents.fulfilled, (state, action) => {
      setFulfilledThunkActionStatus(state, getAllEvents);

      state.events = action.payload;
    });
    builder.addCase(createEvent.fulfilled, (state, action) => {
      setFulfilledThunkActionStatus(state, createEvent);

      const newEvent = action.payload;

      if (!state.events) {
        state.events = [];
      }

      const existingEventIndex = state.events.findIndex(
        (event) => event.id === newEvent.id
      );

      if (existingEventIndex !== -1) {
        // Se já existe um evento com o mesmo ID, mesclar os dados em vez de adicionar
        state.events[existingEventIndex] = {
          ...state.events[existingEventIndex],
          ...newEvent,
        };
      } else {
        // Caso contrário, adicione o novo evento à lista
        state.events.push(newEvent);
      }
    });
    builder.addCase(createOrUpdateUser.fulfilled, (state, action) => {
      setFulfilledThunkActionStatus(state, createOrUpdateUser);

      const { eventId, id, ...userData } = action.payload;

      state.events = state.events?.map((event) => {
        if (event.id === eventId) {
          // Garante que event.users é um array antes de proceder
          if (!Array.isArray(event.users)) {
            event.users = [];
          }

          const userIndex = event.users.findIndex((user) => user.id === id);

          if (userIndex !== -1) {
            // Se o usuário já existe, atualize-o
            event.users[userIndex] = { ...event.users[userIndex], ...userData };
          } else {
            // Se o usuário não existe, adicione-o
            event.users.push({ id, ...userData });
          }
        }
        return event;
      });
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const userId = action.meta.arg;
      setFulfilledThunkActionStatus(state, deleteUser);

      state.events = state.events?.map((event) => {
        if (event.users) {
          event.users = event.users.filter((user) => user.id !== userId);
        }
        return event;
      });
    });
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      const eventId = action.meta.arg;
      setFulfilledThunkActionStatus(state, deleteEvent);

      state.events = state.events?.filter((event) => event.id !== eventId);
    });
  },
});

const { reducer: eventReducer, actions: eventActions } = eventSlice;

export { eventReducer, eventActions };

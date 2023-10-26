import { RootState, ThunkApiType } from "@/store";
import { EventService } from "@/store/services/event";
import { EventDto, UserDto } from "@/store/services/event/event.types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const EventActions = {
  GET_ALL_EVENTS: "getAllEvents",
  CREATE_EVENT: "createEvent",
  DELETE_EVENT: "deleteEvent",
  CREATE_OR_UPDATE_USER: "createOrUpdateUser",
  DELETE_USER: "deleteUser",
};

export const getAllEvents = createAsyncThunk<
  EventDto[],
  undefined,
  ThunkApiType<RootState>
>(
  EventActions.GET_ALL_EVENTS,
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();

    try {
      return await new EventService().getAllEvents(
        auth.token
      );
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createEvent = createAsyncThunk<
  EventDto,
  EventDto,
  ThunkApiType<RootState>
>(
  EventActions.CREATE_EVENT,
  async (payload, { getState, rejectWithValue }) => {
    const { auth } = getState();

    try {
      return await new EventService().createEvent(payload, auth.token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteEvent = createAsyncThunk<
  undefined,
  EventDto['id'],
  ThunkApiType<RootState>
>(
  EventActions.DELETE_EVENT,
  async (id, { getState, rejectWithValue }) => {
    const { auth } = getState();

    try {
      return await new EventService().deleteEvent(id, auth.token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createOrUpdateUser = createAsyncThunk<
  UserDto,
  UserDto,
  ThunkApiType<RootState>
>(
  EventActions.CREATE_OR_UPDATE_USER,
  async (payload, { getState, rejectWithValue }) => {
    const { auth } = getState();

    try {
      return await new EventService().createOrUpdateUser(payload, auth.token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteUser = createAsyncThunk<
  undefined,
  UserDto['id'],
  ThunkApiType<RootState>
>(
  EventActions.DELETE_USER,
  async (id, { getState, rejectWithValue }) => {
    const { auth } = getState();

    try {
      return await new EventService().deleteUser(id, auth.token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
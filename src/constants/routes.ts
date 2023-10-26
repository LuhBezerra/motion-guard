import addRoutePrefix from "@/helpers/routes";

export const ROUTES = {
  PUBLIC: {
    LOGIN: "/login",
  },
  PRIVATE: {
    EVENTS: addRoutePrefix("/", {
      DETAILS: "event/:id",
    }),
  },
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
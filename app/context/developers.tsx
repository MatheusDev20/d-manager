import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Developer } from "@/app/@types";

type DeveloperState = {
  developers: Developer[];
};

type DeveloperAction =
  | { type: "SET_DEVELOPERS"; payload: Developer[] }
  | { type: "UPDATE_DEVELOPER"; payload: Developer };

const initialState: DeveloperState = {
  developers: [],
};

const DeveloperStateContext = createContext<DeveloperState | undefined>(
  undefined,
);
const DeveloperDispatchContext = createContext<
  React.Dispatch<DeveloperAction> | undefined
>(undefined);

const developerReducer = (
  state: DeveloperState,
  action: DeveloperAction,
): DeveloperState => {
  switch (action.type) {
    case "SET_DEVELOPERS":
      return { ...state, developers: action.payload };
    case "UPDATE_DEVELOPER":
      return {
        ...state,
        developers: state.developers.map((dev) =>
          dev.id === action.payload.id ? action.payload : dev,
        ),
      };
    default:
      throw new Error(`Unhandled action type`);
  }
};

export const DeveloperProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(developerReducer, initialState);
  return (
    <DeveloperStateContext.Provider value={state}>
      <DeveloperDispatchContext.Provider value={dispatch}>
        {children}
      </DeveloperDispatchContext.Provider>
    </DeveloperStateContext.Provider>
  );
};

export const useDeveloperState = () => {
  const context = useContext(DeveloperStateContext);
  if (context === undefined) {
    throw new Error(
      "useDeveloperState must be used within a DeveloperProvider",
    );
  }
  return context;
};

export const useDeveloperDispatch = () => {
  const context = useContext(DeveloperDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useDeveloperDispatch must be used within a DeveloperProvider",
    );
  }
  return context;
};

export const useDeveloperContext = () => {
  return {
    state: useDeveloperState(),
    dispatch: useDeveloperDispatch(),
  };
};

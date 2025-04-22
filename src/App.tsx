import {
  AuthProvider,
  Refine,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useAuth0 } from "@auth0/auth0-react";
import nestjsxCrudDataProvider from "@refinedev/nestjsx-crud";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Sidebar from "./pages/Layout";
import Sidebar1 from "./pages/Sidebar/sidebar";
import NoteContainer from "./pages/NoteContainer/notecontainer";
import SignUp from "./pages/signUp";  
import Board from "./pages/Board"
import Login from "./Login ";
import { useState } from "react";
function App() {
  const [notes, setNotes] = useState([
    {
      text: "asbnzdcs",
      time: "2:12PM",
      color: "cyan",
    }
    
  ]);

  const addNote = (color: string) => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const tempNotes = [...notes];
    tempNotes.push({
      text: "",
      time: currentTime,
      color,
    });
    setNotes(tempNotes);
  };

  const { isLoading, user, logout, getIdTokenClaims } = useAuth0();
  const API_URL = "https://api.nestjsx-crud.refine.dev";
  const dataProvider = nestjsxCrudDataProvider(API_URL);

  const authProvider: AuthProvider = {
    login: async () => ({ success: true }),
    logout: async () => {
      logout({ returnTo: window.location.origin });
      return { success: true };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      try {
        const token = await getIdTokenClaims();
        if (token) {
          axios.defaults.headers.common = {
            Authorization: `Bearer ${token.__raw}`,
          };
          return { authenticated: true };
        } else {
          return {
            authenticated: false,
            error: { message: "Check failed", name: "Token not found" },
            redirectTo: "/login",
            logout: true,
          };
        }
      } catch (error: any) {
        return {
          authenticated: false,
          error: new Error(error),
          redirectTo: "/login",
          logout: true,
        };
      }
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      if (user) {
        return {
          ...user,
          avatar: user.picture,
        };
      }
      return null;
    },
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <DevtoolsProvider>
          <Refine
            dataProvider={dataProvider}
            routerProvider={routerBindings}
            authProvider={authProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              projectId: "TIeRK4-lj2mbl-13U74o",
            }}
          >
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/sidebar" element={<Sidebar children={undefined} />} />
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/board" element={<Board/>} />              
              <Route
                path="notepad"
                element={
                  <div style={{ display: "flex" }}>
                    <Sidebar1 addNote={addNote} />
                    <NoteContainer notes={notes} />
                  </div>
                }
              />

            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
          <DevtoolsPanel />
        </DevtoolsProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

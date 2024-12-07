import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { createTheme } from "@mui/material/styles";
import Dashboard from "../Dashboard/Dashboard";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import Courses from "../Orders/Courses";

// Navigation Configuration
const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    segment: "courses",
    title: "Courses",
    icon: <LibraryBooksIcon />,
    path: "/courses",
  },
  {
    segment: "add-courses",
    title: "Add Courses",
    icon: <BookmarkAddIcon />,
    path: "/add-courses",
  },
  {
    segment: "add-users",
    title: "Add Users",
    icon: <GroupAddRoundedIcon />,
    path: "/add-users",
  },
];

// Custom Theme
const customTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Custom Router
const CustomRouter = {
  pathname: window.location.pathname,
  searchParams: new URLSearchParams(window.location.search),
  navigate: (url, options) => {
    if (typeof url === "string") {
      window.history[options?.history === "replace" ? "replaceState" : "pushState"](
        null,
        "",
        url
      );
      const popStateEvent = new PopStateEvent("popstate");
      window.dispatchEvent(popStateEvent);
    }
  },
};

function Home() {
  const [session, setSession] = React.useState({
    user: {
      image: "https://mui.com/static/avatar/1.jpg",
    },
  });

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const authentication = React.useMemo(() => {
    return {
      signOut: () => {
        localStorage.removeItem('ocm-token');
        setSession(null); 
        window.location.reload();
      },
    };
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION.map((item) => ({
        kind: "page",
        ...item,
      }))}
      branding={{
        logo: <img src="/src/assets/Sarasavi-logo.png" alt="Logo" />,
        title: "Online Course Management System",
      }}
      theme={customTheme}
      router={CustomRouter}
      session={session}
      authentication={authentication}
    >
      <DashboardLayout>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <List>
            {NAVIGATION.map((item) => (
              <ListItem
                button
                key={item.segment}
                onClick={() => {
                  CustomRouter.navigate(item.path); // Navigate to the selected page
                  setDrawerOpen(false); // Close drawer on click
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box sx={{ p: 3 }}>
          {session && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}></Box>
          )}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

export default Home;

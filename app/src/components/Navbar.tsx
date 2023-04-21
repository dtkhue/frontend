import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Hidden from "@mui/material/Hidden";
import Drawer from "@mui/material/Drawer";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const navItems = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Blog", href: "/blog" },
  ];

  const NavButton = ({ title, href }: { title: string; href: string }) => (
    <Link href={href} passHref>
      <Button color="inherit">{title}</Button>
    </Link>
  );

  const navButtons = navItems.map((item) => (
    <NavButton key={item.title} title={item.title} href={item.href} />
  ));

  const ListItemLink = ({ title, href }: { title: string; href: string }) => (
    <Link href={href} passHref>
      <ListItem button component="a">
        <ListItemText primary={title} />
      </ListItem>
    </Link>
  );

  const drawList = (
    <List>
      {navItems.map((item) => (
        <ListItemLink key={item.title} title={item.title} href={item.href} />
      ))}
    </List>
  );

  return (
    <AppBar position="static" sx={{width:"100%"}}>
      <Toolbar sx={{ maxWidth: "none" }}>
        <Box display="flex" alignItems="center" sx={{ width: "100%" }}>
          <img src="/brandlogo.png" alt="Brand Logo" height="100" />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginLeft: 2 }}
          >
            Nessight
          </Typography>
        </Box>
        {/* <Hidden mdDown>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            {navButtons}
          </Box>
        </Hidden>
        <Hidden mdUp>
          <Box
            sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Hidden> */}
      </Toolbar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        {drawList}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;

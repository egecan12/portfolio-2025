"use client";

import { useState } from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box, Container, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#articles', label: 'Articles' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageMenu, setLanguageMenu] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenu(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenu(null);
  };

  return (
    <AppBar position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(10px)', borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 1,
              fontWeight: 'bold'
            }}
          >
            Egecan Kahyaoglu
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navLinks.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                color="inherit"
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Language Menu */}
          <IconButton
            color="inherit"
            onClick={handleLanguageMenuOpen}
            sx={{ ml: 1 }}
          >
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={languageMenu}
            open={Boolean(languageMenu)}
            onClose={handleLanguageMenuClose}
          >
            <MenuItem onClick={handleLanguageMenuClose}>
              🇬🇧 English
            </MenuItem>
            <MenuItem onClick={handleLanguageMenuClose}>
              🇩🇪 Deutsch
            </MenuItem>
          </Menu>

          {/* Social Links - Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2, gap: 1 }}>
            <IconButton
              component="a"
              href="https://github.com/egecan12"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              size="small"
              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/egecan-kahyaoglu/"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              size="small"
              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Contact Button - Desktop */}
          <Button
            component={Link}
            href="/#contact"
            variant="contained"
            color="primary"
            size="small"
            sx={{ ml: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Get in Touch
          </Button>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ ml: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Egecan Kahyaoglu
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={link.href}
                  onClick={handleDrawerToggle}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <IconButton
              component="a"
              href="https://github.com/egecan12"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              size="small"
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/egecan-kahyaoglu/"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              size="small"
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </Box>
          <Button
            component={Link}
            href="/#contact"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleDrawerToggle}
          >
            Get in Touch
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
} 
import { AppBar, Toolbar, Typography, Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import { CreateTaskButton } from '@/widgets/CreateTaskButton';
import { MobileMenu } from '@/widgets/MobileMenu';
import { DesktopNavLinks } from '@/widgets/DesktopNavLinks';

export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background: 'linear-gradient(90deg, #1976d2 0%, #1565c0 100%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                        letterSpacing: '0.5px',
                    }}
                >
                    TaskManager
                </Typography>

                {!isMobile && <DesktopNavLinks />}

                <Box sx={{ display: 'flex', gap: 1 }}>
                    <CreateTaskButton />
                    {isMobile && (
                        <IconButton color="inherit" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            <MenuIcon />
                        </IconButton>
                    )}
                </Box>
            </Toolbar>
            {isMobile && mobileMenuOpen && <MobileMenu />}
        </AppBar>
    );
};

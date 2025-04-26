import { AppBar, Toolbar, Typography, Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import { CreateTaskButton } from '@/widgets/CreateTaskButton';
import { MobileMenu } from '@/widgets/MobileMenu';
import { DesktopNavLinks } from '@/widgets/DesktopNavLinks';
import { keyframes } from '@mui/system';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background: 'linear-gradient(45deg, #1a237e, #0d47a1, #1565c0)',
                backgroundSize: '200% 200%',
                animation: `${gradientAnimation} 15s ease infinite`,
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    py: 1.5,
                    maxWidth: '1400px',
                    margin: '0 auto',
                    width: '100%',
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 800,
                        background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                        letterSpacing: '1px',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    }}
                >
                    TaskManager
                </Typography>

                {!isMobile && <DesktopNavLinks />}

                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center',
                    }}
                >
                    <CreateTaskButton />
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            sx={{
                                transition: 'transform 0.2s ease',
                                '&:hover': {
                                    transform: 'rotate(90deg)',
                                },
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                </Box>
            </Toolbar>
            {isMobile && mobileMenuOpen && <MobileMenu />}
        </AppBar>
    );
};

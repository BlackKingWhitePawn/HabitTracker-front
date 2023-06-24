import React, { ReactNode } from 'react'
import './style.scss'
import { AppBar, Toolbar, Typography } from '@mui/material';

interface LayoutProps {
    children: ReactNode;
    className?: string
}


const Layout: React.FC<LayoutProps> = ({ children, className }) => {
    return (
        <div className={`${className}`}>
            <AppBar className={`header`} position='sticky'>
                <Toolbar>
                    {/* <img className='header__logo' src='/assets/logo.svg' alt='logo' width={44} /> */}
                    <Typography className='header__link' variant="h6" component="a" href='/' sx={{ flexGrow: 1 }}>
                        Аналитика
                    </Typography>
                </Toolbar>
            </AppBar>
            {children}
        </div>
    )
}

export default Layout
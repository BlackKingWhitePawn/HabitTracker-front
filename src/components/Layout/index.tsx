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
                <div className="header__logo">
                    logo
                </div>
                <Toolbar className='header__toolbar'>
                    {/* <img className='header__logo' src='/assets/logo.svg' alt='logo' width={44} /> */}
                    <Typography className='header__link' variant="h6" component="a" href='http://grafana.qwjw.ru' sx={{ flexGrow: 1 }}>
                        Аналитика
                    </Typography>
                    <Typography className='header__link' variant="h6" component="a" href='/profile' sx={{ flexGrow: 1 }}>
                        Профиль
                    </Typography>
                    <Typography className='header__link' variant="h6" component="a" href='/videos' sx={{ flexGrow: 1 }}>
                        Файлы
                    </Typography>
                </Toolbar>
            </AppBar>
            {children}
        </div>
    )
}

export default Layout
import React from 'react';
import { useEffect } from 'react';
import { useLocation, Routes, Route, NavLink } from 'react-router-dom';
import Main from './views/main';
import Home from './views/home';
import About from './views/about';
import Login from './views/login';
import NotFound from './views/notFound';
import Breadcrumb from './components/breadcrumb';
import { HamburgerIcon, CloseIcon } from './icons';
import 'preline/preline';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <div className='bg-gray-800'>
      <div className='space-y-4'>
        <header className='flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gray-800 text-sm py-4 dark:bg-white'>
          <nav
            className='max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between'
            aria-label='Global'
          >
            <div className='flex items-center justify-between'>
              <img className='w-10 m-3' src='/pizza-shop-icon.png' />
              <span className='font-thin flex-none text-4xl dark:text-gray-800 bg-clip-text bg-gradient-to-tr from-orange-500 to-orange-300 text-transparent'>
                Pizza Shop
              </span>
              <div className='sm:hidden'>
                <button
                  type='button'
                  className='hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-lg border border-gray-700 font-medium bg-gray-800 text-gray-400 shadow-sm align-middle hover:bg-gray-700/[.25] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800'
                  data-hs-collapse='#navbar-dark'
                  aria-controls='navbar-dark'
                  aria-label='Toggle navigation'
                >
                  <HamburgerIcon />
                  <CloseIcon />
                </button>
              </div>
            </div>
            <div
              id='navbar-dark'
              className='hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block'
            >
              <div className='flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5'>
                {[
                  { title: 'Home', to: '/' },
                  { title: 'Franchise portal', to: '/login' },
                  { title: 'About', to: '/about' },
                ].map((item) => (
                  <NavLink
                    key={item.title}
                    className='font-medium text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400  focus:text-orange-600'
                    to={item.to}
                  >
                    {item.title}
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>
        </header>
      </div>

      <Breadcrumb location={location.pathname.replace('/', '')} />

      <main className='size-full'>
        <Routes>
          <Route
            path='/'
            element={
              <Main title="The valley's best pizza">
                <Home />
              </Main>
            }
            exact
          />
          <Route
            path='/about'
            element={
              <Main title='The secret sauce'>
                <About />
              </Main>
            }
          />
          <Route
            path='/login'
            element={
              <Main title='Franchise portal'>
                <Login />
              </Main>
            }
          />
          <Route
            path='*'
            element={
              <Main title='Opps'>
                <NotFound />
              </Main>
            }
          />
        </Routes>
      </main>

      <footer className='m-8 flex justify-center'>
        <div className='container border-t-2 border-gray-200 dark:border-gray-700 max-w-3xl'>
          <nav className='-mb-0.5 flex space-x-6 justify-between'>
            {[
              { title: 'About', to: '/about' },
              { title: 'Franchise portal', to: '/login' },
              { title: 'History', to: '/history' },
            ].map((item) => (
              <NavLink
                key={item.title}
                className=' py-4 px-1 inline-flex items-center gap-2 text-sm whitespace-nowrap text-gray-200 hover:text-orange-600 focus:text-orange-600'
                to={item.to}
              >
                {item.title}
              </NavLink>
            ))}
          </nav>
          <p className='text-sm text-center italic text-gray-500'>© 2024 Pizza Shop LTD. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

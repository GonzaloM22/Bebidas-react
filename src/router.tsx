import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';

const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const IndexPage = lazy(() => import('./pages/IndexPage'));
const GenerateAI = lazy(() => import('./pages/GenerateAI'));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback="Cargando...">
                <IndexPage />
              </Suspense>
            }
            index
          />
          <Route
            path="/favoritos"
            element={
              <Suspense fallback="Cargando...">
                <FavoritesPage />
              </Suspense>
            }
          />

          <Route
            path="/generar"
            element={
              <Suspense fallback="Cargando...">
                <GenerateAI />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

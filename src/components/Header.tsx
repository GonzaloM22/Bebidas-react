import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const { pathname } = location;

  const isHomePage = useMemo(() => pathname === '/', [pathname]);

  //const isFavoritesPage = useMemo(() => pathname === '/favoritos', [pathname]);

  return (
    <header
      className={
        isHomePage ? 'bg-[url(/bg.jpg)] bg-center bg-cover' : 'bg-slate-800'
      }
    >
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="" />
          </div>
          <nav className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-orange-500 uppercase font-bold'
                  : 'text-white uppercase font-bold'
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive
                  ? 'text-orange-500 uppercase font-bold'
                  : 'text-white uppercase font-bold'
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>

        {isHomePage && (
          <form className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6 ">
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Nombre o ingredientes
              </label>
              <input
                id="ingredient"
                type="text"
                name="ingredient"
                className="p-3 w-full rounded-lg focus:outline-none bg-gray-50"
                placeholder="Nombre o ingrediente. Ej: Vodka, Tequila, Café"
              />
            </div>

            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Categoría
              </label>
              <select
                id="category"
                name="category"
                className="p-3 w-full rounded-lg focus:outline-none bg-gray-50"
              >
                <option value="">--Seleccione--</option>
              </select>
            </div>
            <input
              type="submit"
              value="Buscar recetas"
              className="cursor-pointer p-2 w-full bg-orange-800 hover:bg-orange-900 text-white font-extrabold uppercase rounded-lg"
            />
          </form>
        )}
      </div>
    </header>
  );
}

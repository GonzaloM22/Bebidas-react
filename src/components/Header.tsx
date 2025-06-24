import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppStore } from '../stores/useAppStore';

export default function Header() {
  const [ searchFilters, setSearchFilters ] = useState({
    ingredient: "",
    category: ""
  });
  const location = useLocation();
  const { fetchCategories, categories, searchRecipes, showNotification } = useAppStore();

  const { pathname } = location;

  const isHomePage = useMemo(() => pathname === '/', [pathname]);

  //const isFavoritesPage = useMemo(() => pathname === '/favoritos', [pathname]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      //Validacion

      if (Object.values(searchFilters).includes("")) {
        return showNotification({
          text: 'Todos los campos son obligatorios',
          error: true,
        });
      }

      //Consulta recetas
      await searchRecipes(searchFilters);
  }

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
          <form onSubmit={handleSubmit} className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6 ">
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
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>

            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Categoría
              </label>
              <select
                id="category"
                name="category"
                className="p-3 w-full rounded-lg focus:outline-none bg-gray-50"
                onChange={handleChange}
                value={searchFilters.category}
              >
                <option value="">--Seleccione--</option>
                {categories.drinks.map((category) => (
                  <option
                    key={category.strCategory}
                    value={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
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

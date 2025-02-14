import { FaSearch } from "react-icons/fa";
import type { Route } from "./+types/home";
import type { CardCountry } from "~/components/countryCard";
import Card from "~/components/countryCard";
import { Form, Link, useSubmit } from "react-router";
import { useEffect } from "react";

export type CountryFlag = {
  png: string;
  svg: string;
};

export type CountryName = {
  common: string;
  official: string;
  nativeName: { key: { official: string; common: string } };
};

export type Country = {
  flags: CountryFlag;
  name: CountryName;
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  tld: string[];
  currencies: { currency: { name: string; symbol: string } };
  languages: string[];
  borders: string[];
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Where in the world?" },
    {
      name: "description",
      content: "An app that shows every country in the world!",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const rawCountryData = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,"
  );
  const countryData: Country[] = await rawCountryData.json();
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const region = url.searchParams.get("region") || "";
  const newCountries = countryData.filter(
    (country) =>
      country.name.common.toLowerCase().includes(q.toLowerCase()) &&
      country.region.toLowerCase().includes(region?.toLowerCase())
  );
  return { q, region, newCountries };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { q, region, newCountries } = loaderData;
  const submit = useSubmit();

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  return (
    <div className="px-8 md:px-16 pt-8 w-full">
      <div>
        <Form
          className="flex flex-col gap-8 md:gap-0 md:flex-row md:justify-between mb-12 w-full"
          role="search"
          onChange={(event) => {
            submit(event.currentTarget);
          }}
        >
          <div className="relative">
            <input
              className="p-3 pl-10 md:w-[400px] bg-white dark:bg-[hsl(209,_23%,_22%)] rounded shadow dark:placeholder:text-white focus:outline-none"
              type="search"
              placeholder="Search for a country"
              name="q"
              id="q"
              defaultValue={q || ""}
            />
            <FaSearch className="absolute top-2 left-4 translate-y-[50%]" />
          </div>
          <select
            name="region"
            id="region"
            defaultValue={region || ""}
            className="bg-white dark:bg-[hsl(209,_23%,_22%)] shadow w-[200px] p-3 rounded focus:outline-none"
          >
            <option value="" disabled hidden>
              Select a region
            </option>
            <option value="africa">Africa</option>
            <option value="antarctica">Antarctica</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </Form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] gap-14">
        {newCountries.map((country) => {
          const newCountry: CardCountry = {
            flag: country.flags.png,
            name: country.name.common,
            population: country.population,
            region: country.region,
            capital: country.capital[0],
          };
          return (
            <Link
              key={country.name.common}
              to={`/countries/${country.name.common}`}
            >
              <Card country={newCountry} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

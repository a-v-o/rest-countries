import { Link, useNavigate } from "react-router";
import type { Route } from "./+types/countries";
import { IoMdArrowBack } from "react-icons/io";
import type { Country } from "./home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Where in the world?" },
    {
      name: "description",
      content: "An app that shows every country in the world!",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const rawData = await fetch(
    `https://restcountries.com/v3.1/name/${params.country}?fields=name,flags,nativeName,population,region,subregion,capital,tld,currencies,languages,borders`
  );
  let countryArray: Country[] = await rawData.json();
  let country = countryArray[0];
  return country;
}

export default function Country({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const country = loaderData;

  if (!country) {
    return <div>Country not found</div>;
  }

  const newCountry = {
    flag: country.flags.png,
    name: country.name.common,
    nativeName: Object.values(country.name.nativeName)[0],
    population: country.population,
    region: country.region,
    subregion: country.subregion,
    capital: country.capital[0],
    topLevelDomain: country.tld[0],
    currencies: Object.values(country.currencies),
    languages: Object.values(Object.values(country.languages)),
    borders: country.borders,
  };
  return (
    <div className="flex flex-col gap-8 px-8 md:px-16 min-h-screen pt-8">
      <button
        type="button"
        className="self-start flex align-center items-center gap-1.5 hover:bg-[#f4f4f4] dark:hover:bg-[hsl(207,23%,31%)] bg-[hsl(0,_0%,_98%)] dark:bg-[hsl(209,_23%,_22%)] px-5 py-1 text-sm rounded-sm shadow"
        onClick={() => {
          navigate(-1);
        }}
      >
        <IoMdArrowBack />
        Back
      </button>
      <div className="flex flex-col md:flex-row justify-between gap-24">
        <div className="w-full">
          <img src={newCountry.flag} alt={"Flag of " + newCountry.name} />
        </div>
        <div className="w-full">
          <h1 className="font-bold text-2xl py-6">{newCountry.name}</h1>
          <div className="flex flex-col md:flex-row justify-between mb-8 gap-8 md:gap-0 leading-6 text-sm">
            <div>
              <p>Native name: {newCountry.nativeName.official}</p>
              <p>Population: {newCountry.population}</p>
              <p>Region: {newCountry.region}</p>
              <p>Subregion: {newCountry.subregion}</p>
              <p>Capital: {newCountry.capital}</p>
            </div>
            <div>
              <p>Top-level Domain: {newCountry.topLevelDomain}</p>
              <p>
                Currencies:{" "}
                {newCountry.currencies?.map((currency, index, arr) => {
                  if (index == arr.length - 1) {
                    return <span>{currency.name}</span>;
                  }
                  return <span>{currency.name + ", "}</span>;
                })}
              </p>
              <p>
                Languages:{" "}
                {newCountry.languages?.map((language, index, arr) => {
                  if (index == arr.length - 1) {
                    return <span>{language}</span>;
                  }
                  return <span>{language + ", "}</span>;
                })}
              </p>
            </div>
          </div>

          <div className="text-sm mb-8">
            <p className="mr-2 inline">Border Countries: </p>

            {newCountry.borders?.map((border) => {
              return (
                <div className="px-3 py-1 hover:bg-[#f4f4f4] dark:hover:bg-[hsl(207,23%,31%)] shadow-sm bg-[hsl(0,_0%,_98%)] dark:bg-[hsl(209,_23%,_22%)] mr-2 mb-2 inline-flex rounded-md">
                  <Link to={`/countries/${border}`}>{border} </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

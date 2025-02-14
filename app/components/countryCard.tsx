export type CardCountry = {
  flag: string;
  name: string;
  population: number;
  region: string;
  capital: string | undefined;
};

export default function Card({ country }: { country: CardCountry }) {
  return (
    <div className="flex flex-col md:max-w-[250px] flex-wrap bg-white hover:bg-[#f4f4f4] dark:hover:bg-[hsl(207,23%,31%)] dark:bg-[hsl(209,_23%,_22%)] shadow rounded-lg overflow-hidden pb-8">
      <div className="w-full min-h-32 overflow-hidden">
        <img
          src={country.flag}
          alt={"Flag of" + country.name}
          className="w-full object-cover aspect-[5/3]"
        />
      </div>
      <div className="p-4 flex flex-col text-sm">
        <h2 className="my-2 font-bold">{country.name}</h2>
        <p>Population: {country.population}</p>
        <p>Region: {country.region}</p>
        <p>Capital: {country.capital}</p>
      </div>
    </div>
  );
}

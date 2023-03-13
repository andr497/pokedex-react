/* eslint-disable no-unused-vars */
import { COLOR, URL_IMAGE_ARTWORKS } from "./constants";

export function colorPokemonTypes(types) {
  if (!types) {
    return {
      colorType1: "",
      colorType2: "",
    };
  }

  return {
    colorType1: COLOR[types[0].type.name],
    colorType2:
      COLOR[types[1]?.type.name] == undefined
        ? COLOR[types[0].type?.name]
        : COLOR[types[1].type?.name],
  };
}

export function fixPokemonName(name) {
  if (!name) {
    return "";
  }

  //No aplicar el metodo split a estos nombres
  const excludeNamesToSplit = ["ho-oh", "jangmo-o", "hakamo-o", "kommo-o"];

  if (excludeNamesToSplit.includes(name)) {
    return name;
  }

  //Corregir nombre de los Nidoran
  if (name.includes("nidoran-")) {
    const [nidoranName, gender] = name.split("-");
    return gender === "f" ? `${nidoranName} ♀️` : `${nidoranName} ‍♂️`;
  }

  //Corregir el nombre de Type: null
  if (name === "type-null") {
    return name.replace("-", ": ");
  }

  //Corregir nombre de mr mime y mr rime
  if (name.startsWith("mr-")) {
    return name.replace("-", ". ");
  }

  //Fix name mime jr
  if (name.endsWith("-jr")) {
    return name.replace("-", " ") + ".";
  }

  return name.replace("-", " ");
}

export function fixStatsName(name) {
  if (!name) {
    return "";
  }

  if (name.includes("special")) {
    return name.replace("special-", "sp. ");
  }

  return name;
}

export function fixAbilitiesName(name) {
  if (!name) {
    return "";
  }

  if (name.includes("-")) {
    return name.replace("-", " ");
  }

  return name;
}

export function fixVarietiesName(name, is_default) {
  if (!name) {
    return "";
  }

  if (name.includes("-")) {
    return name.replace("-", " ");
  }

  return name;
}

export function convertHectogramToKilogram(hg) {
  //1 hectogram = 0.1 kilograms
  return hg / 10;
}

export function convertDecimeterToMeter(mt) {
  //1 Decimeter = 0.1 meters
  return mt / 10;
}

const depthFirst = (getChildren) => (tree, path) =>
  [
    { node: tree, path },
    ...(getChildren(tree) || []).flatMap((node) =>
      depthFirst(getChildren)(node, [...path, tree])
    ),
  ];

const makePokes = (pokes) => {
  return Object.values(
    depthFirst((node) => {
      return node.evolves_to;
    })(pokes.chain, [])
      .map(({ node, path }) => {
        return { node, depth: path.length };
      })
      .reduce((a, { node, depth }) => {
        let pokemonID = node.species.url.split("/")[6];
        let urlArtWork = URL_IMAGE_ARTWORKS;
        let evo_details = node.evolution_details[0];

        return {
          ...a,
          [depth]: [
            ...(a[depth] || []),
            {
              id: pokemonID,
              species_name: node.species.name,

              min_level: evo_details?.min_level ?? null,
              trigger_name: evo_details?.trigger?.name ?? null,

              item: evo_details?.item?.name ?? null,
              held_item: evo_details?.held_item?.name ?? null,

              known_move: evo_details?.known_move?.name ?? null,
              known_move_type: evo_details?.known_move_type?.name ?? null,

              min_affection: evo_details?.min_affection ?? null,
              min_beauty: evo_details?.min_beauty ?? null,
              min_happiness: evo_details?.min_happiness ?? null,

              needs_overworld_rain: evo_details?.needs_overworld_rain ?? null,
              party_species: evo_details?.party_species?.name ?? null,
              party_type: evo_details?.party_type?.name ?? null,
              time_of_day: evo_details?.time_of_day ?? null,
              trade_species: evo_details?.trade_species?.name ?? null,
              location: evo_details?.location?.name ?? null,
              turn_upside_down: evo_details?.turn_upside_down ?? null,

              relative_physical_stats:
                evo_details?.relative_physical_stats ?? null,

              gender: evo_details?.gender ?? null,
              url: node.species.url,

              image: urlArtWork + pokemonID + ".png",

              /*
              gender
              held_item
              item
              known_move
              known_move_type
              location
              min_affection
              min_beauty
              min_happiness
              min_level
              needs_overworld_rain
              party_species
              party_type
              relative_physical_stats
              time_of_day
              trade_species
              trigger
              turn_upside_down
              */
            },
          ],
        };
      }, {})
  );
};

export function fixEvolutionChain(evolution) {
  if (!evolution) {
    return null;
  }

  let evoData = makePokes(evolution);

  return evoData;
}

//FUNCIONES PARA CALCULAR LAS ESTADISTICAS

const maxValueArrObject = (arr) => {
  const max = arr.reduce(function (prev, current) {
    return prev.base_stat > current.base_stat ? prev : current;
  });

  return max.base_stat;
};

const processStatsPokemonObject = (stats) => {
  let cleanArray = [];

  stats.forEach((value, key) => {
    cleanArray.push({
      base_stat: value.base_stat,
      effort: value.effort,
      name: value.stat.name,
    });
  });

  const max = maxValueArrObject(cleanArray);
  calculatePercentageStats(max, cleanArray);

  return cleanArray;
};

const calculatePercentageStats = (max, arr) => {
  arr.forEach((v) => {
    let percentage = (v.base_stat * 100) / max;

    v.percentage = percentage;
  });
};

const calculateMAXMINStats = (stats, id, minmax = "MAX") => {
  let MAX_IV = 0;
  let MAX_EV = 0;

  if (minmax === "MAX") {
    MAX_IV = 31;
    MAX_EV = 63;
  }

  let newStats = [];

  stats.forEach((stat) => {
    let valor = 0;
    if (stat.name === "hp") {
      //ID 292 Shedinja
      valor =
        id === 292
          ? 1
          : Math.floor(
              ((2 * stat.base_stat + MAX_IV + MAX_EV) * 100) / 100 + 100 + 10
            );
    } else {
      valor = Math.floor(
        Math.floor(((2 * stat.base_stat + MAX_IV + MAX_EV) * 100) / 100 + 5) *
          1.1
      );
    }

    newStats.push({
      ...stat,
      base_stat: valor,
    });
  });

  const max = maxValueArrObject(newStats);
  calculatePercentageStats(max, newStats);

  return newStats;
};

export function calculateStatsPokemon(stats, id) {
  if (typeof stats === "undefined") {
    return false;
  }

  let cleanStats = processStatsPokemonObject(stats);

  let maxStats = calculateMAXMINStats(cleanStats, id);

  let minStats = calculateMAXMINStats(cleanStats, id, "MIN");

  return {
    baseStats: cleanStats,
    maxStats: maxStats,
    minStats: minStats,
  };
}

//Other functions

export function wc_hex_is_light(color) {
  const hex = color.replace("#", "");
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;

  return brightness < 155;
}

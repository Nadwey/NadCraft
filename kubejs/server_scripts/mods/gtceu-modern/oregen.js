GTCEuServerEvents.oreVeins((event) => {
  event.modifyAll((id, vein) => {
    let biome = null;

    switch (vein.layer()) {
        case GTWorldGenLayers.STONE:
        case GTWorldGenLayers.DEEPSLATE:
            biome = "nadcraft:mining_overworld";
            break;
        case GTWorldGenLayers.ENDSTONE:
            biome = "nadcraft:mining_end";
            break;
        case GTWorldGenLayers.NETHERRACK:
            biome = "nadcraft:mining_nether";
            break;
    }

    console.log(`Putting ${id} in ${biome}`);

    vein.biomes(biome);
    vein.dimensions(biome);
  });
});

GTCEuStartupEvents.registry("gtceu:world_gen_layer", (event) => {
  GTWorldGenLayers.STONE.levels = [
    new ResourceLocation("minecraft", "overworld"),
    new ResourceLocation("nadcraft", "mining_overworld"),
  ];
  GTWorldGenLayers.DEEPSLATE.levels = [
    new ResourceLocation("minecraft", "overworld"),
    new ResourceLocation("nadcraft", "mining_overworld"),
  ];
  GTWorldGenLayers.NETHERRACK.levels = [
    new ResourceLocation("minecraft", "the_nether"),
    new ResourceLocation("nadcraft", "mining_nether"),
  ];
  GTWorldGenLayers.ENDSTONE.levels = [
    new ResourceLocation("minecraft", "the_end"),
    new ResourceLocation("nadcraft", "mining_end"),
  ];
});

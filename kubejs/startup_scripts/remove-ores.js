// TODO: Finish this and maybe do it "the proper way"
WorldgenEvents.remove((event) => {
  event.removeOres((props) => {
    props.worldgenLayer = "underground_ores";
    props.blocks = [
      // Immersive Engineering
      "immersiveengineering:ore_uranium",
      "immersiveengineering:deepslate_ore_uranium",
      "immersiveengineering:ore_silver",
      "immersiveengineering:deepslate_ore_silver",

      // Create
      "create:zinc_ore",
      "create:deepslate_zinc_ore",

      // Railcraft
      "railcraft:lead_ore",
      "railcraft:deepslate_lead_ore",
      "railcraft:nickel_ore",
      "railcraft:deepslate_nickel_ore",
      "railcraft:silver_ore",
      "railcraft:deepslate_silver_ore",
      "railcraft:tin_ore",
      "railcraft:deepslate_tin_ore",
      "railcraft:zinc_ore",
      "railcraft:deepslate_zinc_ore",

      // XyCraft: World
      "xycraft_world:aluminum_ore_stone",
      "xycraft_world:aluminum_ore_deepslate",
      "xycraft_world:aluminum_ore_kivi",
    ];
  });
});

// TODO
WorldgenEvents.remove((event) => {
  event.removeOres((props) => {
    props.worldgenLayer = "underground_ores";
    props.blocks = [
      // Immersive Engineering
      "immersiveengineering:deepslate_ore_uranium",
      "immersiveengineering:ore_uranium",
    ];
  });
});

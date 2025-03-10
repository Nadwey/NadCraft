ServerEvents.recipes((event) => {
  event.remove({ id: "clickmachine:auto_clicker" });

  event.shaped(Item.of("clickmachine:auto_clicker"), ["iri", "rzr", "ibi"], {
    i: "#forge:ingots/iron",
    r: "#forge:dusts/redstone",
    z: "#forge:ingots/zinc",
    b: "minecraft:iron_bars",
  });
});

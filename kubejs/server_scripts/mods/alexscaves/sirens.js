ServerEvents.recipes((event) => {
    event.shaped(
        Item.of("alexscaves:nuclear_siren", 1),
        [
            "UAU",
            "NNN",
        ],
        {
            A: "mekanism:industrial_alarm",
            U: "#forge:ingots/uranium",
            N: "minecraft:note_block",
        }
    );

    event.shaped(
        Item.of("alexscaves:siren_light", 1),
        [
            "GCG",
            "LAL",
            "GCG",
        ],
        {
            C: "#forge:circuits/basic",
            A: "mekanism:industrial_alarm",
            L: "mekanismgenerators:laser_focus_matrix",
            G: "#forge:glass/colorless"
        }
    );
});

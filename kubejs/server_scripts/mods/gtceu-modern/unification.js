ServerEvents.recipes((event) => {
    // fluid tags are apparently not supported
    event.replaceInput("*", Fluid.of("gtceu:oil_medium"), Fluid.of("tfmg:crude_oil"));

    event.replaceInput({ input: "gtceu:treated_wood_planks" }, "gtceu:treated_wood_planks", "#forge:treated_wood");
});

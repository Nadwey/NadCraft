ServerEvents.recipes((event) => {
    // fluid tags are apparently not supported
    event.replaceInput("*", Fluid.of("gtceu:oil_medium"), Fluid.of("tfmg:crude_oil"));
});

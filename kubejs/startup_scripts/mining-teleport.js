StartupEvents.registry("block", (event) => {
    event
        .create("mining_teleport")
        .displayName("Mining Teleport")
        .soundType("metal")
        .hardness(5.0)
        .resistance(5.0)
        .requiresTool(false)
        .tagBlock("minecraft:mineable/pickaxe");
});

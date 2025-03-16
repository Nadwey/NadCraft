ServerEvents.recipes((event) => {
    event.custom({
        type: "mekanism:nucleosynthesizing",
        itemInput: { ingredient: { tag: "forge:nuggets/iron", amount: 1 } },
        gasInput: { amount: 1, gas: "mekanism:antimatter" },
        output: { item: "mysticalagriculture:prosperity_shard" },
        duration: 20,
    });
});

/**
 *
 * @param {string} dimension
 * @param {Internal.Player} player
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
function teleportToMiningDimension(dimension, player, x, y, z) {
    player.teleportTo(dimension, x, y, z, 0, 0);
}

const DIMENSIONS = Object.freeze({
    OVERWORLD: "minecraft:overworld",
    NETHER: "minecraft:the_nether",
    THE_END: "minecraft:the_end",
    MINING_OVERWORLD: "nadcraft:mining_overworld",
    MINING_NETHER: "nadcraft:mining_nether",
    MINING_THE_END: "nadcraft:mining_end",
});

const teleportPositionByDimension = {
    "nadcraft:mining_overworld": BlockPos(0, 167, 0),
    "nadcraft:mining_nether": BlockPos(0, 128, 0),
    "nadcraft:mining_end": BlockPos(0, 128, 0),
};

BlockEvents.rightClicked("kubejs:mining_teleport", (event) => {
    const dimensionId = event.level.dimension.toString();

    switch (dimensionId) {
        case DIMENSIONS.OVERWORLD:
            teleportToMiningDimension(DIMENSIONS.MINING_OVERWORLD, event.player, 0, 168, 0);
            break;
        case DIMENSIONS.NETHER:
            teleportToMiningDimension(DIMENSIONS.MINING_NETHER, event.player, 0, 129, 0);
            break;
        case DIMENSIONS.THE_END:
            teleportToMiningDimension(DIMENSIONS.MINING_OVERWORLD, event.player, 0, 129, 0);
            break;
        case DIMENSIONS.MINING_OVERWORLD:
        case DIMENSIONS.MINING_NETHER:
        case DIMENSIONS.MINING_THE_END:
            // TODO: Link 2 teleports
            let targetPosition = event.player.getRespawnPosition();
            let targetLevel = event.player.getRespawnDimension();

            if (!targetPosition || !targetLevel) {
                targetLevel = "minecraft:overworld";
                targetPosition = event.player.server.getLevel(targetLevel).getSharedSpawnPos();
            }

            event.player.teleportTo(targetLevel, targetPosition.x, targetPosition.y, targetPosition.z, 0, 0);
            break;
    }
});

CommonAddedEvents.playerChangeDimension((event) => {
    const dimensionId = event.level.dimension.toString();
    const teleportPosition = teleportPositionByDimension[dimensionId];

    if (teleportPosition && !event.level.persistentData.teleportPlaced) {
        event.level.setBlock(teleportPosition, Block.getBlock("kubejs:mining_teleport").defaultBlockState(), 11);
        event.level.persistentData.teleportPlaced = true;
    }
});

ServerEvents.recipes((event) => {
    event.shaped(
        Item.of("kubejs:mining_teleport"),
        [
            "sis",
            "ipi",
            "sis",
        ],
        {
            s: "#forge:storage_blocks/steel",
            i: "#forge:storage_blocks/iron",
            p: "minecraft:diamond_pickaxe",
        }
    );
});

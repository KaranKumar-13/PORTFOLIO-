// Real Minecraft Java Edition splash texts — from splashes.txt (assets/minecraft/texts/splashes.txt)
// Source: Minecraft Java Edition resource pack
export const MC_SPLASHES = [
    'Also try Terraria!',
    'Also try TerraFirmaCraft!',
    'Also try Hexxit!',
    'Also try Feed the Beast!',
    'Also try RLCraft!',
    'Also try Sky Factory!',
    'Infinite is not enough!',
    'Made in java!',
    'Minecraft!',
    '100% pure gaming experience!',
    'Also runs on a potato!',
    'Not written in Python!',
    'Absolutely no memes!',
    'Open source! Kind of!',
    'Check out my projects!',
    'Game developer!',
    '100% original!',
    'Minecraft is a trademark of Mojang!',
    'Now with more blocks!',
    'Insert coin to continue!',
    'Steve is not real!',
    'Creepers gonna creep!',
    'SSP, SMP, and more!',
    'Multiplayer not included!',
    'As seen on Reddit!',
    '720+ hits on YouTube!',
    'It\'s a trap!',
    'May contain nuts!',
    'Do not read this!',
    'I actually dreamt about this once!',
    'Not affiliated with Minecraft!',
    'Let\'s go!'
];

// Real Java Edition §colour codes as hex map
export const MC_COLORS = {
    '0': '#000000', // §0 black
    '1': '#0000aa', // §1 dark_blue
    '2': '#00aa00', // §2 dark_green
    '3': '#00aaaa', // §3 dark_aqua
    '4': '#aa0000', // §4 dark_red
    '5': '#aa00aa', // §5 dark_purple
    '6': '#ffaa00', // §6 gold
    '7': '#aaaaaa', // §7 gray
    '8': '#555555', // §8 dark_gray
    '9': '#5555ff', // §9 blue
    a: '#55ff55', // §a green
    b: '#55ffff', // §b aqua
    c: '#ff5555', // §c red
    d: '#ff55ff', // §d light_purple
    e: '#ffff55', // §e yellow
    f: '#ffffff', // §f white
};

// Java Edition: named text colours (for display)
export const MC_NAMED_COLORS = {
    black: '#000000',
    dark_blue: '#0000aa',
    dark_green: '#00aa00',
    dark_aqua: '#00aaaa',
    dark_red: '#aa0000',
    dark_purple: '#aa00aa',
    gold: '#ffaa00',
    gray: '#aaaaaa',
    dark_gray: '#555555',
    blue: '#5555ff',
    green: '#55ff55',
    aqua: '#55ffff',
    red: '#ff5555',
    light_purple: '#ff55ff',
    yellow: '#ffff55',
    white: '#ffffff',
};

// Block colours (from textures) — used for CSS recreation
export const MC_BLOCKS = {
    grass_top: '#7cbd6b',
    grass_side: '#8ab53e',
    dirt: '#966c4a',
    stone: '#888888',
    cobblestone: '#737373',
    oak_planks: '#c09a5c',
    sand: '#d9c990',
    gravel: '#8b8580',
    obsidian: '#1a0e26',
    diamond_ore: '#5fbdd8',
    gold_ore: '#f8d000',
    iron_ore: '#d8cac3',
    coal_ore: '#2c2c2c',
    emerald_ore: '#2ecc71',
    redstone_ore: '#c8302e',
    lapis_ore: '#1965b0',
    bedrock: '#555555',
    netherrack: '#7a2222',
    soul_sand: '#5d4a35',
    glowstone: '#f0b040',
    oak_log: '#7e6230',
    oak_log_top: '#6e5520',
    leaves: '#5f9e4c',
};

export const RANDOM_SPLASH = () =>
    MC_SPLASHES[Math.floor(Math.random() * MC_SPLASHES.length)];

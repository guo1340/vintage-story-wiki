window.WikiData = {
  site: {
    name: 'Vintage Story Wiki',
    shortName: 'Vintage Story Wiki',
    baseUrl: 'https://vintagestory.gamewikihub.com',
    titleSuffix: 'Vintage Story Wiki',
    defaultDescription: 'A practical Vintage Story survival handbook for crafting, farming, smithing, prospecting, temporal storms, creatures, world generation and mods.',
    defaultOgImage: '/assets/images/hero/homepage-hero.svg',
    lastUpdated: '2026-05-24',
    buildStatus: 'Current general survival guidance; verify exact numbers against your game version.'
  },

  sourceRegistry: {
    officialSite: {
      label: 'Vintage Story Official Site',
      url: 'https://www.vintagestory.at/',
      note: 'Official game overview and purchasing source.'
    },
    officialWiki: {
      label: 'Vintage Story Official Wiki',
      url: 'https://wiki.vintagestory.at/',
      note: 'Primary reference for mechanics, blocks, items and systems.'
    },
    modDb: {
      label: 'Vintage Story Mod Database',
      url: 'https://mods.vintagestory.at/',
      note: 'Official community mod listing and compatibility reference.'
    },
    forums: {
      label: 'Vintage Story Forums',
      url: 'https://www.vintagestory.at/forums/',
      note: 'Developer and community discussion around updates and play strategies.'
    }
  },

  categories: [
    { id: 'getting-started', title: 'Getting Started', icon: 'compass', summary: 'First-day priorities, beginner mistakes, early ages and survival order.' },
    { id: 'survival', title: 'Survival', icon: 'campfire', summary: 'Hunger, body temperature, weather, temporal stability and winter readiness.' },
    { id: 'crafting', title: 'Crafting', icon: 'tools', summary: 'Knapping, clay forming, storage, recipes and mechanical power.' },
    { id: 'farming', title: 'Farming', icon: 'wheat', summary: 'Crops, animals, fruit trees, bees, cooking and preservation.' },
    { id: 'smithing', title: 'Smithing', icon: 'anvil', summary: 'Metal progression, alloys, anvils, bloomery work, iron and steel.' },
    { id: 'exploration', title: 'Exploration', icon: 'map', summary: 'Biomes, traders, ruins, caves, prospecting and temporal danger.' },
    { id: 'creatures', title: 'Creatures', icon: 'shield', summary: 'Drifters, wildlife, weapons, armor, healing and combat habits.' },
    { id: 'building', title: 'Building', icon: 'home', summary: 'Shelter, insulation, lighting, storage, cellars and decorative blocks.' },
    { id: 'world-generation', title: 'World Generation', icon: 'globe', summary: 'Climate, ore abundance, caves, temporal settings and custom seeds.' },
    { id: 'guides', title: 'Guides', icon: 'book', summary: 'High-value survival tutorials for winter, ores, windmills and progression.' },
    { id: 'updates', title: 'Updates', icon: 'scroll', summary: 'Patch notes, version changes, upcoming features and developer news.' },
    { id: 'mods', title: 'Mods', icon: 'gear', summary: 'Best mods, QoL mods, graphics mods, hardcore mods and installation.' }
  ],

  pages: [
    page('getting-started', 'first-day-guide', 'First Day Guide', 'Your first day is about tools, food, fire and a safe place to think.', ['Spawning safely', 'Gathering sticks and flint', 'Knapping a knife and axe', 'Foraging berries and mushrooms', 'Lighting the first firepit', 'Choosing temporary shelter']),
    page('getting-started', 'beginner-mistakes', 'Beginner Mistakes', 'Most early deaths come from ignoring seasons, storage and temporal pressure.', ['Starving while exploring', 'Planting too late', 'Leaving food unsealed', 'Ignoring warm clothing', 'Mining before marking routes', 'Fighting in darkness']),
    page('getting-started', 'early-game-progression', 'Early Game Progression', 'Move from stone to copper, bronze, iron and steel with deliberate resource goals.', ['Stone age tools', 'Copper prospecting', 'Bronze alloys', 'Iron blooms', 'Steel preparation', 'When to move base']),
    page('getting-started', 'survival-priorities', 'Survival Priorities', 'Food, shelter, tools, storage, farming, smithing and winter stores come in that order.', ['Food before ambition', 'Shelter before nightfall', 'Storage before hoarding', 'Farming before winter', 'Smithing before heavy industry']),

    page('survival', 'hunger-nutrition', 'Hunger & Nutrition', 'Nutrition is a long-term survival system, not just a hunger bar.', ['Satiety', 'Nutrition categories', 'Balanced meals', 'Healing effects', 'Food penalties', 'Pantry planning']),
    page('survival', 'body-temperature', 'Body Temperature', 'Cold weather punishes unprepared players before it becomes visibly dramatic.', ['Seasons', 'Freezing risk', 'Clothing warmth', 'Overheating', 'Regional climate', 'Travel planning']),
    page('survival', 'temporal-stability', 'Temporal Stability', 'Temporal mechanics turn exploration into a risk-management problem.', ['Stability loss', 'Temporal storms', 'Rifts', 'Gear decay', 'Recovery habits', 'Safe-room planning']),
    page('survival', 'weather', 'Weather', 'Rain, snow, wind and storms reshape travel, farming and survival routines.', ['Rainfall', 'Snow cover', 'Storm visibility', 'Wind', 'Crop effects', 'Route safety']),

    page('crafting', 'knapping', 'Knapping', 'Stone toolmaking is the first craft that decides how fast your run stabilizes.', ['Stone tools', 'Spear heads', 'Knife blades', 'Axe heads', 'Pattern discipline', 'Resource efficiency']),
    page('crafting', 'clay-forming', 'Clay Forming', 'Clay unlocks cooking, storage, molds and the workshop economy.', ['Vessels', 'Bowls', 'Cooking pots', 'Molds', 'Storage pots', 'Pit kilns']),
    page('crafting', 'mechanical-power', 'Mechanical Power', 'Windmills and axle systems turn manual labor into infrastructure.', ['Windmills', 'Helve hammers', 'Querns', 'Pulverizers', 'Axles', 'Transmission layout']),
    page('crafting', 'windmill-power', 'Windmill Power', 'A good windmill is a production system, not a decoration.', ['Sail count', 'Height', 'Clearance', 'Torque path', 'Workshop placement', 'Maintenance']),

    page('farming', 'crop-farming', 'Crop Farming', 'Good farms are planned around nutrients, seasons and storage, not pretty rows.', ['Soil nutrients', 'Crop rotation', 'Watering', 'Fertilizer', 'Growth speed', 'Climate compatibility']),
    page('farming', 'animal-husbandry', 'Animal Husbandry', 'Animals reward steady feeding, breeding control and protected pens.', ['Chickens', 'Goats', 'Sheep', 'Pigs', 'Cows', 'Generational progress']),
    page('farming', 'fruit-trees', 'Fruit Trees', 'Orchards are slow to establish but excellent long-term food infrastructure.', ['Tree placement', 'Seasons', 'Harvest timing', 'Storage', 'Climate', 'Spacing']),
    page('farming', 'bee-keeping', 'Bee Keeping', 'Bees are quiet food and wax production if you give them time and flowers.', ['Skep placement', 'Flower range', 'Honeycomb', 'Wax', 'Expansion', 'Safety']),
    page('farming', 'food-preservation', 'Food Preservation', 'Preservation is the difference between a good harvest and a winter pantry.', ['Crocks', 'Sealing', 'Cellars', 'Smoking', 'Salting', 'Spoilage control']),
    page('farming', 'cooking', 'Cooking', 'Meals are a nutrition tool, a healing tool and a storage strategy.', ['Stews', 'Pies', 'Bread', 'Nutrition optimization', 'Ingredient pairing', 'Travel meals']),

    page('smithing', 'anvil-guide', 'Anvil Guide', 'The anvil is where metal becomes progress, if your heat and hammering are disciplined.', ['Anvil tiers', 'Work item heat', 'Hammer modes', 'Voxel movement', 'Common mistakes', 'Workshop layout']),
    page('smithing', 'alloy-guide', 'Alloy Guide', 'Bronze and advanced metals reward planning your ore finds before you melt them.', ['Tin bronze', 'Bismuth bronze', 'Black bronze', 'Ratios', 'Crucibles', 'Batch records']),
    page('smithing', 'iron-production', 'Iron Production', 'Iron starts as ore logistics and bloomery discipline before it becomes tools.', ['Ore sources', 'Charcoal demand', 'Bloomery build', 'Bloom handling', 'Smithing sequence', 'Scaling output']),
    page('smithing', 'steel-production', 'Steel Production', 'Steel is a late-game industry that needs fuel, planning and patience.', ['Prerequisites', 'Cementation', 'Fuel chain', 'Temperature control', 'Tool priorities', 'Failure costs']),
    page('smithing', 'armor', 'Chain & Plate Armor', 'Armor is a tradeoff between protection, cost, mobility and repair burden.', ['Gambeson', 'Chain armor', 'Plate armor', 'Movement penalties', 'Repair', 'When to craft']),

    page('exploration', 'biomes', 'Biomes', 'Biomes define climate, food options, hazards and which survival plan makes sense.', ['Forests', 'Plains', 'Tundra', 'Mountains', 'Deserts', 'Swamps']),
    page('exploration', 'prospecting', 'Prospecting', 'Prospecting is one of the most important skills in Vintage Story.', ['Prospecting pick modes', 'Ore density', 'Reading samples', 'Chunk strategy', 'Cave checks', 'Marking results']),
    page('exploration', 'traders', 'Traders', 'Traders turn exploration into targeted progression and rare-item access.', ['Trader types', 'Useful goods', 'Rare items', 'Routes', 'Trade strategy', 'Marking camps']),
    page('exploration', 'ruins-lore', 'Ruins & Lore', 'Ruins are resource sites, danger zones and story fragments in one.', ['Ruins', 'Translocators', 'Archives', 'Lore fragments', 'Loot safety', 'Hidden locations']),
    page('exploration', 'cave-exploration', 'Cave Exploration', 'Caves are rich, dark and very good at making players overcommit.', ['Lighting', 'Route markers', 'Ore checks', 'Creature risk', 'Escape habits', 'Inventory discipline']),

    page('creatures', 'drifters', 'Drifters', 'Drifters punish poor lighting, bad timing and careless temporal exposure.', ['Variants', 'Spawn mechanics', 'Attack behavior', 'Weaknesses', 'Loot', 'Farming safety']),
    page('creatures', 'wildlife', 'Wildlife', 'Animals are resources until they become a combat problem.', ['Wolves', 'Bears', 'Hyenas', 'Rabbits', 'Deer', 'Habitats']),
    page('creatures', 'weapons', 'Weapons', 'Choose weapons by reach, durability, stamina and the fight you expect.', ['Spears', 'Bows', 'Swords', 'Maces', 'Shields', 'Durability']),
    page('creatures', 'healing', 'Healing', 'Good healing starts before the wound: bandages, nutrition and retreat routes.', ['Bandages', 'Poultices', 'Nutrition', 'Rest', 'Combat withdrawal', 'Travel kit']),

    page('building', 'house-building', 'House Building', 'A good base is warm, readable, expandable and close to the right resources.', ['Insulation', 'Room planning', 'Support systems', 'Roofing', 'Workshop placement', 'Defensive habits']),
    page('building', 'storage-systems', 'Storage Systems', 'Storage is how you convert clutter into survival speed.', ['Chests', 'Vessels', 'Crates', 'Labels', 'Workshop zones', 'Overflow control']),
    page('building', 'lighting', 'Lighting', 'Lighting protects work speed, morale and night navigation.', ['Torches', 'Lanterns', 'Oil lamps', 'Chandeliers', 'Fuel efficiency', 'Path marking']),
    page('building', 'cellars', 'Cellars', 'A cellar is a food-preservation machine disguised as a room.', ['Temperature', 'Depth', 'Shelves', 'Crock layout', 'Access', 'Expansion']),

    page('world-generation', 'world-presets', 'World Presets', 'World settings quietly decide the shape and difficulty of an entire save.', ['Preset tradeoffs', 'Climate', 'Ore abundance', 'Caves', 'Temporal settings', 'Difficulty']),
    page('world-generation', 'climate-settings', 'Climate Settings', 'Climate settings change farming, clothing, travel and base location value.', ['Temperature', 'Rainfall', 'Seasons', 'Crop viability', 'Regional planning', 'Risk']),
    page('world-generation', 'ore-abundance', 'Ore Abundance', 'Ore abundance controls how hard metallurgy asks you to work.', ['Scarcity', 'Progression speed', 'Prospecting value', 'Mining routes', 'Server balance', 'Replay goals']),
    page('world-generation', 'custom-seeds', 'Custom Seeds', 'Seeds are useful when you want a planned challenge or reproducible world.', ['Seed selection', 'Spawn region', 'Climate testing', 'Resource checks', 'Sharing worlds', 'Challenge runs']),

    page('guides', 'survive-winter', 'How to Survive Winter', 'Winter is won in autumn, with calories, clothing, fuel and preserved food.', ['Food reserves', 'Warm clothing', 'Cellars', 'Fuel', 'Travel limits', 'Emergency meals']),
    page('guides', 'copper-guide', 'Copper Guide', 'Copper is the first big leap from survival improvisation to planned industry.', ['Surface nuggets', 'Prospecting', 'Crucibles', 'Casting', 'Tool priority', 'Mining follow-up']),
    page('guides', 'iron-guide', 'Iron Guide', 'Iron is a logistics project: ore, charcoal, bloomery work and tool planning.', ['Finding ore', 'Charcoal scale', 'Bloomery use', 'Anvil work', 'Tool heads', 'Expansion']),
    page('guides', 'build-a-windmill', 'How to Build a Windmill', 'Windmills pay off when they are placed for wind, torque and workshop flow.', ['Site choice', 'Sails', 'Axles', 'Gearing', 'Helve hammer', 'Troubleshooting']),
    page('guides', 'temporal-storms', 'How Temporal Storms Work', 'Temporal storms are predictable enough to prepare for and dangerous enough to respect.', ['Warnings', 'Shelter', 'Lighting', 'Fighting', 'Aftermath', 'Recovery']),
    page('guides', 'find-ore-fast', 'How to Find Ore Fast', 'Fast ore discovery is systematic sampling, not wandering with hope.', ['Prospecting grid', 'Density reading', 'Geology', 'Cave checks', 'Map notes', 'Follow-up shafts']),

    page('mods', 'best-mods', 'Best Mods', 'The best mods improve the long game without erasing the survival texture.', ['Quality of life', 'World additions', 'Crafting depth', 'Balance', 'Compatibility', 'Version checks']),
    page('mods', 'qol-mods', 'QoL Mods', 'Quality-of-life mods should reduce friction without removing meaningful decisions.', ['Inventory', 'Map markers', 'Interface', 'Storage', 'Crafting helpers', 'Server use']),
    page('mods', 'graphics-mods', 'Graphics Mods', 'Visual mods can improve atmosphere, readability and immersion.', ['Texture packs', 'Lighting', 'Shaders', 'Performance', 'Compatibility', 'Screenshots']),
    page('mods', 'hardcore-mods', 'Hardcore Mods', 'Hardcore mods make scarcity, weather and combat harsher for veteran players.', ['Scarcity', 'Hostile worlds', 'Combat danger', 'Food pressure', 'Server balance', 'Run goals']),
    page('mods', 'installation-guide', 'Mod Installation Guide', 'Modding works best when you manage versions and test changes deliberately.', ['Finding mods', 'Version compatibility', 'Install location', 'Server setup', 'Testing', 'Backups']),

    page('updates', 'patch-notes', 'Patch Notes', 'Track major changes that affect survival, crafting, world generation and mods.', ['Version changes', 'Balance shifts', 'New systems', 'Mod impact', 'Save safety', 'Where to verify']),
    page('updates', 'upcoming-features', 'Upcoming Features', 'Use upcoming-feature notes as planning context, not guaranteed strategy.', ['Roadmap caution', 'Developer posts', 'Testing branches', 'Mod readiness', 'Content planning', 'Source checks'])
  ],

  tips: [
    'Mark every prospecting result. Future you is less clever than present you thinks.',
    'Winter preparation starts while the weather still feels friendly.',
    'A cellar without sealed crocks is just a cool room full of regret.',
    'Do not smelt rare ore until you know what alloy plan it serves.',
    'Carry more torches than you think you need when entering caves.',
    'A windmill is only as good as the axle path that brings power home.',
    'Farms fail quietly. Check nutrients before blaming the season.',
    'Temporal storms are shelter checks, not courage checks.'
  ],

  infoPages: {
    'about': {
      title: 'About Vintage Story Wiki',
      body: '<p><strong>Vintage Story Wiki</strong> is an unofficial fan-made survival handbook for players who want practical guidance without clutter. It focuses on early survival, farming, smithing, prospecting, world generation, creatures, building and mods.</p><p>This site is not affiliated with, endorsed by, or sponsored by Anego Studios or the Vintage Story team.</p><h3>Editorial approach</h3><p>Pages are written as field notes: direct, practical and focused on what decisions help a player survive longer. Exact values can change between versions, so mechanics-heavy pages include source and update notes.</p><h3>Corrections</h3><p>Use the contact page to report outdated mechanics, missing pages, broken links or source concerns.</p>'
    },
    'privacy-policy': {
      title: 'Privacy Policy',
      body: '<p><strong>Effective date:</strong> May 24, 2026</p><p>This static wiki does not require accounts and does not intentionally collect names, passwords or payment information from visitors.</p><h3>Automatically processed information</h3><p>Hosting, analytics, security and advertising providers may process technical information such as IP address, browser type, device type, visited pages, referring pages, approximate location and timestamps.</p><h3>Cookies and advertising</h3><p>This site may use cookies, local storage, analytics tools and advertising providers such as Google AdSense. Advertising partners may use cookies or similar technologies to serve ads, measure performance, prevent fraud and personalize or limit advertising according to user settings and applicable law.</p><h3>Third-party links</h3><p>External links to official resources, mod pages, forums or community sites are provided for reference. Their privacy practices are governed by their own policies.</p><h3>Contact</h3><p>Questions about this policy can be sent through the contact page.</p>'
    },
    'contact': {
      title: 'Contact',
      body: '<p>Use this page to report corrections, suggest new pages, request removals or ask about the Vintage Story Wiki project.</p><h3>Email</h3><p><a href="mailto:contact@gamewikihub.com">contact@gamewikihub.com</a></p><h3>What to include</h3><ul><li>The page URL or title.</li><li>What information is wrong, missing or outdated.</li><li>A source, screenshot, patch note or clear explanation when available.</li></ul><h3>Unofficial site notice</h3><p>For official support, purchases, bug reports or account issues, contact Vintage Story or the relevant store/platform support channel.</p>'
    }
  }
};

function page(category, id, title, summary, points) {
  const related = points.slice(0, 3).map((p) => ({ label: p, href: '/' + category }));
  return {
    category,
    id,
    title,
    summary,
    keyInfo: points,
    sections: [
      { h: 'Quick Summary', body: '<p>' + summary + '</p>' },
      { h: 'Key Information', list: points },
      { h: 'Practical Strategy', body: '<p>Treat this topic as part of a larger survival chain. Gather the inputs before you need them, keep notes on locations and recipes, and avoid spending rare materials until the next step in progression is clear.</p>' },
      { h: 'Common Mistakes', list: ['Starting too late in the season', 'Using scarce materials without a plan', 'Ignoring storage and travel time', 'Failing to mark useful locations on the map'] },
      { h: 'Related Planning', body: '<p>Connect this page with your food plan, base location, tool progression and winter preparation. Vintage Story rewards players who build systems instead of chasing one-off wins.</p>' }
    ],
    related,
    sources: ['officialWiki', 'officialSite']
  };
}

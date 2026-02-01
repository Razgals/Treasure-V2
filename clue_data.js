// ============================================================
//  CLUE SCROLL DATA FILE
//  Easy to edit! Just follow the examples below.
// ============================================================
//
//  HOW TO ADD/EDIT ENTRIES:
//  1. Find the section you want to edit (Speak To, Anagrams, etc.)
//  2. Copy an existing entry and paste it below
//  3. Change the values inside the quotes
//  4. Make sure each entry has a comma at the end (except the last one)
//  5. Save the file and refresh the page
//
//  IMPORTANT: 
//  - Don't delete the brackets [ ] around each section
//  - Keep the format exactly as shown
//  - Use quotes " " around all text values
//
// ============================================================


// ============================================================
//  SPEAK TO NPCs
// ============================================================
//  Format: { person: "NPC Name", location: "Where to find them" }
//
const speakToData = [
  { person: "Arhein", location: "Catherby - The Dock in Catherby outside the Bank" },
  { person: "Bartender", location: "Varrock - In the Blue Moon Inn, across from the Sword Shop" },
  { person: "Bartender", location: "Port Sarim - In the Rusty Anchor Bar" },
  { person: "Black Heather", location: "Bandit's Camp - In level 23 Wilderness" },
  { person: "Donovan", location: "Sinclair Mansion - Northwest of Camelot Castle, on the second floor" },
  { person: "Doric", location: "In the house with anvils - East of the gate to Taverley" },
  { person: "Gaius", location: "Taverley - 2-Handed Sword Shop" },
  { person: "General Bentnoze", location: "Goblin Village - North of Falador" },
  { person: "Hajedy", location: "Brimhaven - Near the Brimhaven port" },
  { person: "Hans", location: "Lumbridge - Castle" },
  { person: "Hazelmere", location: "Jungle Spiders Island - East of Yanille, Second floor of the Hut" },
  { person: "Kanga Mau", location: "Brimhaven - Dead Man's Chest Bar in Brimhaven" },
  { person: "Kebab Seller", location: "Al Kharid - Kebab Store, South of the furnace" },
  { person: "King Bolren", location: "Tree Gnome Maze - By the Spirit Tree" },
  { person: "Lowe", location: "Varrock - Lowe's Archery Store" },
  { person: "Luthas", location: "Karamja - In the Banana Plantation" },
  { person: "Murphy", location: "Port Khazard - Pier" },
  { person: "Monk", location: "Ardougne - Clock Tower" },
  { person: "Ned", location: "Draynor - Outside a house in Draynor Village" },
  { person: "Oracle", location: "Ice Mountain - South of the Black Knight's Fortress" },
  { person: "Party Pete", location: "Seer's Village - Party Hall" },
  { person: "Referee", location: "Gnome Stronghold - Gnome-Ball course" },
  { person: "Roavar", location: "Canifis - Bar" },
  { person: "Sir Kay", location: "Seer's Village - Camelot Castle" },
  { person: "Squire", location: "Falador - White Knights Castle" },
  { person: "Tanner", location: "Al Kharid - North of the furnace" },
  { person: "Ulizius", location: "Mort Myre - Outside the Gates" },
  { person: "Zeke", location: "Al Kharid - Scimitar Shop, East of the Tanner" },
  { person: "Zoo Keeper", location: "Ardougne - Zoo" }
  // ADD NEW ENTRIES ABOVE THIS LINE (don't forget the comma after each entry except the last)
];


// ============================================================
//  ANAGRAMS
// ============================================================
//  Format: { anagram: "The Anagram", npc: "Solution NPC", location: "Where to find them" }
//
const anagramsData = [
  { anagram: "A Bas", npc: "Saba", location: "Burthorpe - South of the Troll Camp, in his little cave" },
  { anagram: "Aha Jar", npc: "Jaraah", location: "Al Kharid - Duel Arena Hospital" },
  { anagram: "Arc O Line", npc: "Caroline", location: "East of East Ardougne - start of Sea Slug quest" },
  { anagram: "Are Col", npc: "Oracle", location: "Ice Mountain - South of Black Knight's Fortress" },
  { anagram: "Bar Bell Seek", npc: "Kebab Seller", location: "Al Kharid - First building South of the Bank" },
  { anagram: "Bail Trims", npc: "Brimstail", location: "Tree Gnome Stronghold - Cave in the Southwest corner" },
  { anagram: "By Look", npc: "Bolko", location: "Tree Gnome Village - Gnome store owner" },
  { anagram: "C On Game Hoc", npc: "Gnome Coach", location: "Tree Gnome Stronghold - Gnome ball field" },
  { anagram: "Dt Run B", npc: "Brundt", location: "Rellekka - The Chieftain in the longhall" },
  { anagram: "Eek Zero Op", npc: "Zookeeper", location: "East Ardougne - Southwest corner on the East side of river" },
  { anagram: "El Ow", npc: "Lowe", location: "Varrock - Lowe's Archery Store" },
  { anagram: "Err Cure It", npc: "Recruiter", location: "West Ardougne - West Ardougne" },
  { anagram: "Goblin Kern", npc: "King Bolren", location: "Gnome Maze - By the Tree Spirit" },
  { anagram: "Got A Boy", npc: "Gabooty", location: "Tai Bwo Wannai village on Karamja Island" },
  { anagram: "Halt Us", npc: "Luthas", location: "Karamja - In the Banana Plantation" },
  { anagram: "Icy Fe", npc: "Fyice", location: "Gu'Tanoth - South of Yanille, in a cave north of Rantz" },
  { anagram: "Lark In Dog", npc: "King Roald", location: "Varrock - Varrock Castle" },
  { anagram: "Me If", npc: "Femi", location: "Tree Gnome Stronghold - by the entrance" },
  { anagram: "Nod Med", npc: "Edmond", location: "East Ardougne - Northwest corner" },
  { anagram: "O Birdz A Zany En Pc", npc: "Cap'n Izzy No Beard", location: "Brimhaven - Agility Arena entrance" },
  { anagram: "Ok Co", npc: "Cook", location: "Lumbridge - Castle's Kitchen" },
  { anagram: "Peaty Pert", npc: "Party Pete", location: "Seer's Village - South of the Bank" }
  // ADD NEW ENTRIES ABOVE THIS LINE
];


// ============================================================
//  CHALLENGE ANSWERS
// ============================================================
//  Format: { problem: "The question asked", answer: "The answer" }
//
const challengesData = [
  { problem: "19 to the power of 3", answer: "6859" },
  { problem: "How many animals in the Ardougne Zoo?", answer: "32" },
  { problem: "How many bookcases are in the palace library?", answer: "18" },
  { problem: "How many banana trees are there in the plantation?", answer: "33" },
  { problem: "How many buildings in the village?", answer: "11" },
  { problem: "How many cages are behind Jerico's house?", answer: "3" },
  { problem: "How many doors have X's on the fishing platform?", answer: "20" },
  { problem: "How many fisherman are on the fishing platform?", answer: "23" },
  { problem: "How many flowers are there in the clearing below this platform?", answer: "13" },
  { problem: "How many gnomes on the Gnome ball field have red patches on their uniforms?", answer: "6" },
  { problem: "How many houses have crosses on them?", answer: "20" },
  { problem: "If X is 15 and Y is 3, what is 3X + Y?", answer: "48" },
  { problem: "I have 16 kebabs, I eat one myself and share the rest equally between 3 friends how many do they have each?", answer: "5" },
  { problem: "What is 57X89+23?", answer: "5096" },
  { problem: "How many cannons in Lumbridge Castle?", answer: "9" },
  { problem: "People are waiting for the next Bard to perform.", answer: "4" }
  // ADD NEW ENTRIES ABOVE THIS LINE
];


// ============================================================
//  RIDDLES
// ============================================================
//  Format: { riddle: "The riddle text", answer: "The solution/location" }
//
const riddlesData = [
  {
    riddle: "46 is its number, it is burnt orange body, things with 8 crawl on it, it has 3 mouths that can't eat and it has a blue eye hiding it's grave",
    answer: "The blue eye is the sapphire in the spider nest in Level 46 Wilderness. Try to dig below it with a spade."
  },
  {
    riddle: "A bag belt only? He asked his balding brothers",
    answer: "Abbott Langley in the Monastery - Northeast from Dwarven Mine, northwest of Barbarian Village."
  },
  {
    riddle: "A great view - watch the rapidly drying hides get splashed. Check the box your say on.",
    answer: "The house near Baxtorian Falls. Go upstairs and search the boxes."
  },
  {
    riddle: "Aggie I see Lonely and southern I feel",
    answer: "At Aggie the Witch's house in Draynor Village, dig under the window in the south side of the house, south of cauldron."
  },
  {
    riddle: "A town with a different sort of night life is your destination. Search for some crates in one of the houses.",
    answer: "In the clothes shop of Canifis, Morytania."
  },
  {
    riddle: "Beware of the dog.",
    answer: "Run over to the mansion in East Ardougne and kill a dog to get the key."
  },
  {
    riddle: "City of thieves",
    answer: "Ardougne"
  },
  {
    riddle: "Come to the evil ledge.",
    answer: "Edgeville yew tree - Dig around it."
  },
  {
    riddle: "Dig near some giant mushrooms behind the giant tree.",
    answer: "Dig behind the large mushroom behind the Grand Tree in Gnome Stronghold."
  },
  {
    riddle: "Don't forget to feed the chickens",
    answer: "Just kill any chicken to get the drawer key."
  },
  {
    riddle: "Four blades I have yet I draw no blood",
    answer: "It's a crate in the top of Lumbridge/Draynor windmill."
  },
  {
    riddle: "Generally speaking, his nose was very bent",
    answer: "General Bentnoze in the Goblin Village- North of Falador"
  },
  {
    riddle: "Go to a village being attacked by trolls, search the drawers in one of the houses.",
    answer: "Burthorpe, house with anvils up north. When you try to open the drawers it says 'wait til I get my hands on Penda, he's nicked the key again.' Go to pub in Burthorpe and kill Penda for key."
  },
  {
    riddle: "I am the token of the strongest love. My middle is empty, I have no",
    answer: "Downstairs in the West Bank in Varrock - Dig by the gate."
  },
  {
    riddle: "Identify the back of this over-acting brother.",
    answer: "Hamid the monk by the Duel Arena altar"
  },
  {
    riddle: "If a man carried my burden he would break his back",
    answer: "A snail - Talk to Gerrant the Fish Shop owner in Port Sarim."
  },
  {
    riddle: "I lie lonely and forgotten in mid wilderness",
    answer: "Under the crossbow in Graveyard of Shadows in the Level 18 Wilderness. Pick up crossbow and dig under it."
  },
  {
    riddle: "In a town where thieves steal from stalls search for some drawers",
    answer: "East side of river in East Ardougne - Jerico's house on the 2nd floor. You will need to kill a guard to get a key."
  },
  {
    riddle: "In a town where wizards hang out search upstairs of the large house to the north.",
    answer: "Second floor of a house in Yanille - North of Magic Guild. You will need to kill a man to get a key for the chest."
  },
  {
    riddle: "In a town with guards armed with maces, search the upstairs room of the public house.",
    answer: "Ardougne Tavern on the west side of the river, north of the palace. Search the drawers. If it is locked, right click on it and find out why (usually need to kill something to get a key)."
  },
  {
    riddle: "In a village being attacked by trolls, search the drawers in one of the houses.",
    answer: "Burthorpe, house with anvils up north. When you try to open the drawers it says 'wait til I get my hands on Penda, he's nicked the key again.' Go to pub in Burthorpe and kill Penda for key."
  },
  {
    riddle: "In a village made of bamboo look for some crates under one of the houses.",
    answer: "Karamja, in Tai Bwo Wannai, south of Brimhaven"
  },
  {
    riddle: "It's a guard's life.",
    answer: "Kill a guard to get the key."
  },
  {
    riddle: "Speak to donovan the family handyman.",
    answer: "He is in the mansion north of seers."
  },
  {
    riddle: "Look for locked drawers in a house opposite a workshop in a town where everyone has perfect vision.",
    answer: "House in Seers Village - South of the house with anvils."
  },
  {
    riddle: "Look in the ground floor crates of houses in Falador",
    answer: "The house East of Falador East bank. First crate on right."
  },
  {
    riddle: "Look in the drawers upstairs in houses in East Ardougne",
    answer: "Go across the river. It's the first house there. (tavern)"
  },
  {
    riddle: "Must have lots of railings.",
    answer: "Search the crate outside the house with the broken multicannon (near where you start the Dwarf Cannon quest.) It's the first crate to the west with the 'X' on it."
  },
  {
    riddle: "Mine was the strangest birth under the sun.",
    answer: "Lesser cave, Karamja volcano - pick up red spider eggs and dig."
  },
  {
    riddle: "My Giant guardians below the market streets",
    answer: "Dig next to the cauldron with green bubbling liquid in the Varrock sewers by the Moss giants."
  },
  {
    riddle: "My home is gray and made of stone",
    answer: "Search the drawers on the second floor of Lumbridge Castle - Inside the room with a spinning wheel."
  },
  {
    riddle: "My name is like a tree,yet it is spelt with a 'g'",
    answer: "Speak to the child Wilough ('Willow') in the Varrock Market - Next to the fur merchant."
  },
  {
    riddle: "Often examined by learners of what has passed, find me where words of wisdom speak volumes.",
    answer: "Examiner at Digsite, always gives puzzle boxes"
  },
  {
    riddle: "One of the sailors in Port Sarim is your next destination.",
    answer: "Talk to Captain Tobias in Port Sarim."
  },
  {
    riddle: "Property of Black Heather",
    answer: "Kill Black Heather in the Bandit Camp in the Wilderness."
  },
  {
    riddle: "Read 'How to breed scorpions' by O.W. Thathurt.",
    answer: "Go to the second floor of the wizards tower south-southwest of the Seer's Village, search the bookcase on the northern wall."
  },
  {
    riddle: "Search for a box in one of the tents in Al Kharid.",
    answer: "Head east from the Silk trader into a tent."
  },
  {
    riddle: "Search for a crate in Varrock Castle.",
    answer: "It's one of the crates in the kitchen."
  },
  {
    riddle: "Search for a crate in a building in Hemenster.",
    answer: "Simply search all crates in Hemenster (City between Fishing guild and Ranging guild.)"
  },
  {
    riddle: "Search for some drawers in the upstairs of a house in Rimmington.",
    answer: "Search drawers upstairs in the house just north of the one with a range in Rimmington."
  },
  {
    riddle: "Search the boxes in a shop in Taverley.",
    answer: "Two-handed sword shop."
  },
  {
    riddle: "Search the boxes in the house near the South entrance to Varrock.",
    answer: "It's the crates inside the big grey building with nothing else inside except for a ladder."
  },
  {
    riddle: "Search the boxes in the Goblin House near Lumbridge.",
    answer: "Self explanatory."
  },
  {
    riddle: "Search the chest upstairs in Al Kharid palace.",
    answer: "Upstairs 1st one from the east."
  },
  {
    riddle: "Search the crates in Horvik's Armoury.",
    answer: "North East of Varrock center there is an armoury, search the crates there."
  },
  {
    riddle: "Search the chests in the dwarven mines.",
    answer: "The small place across the hall from the General Store inside the mines."
  },
  {
    riddle: "Search the crate in the left hand tower of Lumbridge castle.",
    answer: "Look upstairs in the guard tower in front of the castle."
  },
  {
    riddle: "Search the crate near a cart in Port Khazard.",
    answer: "Search the crate with the X on it by the cart."
  },
  {
    riddle: "Search the crates in a house in Yanille that has a piano.",
    answer: "First crate in the house next to the front door."
  },
  {
    riddle: "Search the crates in Canifis.",
    answer: "In the house with a range. The one that does not have a message come up when you enter."
  },
  {
    riddle: "Search the crates in the Port Sarim fishing store.",
    answer: "Self explanatory."
  },
  {
    riddle: "Search the crates in the Dwarven Mine.",
    answer: "It's the crate next to the bank chest."
  },
  {
    riddle: "Search the drawers above Varrock's shield shop.",
    answer: "Climb up the ladder at the sword shop and search the drawers."
  },
  {
    riddle: "Search the drawers in a house in Draynor Village.",
    answer: "House with the cooking range in the kitchen."
  },
  {
    riddle: "Search the drawers in Falador's Chain Mail shop.",
    answer: "Wayne's Chains. Search the one next to the south door."
  },
  {
    riddle: "Search the drawers in one of Gertrude's bedrooms.",
    answer: "The house is directly west of Varrock."
  },
  {
    riddle: "Search the drawers in the ground floor of a shop in Yanille.",
    answer: "The dragon 2h shop."
  },
  {
    riddle: "Search the drawers in the house next to the Port Sarim Mage Shop.",
    answer: "The house south of the mage shop."
  },
  {
    riddle: "Search the drawers in the upstairs of a house in Catherby.",
    answer: "The house with the Archery Shop. You will need to kill an Archer to get the key."
  },
  {
    riddle: "Search the drawers on the first floor of a building overlooking Ardougne's Market.",
    answer: "Upstairs of the house with a range on the south side of the market."
  },
  {
    riddle: "Search the drawers upstairs in Falador's shield shop.",
    answer: "Upstairs of Cassie's Shield Shop."
  },
  {
    riddle: "Search the drawers upstairs of the Ardougne windmill north of the market.",
    answer: "The windmill north of the market."
  },
  {
    riddle: "Snah? I feel all confused, like one of those crates.",
    answer: "Hans - Search the crates in Lumbridge Castle."
  },
  {
    riddle: "Someone watching the fights in the Wilderness. He's a long way from home too.",
    answer: "Fight Arena Referee near Mage Arena in the Wilderness - Kill him."
  },
  {
    riddle: "Thank you friend, now search a crate in the wizard's tower.",
    answer: "Search the crates on the ground floor of the Wizard's Tower."
  },
  {
    riddle: "The beasts to my east snap claws and tails, the rest to my west can only wail, bless my Maker.",
    answer: "There is an Ancestral Glyph on Harmony Island." 
  },
  {
    riddle: "The crate is well hidden.",
    answer: "Search the crate in the Bandit Camp General Store."
  },
  {
    riddle: "The gravedigger has buried many great people including the gods themselves.",
    answer: "Leo the Gravedigger at the Graveyard near Burthorpe."
  },
  {
    riddle: "This village has aTing.",
    answer: "The longhall in Rellekka."
  },
  {
    riddle: "Try not to drown when searching.",
    answer: "The crate by Gerrant's Fishy Business in Port Sarim."
  },
  {
    riddle: "W marks the spot.",
    answer: "Dig next to the rock with the 'W' on it, east of the Dark Warriors' Fortress."
  },
  {
    riddle: "When no weapons are required, killing is still possible.",
    answer: "Poison Salesman in the Ardougne Pub - West side of the river."
  },
  {
    riddle: "You'll get licked!",
    answer: "Search the toad spawn in Lumbridge swamp."
  },
  {
    riddle: "You'll have to plug your nose if you use this source of hay.",
    answer: "Search the hay bale at the pigsty in Falador Farm (north of Falador)."
  }
  // ADD NEW ENTRIES ABOVE THIS LINE
];


// ============================================================
//  EMOTE & OUTFIT CLUES
// ============================================================
//  Format: { emotes: "Emote(s) to do", location: "Where to do them", acquireItems: "Items needed" }
//
//  NOTE: These clue types have not been released yet in-game
//
const emoteOutfitData = [
  // EXAMPLE ENTRY (uncomment and modify when these clues are released):
  // { emotes: "Dance, Clap", location: "Varrock Square", acquireItems: "Bronze med helm, Leather body" }
  // ADD NEW ENTRIES ABOVE THIS LINE
];


// ============================================================
//  TREASURE TRAIL MAPS
// ============================================================
//  This data is used for search functionality
//  To add a new map image:
//    1. Add the image file to the "maps" folder
//    2. Add an entry below with the map details
//    3. Add the HTML in index.html in the maps section
//
//  Format: { name: "Map Name", description: "Location description", image: "maps/filename.png", tier: "easy/medium/hard" }
//
const mapsData = [
  // EASY CLUES
  { name: "Champions Guild Map", description: "West of Champions Guild", image: "maps/champ_guild.png", tier: "easy" },
  { name: "Varrock Mine Map", description: "Dig at the fence at the south-east Varrock mine", image: "maps/varrock_mine.png", tier: "easy" },
  { name: "Falador Rocks Map", description: "Fenced area north-east of Falador, south-west of Barbarian Village", image: "maps/falador_mine.png", tier: "easy" },
  
  // MEDIUM CLUES
  { name: "Draynor Fish Spot Map", description: "South of Draynor Village's bank", image: "maps/draynor_fishing.png", tier: "medium" },
  { name: "Observatory Map", description: "West of Tree Gnome Village", image: "maps/observatory.png", tier: "medium" },
  
  // HARD CLUES
  { name: "Varrock Lumberyard Map", description: "Lumberyard, north-east of Varrock", image: "maps/varrock_lumber.png", tier: "hard" }
  // ADD NEW ENTRIES ABOVE THIS LINE
];

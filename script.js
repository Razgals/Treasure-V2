document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('#sidebar button');
    const sections = document.querySelectorAll('.section');
    const searchBar = document.getElementById('search-bar');
    const searchResultsList = document.getElementById('searchResultsList');
    let lastActiveSection = 'speakTo'; // Track the last active section
    
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });
        
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.classList.add('active');
            selectedSection.style.display = 'block';
            if (sectionId !== 'searchResults') {
                lastActiveSection = sectionId; // Update last active section
            }
        }
        
        // Update active button
        buttons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-section') === sectionId) {
                button.classList.add('active');
            }
        });
    }
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            searchBar.value = ''; // Clear search bar when switching sections
            searchResultsList.innerHTML = ''; // Clear search results
        });
    });
    
    // Search functionality
    searchBar.addEventListener('input', function() {
        const searchText = searchBar.value.toLowerCase();
        if (searchText === '') {
            searchResultsList.innerHTML = ''; // Clear search results
            showSection(lastActiveSection); // Revert to last active section
        } else {
            performSearch(searchText);
            showSection('searchResults'); // Show search results section
        }
    });
    
    function performSearch(searchText) {
        searchResultsList.innerHTML = ''; // Clear previous results
        
        // Search Speak to...
        speakToData.forEach(item => {
            const text = `${item.person}: ${item.location}`.toLowerCase();
            if (text.includes(searchText)) {
                const resultDiv = document.createElement('div');
                resultDiv.classList.add('search-result');
                resultDiv.innerHTML = `<span class="npc-name">${item.person}</span>: ${item.location}`;
                if (resultDiv.textContent.length > 50) {
                    resultDiv.classList.add('long-text');
                }
                searchResultsList.appendChild(resultDiv);
            }
        });
    
        // Search Anagrams
        anagramsData.forEach(item => {
            const text = `${item.anagram} - ${item.npc}: ${item.location}`.toLowerCase();
            if (text.includes(searchText)) {
                const resultDiv = document.createElement('div');
                resultDiv.classList.add('search-result');
                resultDiv.innerHTML = `<span class="anagram-text">${item.anagram}</span> - <span class="npc-name">${item.npc}</span>: ${item.location}`;
                if (resultDiv.textContent.length > 50) {
                    resultDiv.classList.add('long-text');
                }
                searchResultsList.appendChild(resultDiv);
            }
        });
    
        // Search Challenges
        challengesData.forEach(item => {
            const text = `${item.problem}: ${item.answer}`.toLowerCase();
            if (text.includes(searchText)) {
                const resultDiv = document.createElement('div');
                resultDiv.classList.add('search-result');
                resultDiv.innerHTML = `${item.problem}: <span class="challenge-answer">${item.answer}</span>`;
                if (resultDiv.textContent.length > 50) {
                    resultDiv.classList.add('long-text');
                }
                searchResultsList.appendChild(resultDiv);
            }
        });
    
        // Search Riddles (include both riddle and answer)
        riddlesData.forEach(item => {
            const text = `${item.riddle} ${item.answer}`.toLowerCase();
            if (text.includes(searchText)) {
                const resultDiv = document.createElement('div');
                resultDiv.classList.add('search-result');
                resultDiv.innerHTML = `${item.riddle} <br> <span class="answer-label">Answer:</span> <span class="answer-text">${item.answer}</span>`;
                if (resultDiv.textContent.length > 50) {
                    resultDiv.classList.add('long-text');
                }
                searchResultsList.appendChild(resultDiv);
            }
        });
    
        // Search Maps (only the alt text of the image)
        const mapsSection = document.getElementById('maps');
        const mapsImg = mapsSection.querySelector('img');
        const mapsText = mapsImg.alt.toLowerCase();
        if (mapsText.includes(searchText)) {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('search-result');
            resultDiv.textContent = `Maps: ${mapsImg.alt}`;
            if (resultDiv.textContent.length > 50) {
                resultDiv.classList.add('long-text');
            }
            searchResultsList.appendChild(resultDiv);
        }
    
        // Search Emote and Outfit
        emoteOutfitData.forEach(item => {
            const text = `Emotes: ${item.emotes} Location: ${item.location} Acquire Items: ${item.acquireItems}`.toLowerCase();
            if (text.includes(searchText)) {
                const resultDiv = document.createElement('div');
                resultDiv.classList.add('search-result');
                resultDiv.innerHTML = `<span class="emote-label">Emotes:</span> ${item.emotes} <br> <span class="location-label">Location:</span> ${item.location} <br> <span class="acquire-label">Acquire Items:</span> ${item.acquireItems}`;
                if (resultDiv.textContent.length > 50) {
                    resultDiv.classList.add('long-text');
                }
                searchResultsList.appendChild(resultDiv);
            }
        });
    
        // If no results, show a message
        if (!searchResultsList.hasChildNodes()) {
            const noResultsDiv = document.createElement('div');
            noResultsDiv.classList.add('search-result');
            noResultsDiv.textContent = 'No results found.';
            searchResultsList.appendChild(noResultsDiv);
        }
    }
    
    // Data for Speak to...
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
    ];
    
    const speakToList = document.getElementById('speakToList');
    speakToData.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('content-item');
        itemDiv.innerHTML = `<span class="npc-name">${item.person}</span>: ${item.location}`;
        if (itemDiv.textContent.length > 50) {
            itemDiv.classList.add('long-text');
        }
        speakToList.appendChild(itemDiv);
    });
    
    // Data for Anagrams
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
    ];
    
    const anagramsList = document.getElementById('anagramsList');
    anagramsData.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('content-item');
        itemDiv.innerHTML = `<span class="anagram-text">${item.anagram}</span> - <span class="npc-name">${item.npc}</span>: ${item.location}`;
        if (itemDiv.textContent.length > 50) {
            itemDiv.classList.add('long-text');
        }
        anagramsList.appendChild(itemDiv);
    });
    
    // Data for Challenges
    const challengesData = [
        { problem: "19 to the power of 3", answer: "6859" },
        { problem: "How many animals in the Ardougne Zoo?", answer: "40" },
        { problem: "How many bookcases are in the palace library?", answer: "18" },
        { problem: "How many banana trees are there in the plantation?", answer: "33" },
        { problem: "How many buildings in the village?", answer: "11" },
        { problem: "How many cages are behind Jerico's house?", answer: "3" },
        { problem: "How many doors have X's on the fishing platform?", answer: "20" },
        { problem: "How many fisherman are on the fishing platform?", answer: "13" },
        { problem: "How many flowers are there in the clearing below this platform?", answer: "6" },
        { problem: "How many gnomes on the Gnome ball field have red patches on their uniforms?", answer: "20" },
        { problem: "How many houses have crosses on them?", answer: "48" },
        { problem: "People are waiting for the next Bard to perform. If X is 15 and Y is 3, what is 3X + Y?", answer: "5" },
        { problem: "I have 16 kebabs, I eat one myself and share the rest equally between 3 friends how many do they have each?", answer: "5" },
        { problem: "What is 57X89+23?", answer: "5096" }
    ];
    
    const challengesList = document.getElementById('challengesList');
    challengesData.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('content-item');
        itemDiv.innerHTML = `${item.problem}: <span class="challenge-answer">${item.answer}</span>`;
        if (itemDiv.textContent.length > 50) {
            itemDiv.classList.add('long-text');
        }
        challengesList.appendChild(itemDiv);
    });
    
    // Data for Riddles
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
            riddle: '"Speak to donovan the family handyman".',
            answer: "he is in the mansion north of seers."
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
            riddle: 'Read "How to breed scorpions" by O.W. Thathurt.',
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
            answer: "Search the crate south of where the Trawler starts."
        },
        {
            riddle: "Search the crates in Draynor Manor",
            answer: "Search all possible crates and boxes on the third floor in the room to the left of the professor and machine, north end of room, in Draynor Manor."
        },
        {
            riddle: "Search the crates in a house in Draynor Village.",
            answer: "As you first enter Draynor going through the lumbridge/draynor manor/falador intersection, go into the first house that you see."
        },
        {
            riddle: "Search the crates in a house in Yanille with a Piano.",
            answer: "As you enter Yanille, it should be the first building you come to that's adjacent to the north wall."
        },
        {
            riddle: "Search the crates in the Guard House of the Northern Gate of East Ardougne.",
            answer: "North of the North bank by the diseased sheep - Inside the building."
        },
        {
            riddle: "Search the crates in the shed just north of east Ardougne.",
            answer: "North of the North bank by the diseased sheep - Inside the building that the wood cutter used to be in."
        },
        {
            riddle: "Search the crates near a cart in Varrock.",
            answer: "This cart is NOT the one at the inner courtyard of Varrock Castle. South of the inner courtyard (and north of Varrock's central square), there is a double-loop path. Northeast of this intersection is a small cart, and the crates are nearby."
        },
        {
            riddle: "Search the drawers above shops in Varrock.",
            answer: "Drawers in room above Clothes shop."
        },
        {
            riddle: "Search the drawers in the upstairs of the Bank to the East of Varrock.",
            answer: "Self explanatory."
        },
        {
            riddle: "Search the drawers of houses in Burthorpe.",
            answer: "Drawers in the house that is south east of the house with an anvil."
        },
        {
            riddle: "Search the drawers on the first floor of a building overlooking the Ardougne market.",
            answer: "House north of Ardougne market; look upstairs (British 1st floor is upstairs; the bottom is the 'ground floor')."
        },
        {
            riddle: "Search the drawers upstairs in a house in a village where the pirates have a good time.",
            answer: "Across the street from the bar in Brimhaven (2 houses south of Agility Arena, south of the house with a cooking pot symbol.) Go upstairs in that house and search the drawers. It will say 'Shiver me timbers' and not allow you to open the chest. Kill the pirate near that house, he will drop a key. Use the key on the drawers."
        },
        {
            riddle: '"Small shoe" often found with rod on mushroom.',
            answer: "Speak to the trainer in the Gnome Stronghold agility arena."
        },
        {
            riddle: "Snah? i feel all confused like one of those cakes...",
            answer: "Talk to Hans in Lumbridge Castle."
        },
        {
            riddle: "Someone watching the fights in the Duel Arena is your next destination.",
            answer: "Talk to Jeed."
        },
        {
            riddle: "Stand by your man.",
            answer: "Kill the level 2 Man downstairs to get a key."
        },
        {
            riddle: "Surprising? I bet he is....",
            answer: "Sir Prysin on the first floor of Varrock castle."
        },
        {
            riddle: "The beasts to my east snap claws and tails",
            answer: "Between the penguins and scorpions in the Ardougne Zoo - Dig by the torch."
        },
        {
            riddle: "The crate in the ground floor of a church",
            answer: "Ardougne church - Next to ladder"
        },
        {
            riddle: "The Keeper of Melzars... Spare? Skeleton? Anar?",
            answer: "Talk to Oziach The Rune Plate seller - West of Edgeville"
        },
        {
            riddle: "There is no 'worthier' lord.",
            answer: "Lord Iorwerth in the Elf camp"
        },
        {
            riddle: "This aviator is at the peak of his profession.",
            answer: "Speak to gnome pilot at the top of White Wolf Mountain."
        },
        {
            riddle: "When no weapons are at hand, now is the time to reflect in Saradomins name! redemption draws closer.",
            answer: "Entrana in a drawer in the house with a glass blowing pipe."
        },
        {
            riddle: "You'll need to look for a town with a central fountain. Look for a locked chest in the towns chapel",
            answer: "Search the chest in the chapel in northeast Varrock (north of the museum). The chest says 'Property of Clocktower Monastery'. Go to the Monastery southeast of the Clocktower (south of Ardougne) and kill a Monk for the key."
        },
        {
            riddle: "You will need to under a cook to solve this one.",
            answer: "Search the crates in basement of Lumbridge Castle."
        }
    ];
    
    const riddlesList = document.getElementById('riddlesList');
    riddlesData.forEach((item, index) => {
        const riddleBox = document.createElement('div');
        riddleBox.classList.add('riddle-box');
        
        const riddleItem = document.createElement('div');
        riddleItem.classList.add('riddle-item');
        riddleItem.textContent = item.riddle;
        riddleItem.addEventListener('click', () => {
            const answer = riddleBox.querySelector('.answer-item');
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });

        const answerItem = document.createElement('div');
        answerItem.classList.add('answer-item');
        answerItem.innerHTML = `<span class="answer-label">Answer:</span> <span class="answer-text">${item.answer}</span>`;

        riddleBox.appendChild(riddleItem);
        riddleBox.appendChild(answerItem);
        riddlesList.appendChild(riddleBox);
    });
    
    // Data for Emote and Outfit
    const emoteOutfitData = [
        {
            emotes: "Beckon in Tai Bwo Wannai. Clap before you talk to me. Equip green dragonhide chaps, a ring of dueling and a mithril medium helmet.",
            location: "Anywhere in Tai Bwo Wannai Village",
            acquireItems: "Go to Peksa's helmet shop for mithril med helm; buy the chaps from Scavvo's Rune store or craft them; buy the ring from Grum's Gold Exchange and enchant it."
        },
        {
            emotes: "Beckon in the Digsite, near the eastern winch. Bow before you talk to me. Equip a green gnome hat, snakeskin boots and an iron pickaxe.",
            location: "The Digsite, east of Varrock",
            acquireItems: "Green gnome hat can be bought from fine Fashions on the second floor of the Grand Tree; snakeskin boots can be crafted or bought; iron pickaxe can be bought from Nurmof's Pickaxe Shop or from other players."
        },
        {
            emotes: "Blow a kiss between the tables in Shilo Village bank. Beware of double agents! Equip a blue mystic hat, bone spear and rune platebody.",
            location: "Shilo Village bank",
            acquireItems: "The mystic hat can be bought from players or the magic guild in Yanille; the rune plate can be bought from players, or Oziach in Edgeville; finally, the bone spear can be bought from Lumbridge caves or players."
        },
        {
            emotes: "Blow a raspberry at the monkey cage in Ardougne Zoo. Equip a studded leather body, bronze platelegs and a normal staff with no orb.",
            location: "The monkey cage in Southern Ardougne",
            acquireItems: "The studded leather body can be made by crafting a soft leather body, smithing studs out of steel and attaching them. A normal staff can be bought from Zaff's Superior Staffs in Varrock; bronze platelegs can be bought from other players; Louise's Armoured Legs Bazaar or smithed."
        },
        {
            emotes: "Blow a raspberry in the Fishing Guild bank. Beware of double agents! Equip an elemental shield, blue dragonhide chaps and a rune warhammer.",
            location: "The Fishing Guild Bank, in front of Keep Le Faye",
            acquireItems: "Elemental shield can be obtained from the Elemental Workshop quest; blue dragonhide chaps can be crafted or bought; rune warhammer can be bought from other players or smithed."
        }
    ];
    
    const emoteOutfitList = document.getElementById('emoteOutfitList');
    emoteOutfitData.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('emote-outfit-item');
        itemDiv.innerHTML = `<span class="emote-label">Emotes:</span> ${item.emotes}<br><span class="location-label">Location:</span> ${item.location}<br><span class="acquire-label">Acquire Items:</span> ${item.acquireItems}`;
        if (itemDiv.textContent.length > 50) {
            itemDiv.classList.add('long-text');
        }
        emoteOutfitList.appendChild(itemDiv);
    });
    
    // Initialize the page with the default section
    showSection('speakTo');
});
// ============================================================
//  POPUP.JS - Main Application Logic
//  This file handles the UI - you probably don't need to edit this
//  To add/edit clue data, edit the clue_data.js file instead!
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('#sidebar button');
  const sections = document.querySelectorAll('.section');
  const searchBar = document.getElementById('search-bar');
  const searchResultsList = document.getElementById('searchResultsList');
  let lastActiveSection = 'speakTo';

  // ============================================================
  //  SECTION NAVIGATION
  // ============================================================
  function showSection(sectionId) {
    sections.forEach(section => {
      section.classList.remove('active');
      section.style.display = 'none';
    });

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
      selectedSection.classList.add('active');
      selectedSection.style.display = sectionId === 'slidingPuzzles' ? 'flex' : 'block';
      if (sectionId !== 'searchResults') {
        lastActiveSection = sectionId;
      }
    }
  }

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const sectionId = this.getAttribute('data-section');
      showSection(sectionId);
      searchBar.value = '';
      searchResultsList.innerHTML = '';
      
      buttons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ============================================================
  //  SEARCH FUNCTIONALITY
  // ============================================================
  searchBar.addEventListener('input', function() {
    const searchText = searchBar.value.toLowerCase();
    if (searchText === '') {
      searchResultsList.innerHTML = '';
      showSection(lastActiveSection);
    } else {
      performSearch(searchText);
      showSection('searchResults');
    }
  });

  function performSearch(searchText) {
    searchResultsList.innerHTML = '';

    // Search Speak to...
    speakToData.forEach(item => {
      const text = `${item.person}: ${item.location}`.toLowerCase();
      if (text.includes(searchText)) {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('search-result');
        resultDiv.innerHTML = `<span class="npc-name">${item.person}</span>: ${item.location}`;
        if (resultDiv.textContent.length > 50) resultDiv.classList.add('long-text');
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
        if (resultDiv.textContent.length > 50) resultDiv.classList.add('long-text');
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
        if (resultDiv.textContent.length > 50) resultDiv.classList.add('long-text');
        searchResultsList.appendChild(resultDiv);
      }
    });

    // Search Riddles
    riddlesData.forEach(item => {
      const text = `${item.riddle} ${item.answer}`.toLowerCase();
      if (text.includes(searchText)) {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('search-result');
        resultDiv.innerHTML = `${item.riddle}<br><span class="answer-label">Answer:</span> <span class="answer-text">${item.answer}</span>`;
        if (resultDiv.textContent.length > 50) resultDiv.classList.add('long-text');
        searchResultsList.appendChild(resultDiv);
      }
    });

    // Search Maps
    mapsData.forEach(item => {
      const text = `${item.name} ${item.description}`.toLowerCase();
      if (text.includes(searchText)) {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('search-result');
        resultDiv.innerHTML = `<span class="npc-name">${item.name}</span>: ${item.description} <em>(${item.tier})</em>`;
        if (resultDiv.textContent.length > 50) resultDiv.classList.add('long-text');
        searchResultsList.appendChild(resultDiv);
      }
    });

    // Search Emote and Outfit
    emoteOutfitData.forEach(item => {
      const text = `Emotes: ${item.emotes} Location: ${item.location} Acquire Items: ${item.acquireItems}`.toLowerCase();
      if (text.includes(searchText)) {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('search-result');
        resultDiv.innerHTML = `<span class="emote-label">Emotes:</span> ${item.emotes}<br><span class="location-label">Location:</span> ${item.location}<br><span class="acquire-label">Acquire Items:</span> ${item.acquireItems}`;
        if (resultDiv.textContent.length > 50) resultDiv.classList.add('long-text');
        searchResultsList.appendChild(resultDiv);
      }
    });

    // No results message
    if (!searchResultsList.hasChildNodes()) {
      const noResultsDiv = document.createElement('div');
      noResultsDiv.classList.add('search-result');
      noResultsDiv.textContent = 'No results found.';
      searchResultsList.appendChild(noResultsDiv);
    }

    searchResultsList.querySelectorAll('.search-result').forEach(result => {
      result.classList.add('active');
    });
  }

  // ============================================================
  //  POPULATE DATA LISTS
  // ============================================================
  
  // Speak To list
  const speakToList = document.getElementById('speakToList');
  speakToData.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `<span class="npc-name">${item.person}</span>: ${item.location}`;
    if (itemDiv.textContent.length > 50) itemDiv.classList.add('long-text');
    speakToList.appendChild(itemDiv);
  });

  // Anagrams list
  const anagramsList = document.getElementById('anagramsList');
  anagramsData.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `<span class="anagram-text">${item.anagram}</span> - <span class="npc-name">${item.npc}</span>: ${item.location}`;
    if (itemDiv.textContent.length > 50) itemDiv.classList.add('long-text');
    anagramsList.appendChild(itemDiv);
  });

  // Challenges list
  const challengesList = document.getElementById('challengesList');
  challengesData.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `${item.problem}: <span class="challenge-answer">${item.answer}</span>`;
    if (itemDiv.textContent.length > 50) itemDiv.classList.add('long-text');
    challengesList.appendChild(itemDiv);
  });

  // Riddles list (with click to reveal)
  const riddlesList = document.getElementById('riddlesList');
  riddlesData.forEach((item, index) => {
    const riddleBox = document.createElement('div');
    riddleBox.classList.add('riddle-box');

    const riddleItem = document.createElement('div');
    riddleItem.classList.add('riddle-item');
    riddleItem.textContent = item.riddle;
    riddleItem.addEventListener('click', () => {
      riddleBox.classList.toggle('open');
    });

    const answerItem = document.createElement('div');
    answerItem.classList.add('answer-item');
    answerItem.innerHTML = `<span class="answer-label">Answer:</span> <span class="answer-text">${item.answer}</span>`;

    riddleBox.appendChild(riddleItem);
    riddleBox.appendChild(answerItem);
    riddlesList.appendChild(riddleBox);
  });

  // Emote & Outfit list
  const emoteOutfitList = document.getElementById('emoteOutfitList');
  if (emoteOutfitData.length === 0) {
    // Show message if no data
    const emptyMsg = document.createElement('div');
    emptyMsg.classList.add('no-results');
    emptyMsg.textContent = 'No emote/outfit clues added yet.';
    emoteOutfitList.appendChild(emptyMsg);
  } else {
    emoteOutfitData.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('emote-outfit-item');
      itemDiv.innerHTML = `<span class="emote-label">Emotes:</span> ${item.emotes}<br><span class="location-label">Location:</span> ${item.location}<br><span class="acquire-label">Acquire Items:</span> ${item.acquireItems}`;
      if (itemDiv.textContent.length > 50) itemDiv.classList.add('long-text');
      emoteOutfitList.appendChild(itemDiv);
    });
  }

  // Show initial section
  showSection('speakTo');
  document.querySelector('#sidebar button[data-section="speakTo"]').classList.add('active');
});

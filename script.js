const picture = document.getElementById('picture');
const surprise = document.getElementById('surprise');

picture.addEventListener('click', () => {
    // Change picture image to open the suprise
   picture.src ='mochi.png';

    // Show surprise message
    surprise.classList.remove('hidden');
    
});
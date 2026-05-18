// Joke Generator using Official Joke API
// API: https://official-joke-api.appspot.com/

async function getJoke() {
    const jokeText = document.getElementById('jokeText');
    const button = event.target;

    // Show loading state
    jokeText.textContent = 'Loading...';
    button.disabled = true;
    button.textContent = 'Loading...';

    try {
        // Fetch joke from Official Joke API
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }

        const jokeData = await response.json();

        // Display the joke
        const fullJoke = `${jokeData.setup} ${jokeData.delivery}`;
        jokeText.textContent = fullJoke;

        // Store current joke for sharing
        window.currentJoke = fullJoke;

    } catch (error) {
        console.error('Error fetching joke:', error);
        jokeText.textContent = 'Oops! Could not load a joke. Please try again!';
    } finally {
        // Reset button
        button.disabled = false;
        button.textContent = 'Get a Joke';
    }
}

function shareJoke() {
    const joke = window.currentJoke || 'Get a joke first!';
    
    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share({
            title: 'Random Joke',
            text: joke,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(joke).then(() => {
            alert('Joke copied to clipboard!');
        }).catch(err => {
            alert('Could not copy. Please try again.');
        });
    }
}

// Load a joke when page loads
window.addEventListener('load', () => {
    getJoke();
});

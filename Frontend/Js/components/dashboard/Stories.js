export function Stories() {
    const stories = document.createElement('div');
    stories.classList.add('stories');
    stories.innerHTML = `
        <h2>Latest Stories</h2>
        <p>This is where the latest stories will be displayed.</p>
    `;
    return stories;

}
const postFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const post_text = document.querySelector('#content').value.trim();

    if (title && post_text) {

        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, post_text }),
        });

    if (response.ok) {
        
        document.location.replace('/dashboard');
    } else {
            alert(response.statusText);
        }
    }
};

document
.querySelector('#new-post')
.addEventListener('submit', postFormHandler);
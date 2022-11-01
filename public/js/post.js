const postFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('.post-title').value.trim();
    const post_text = document.querySelector('.post-content').value.trim();

    if (title && post_text) {

        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title: title, content: post_text }),
            headers: { 'Content-Type': 'application/json' }
        });

    if (response.ok) {
        
        document.location.replace('/dashboard');
    } else {
            alert(response.statusText);
        }
    }
};

document
.querySelector('.create-post')
.addEventListener('submit', postFormHandler);
const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#new-comment').value.trim();
    const post_id = document.querySelector('#post-title').getAttribute('post-id')

    if (comment_text && post_id) {

        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ post_id, comment_text }),
            headers: { 'Content-Type': 'application/json'},
        });

    if (response.ok) {
        
        document.location.replace('/post/' + post_id);
    } else {
            alert(response.statusText);
        }
    }
};

document
.querySelector('#create-comment')
.addEventListener('submit', commentFormHandler);
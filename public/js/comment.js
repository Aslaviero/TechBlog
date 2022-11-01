const commentFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('.new-comment').value.trim();
    const post_id = document.querySelector('.post-title').getAttribute('post-id')

    if (comment_text && post_id) {

        const response = await fetch('/api/comments/new', {
            method: 'POST',
            body: JSON.stringify({ post_id:post_id, comment_text:content }),
            headers: { 'Content-Type': 'application/json'},
        });

    if (response.ok) {
        
        document.location.replace('homepage');
    } else {
            alert(response.statusText);
        }
    }
};

document
.querySelector('.create-comment')
.addEventListener('submit', commentFormHandler);
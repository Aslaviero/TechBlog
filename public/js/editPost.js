const editFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('.post-title').value.trim();
    const post_text = document.querySelector('.post-content').value.trim();
    const id = document.querySelector('.post-title').getAttribute('post-id');

    if (title && post_text && id) {

        const response = await fetch('/dashboard/editpost/' + id, {
            method: 'PUT',
            body: JSON.stringify({ title: title, content: post_text, post_id: id}),
            headers: { 'Content-type': 'application/json' },
        });

    if (response.ok) {
        
        document.location.replace('/dashboard');
    } else {
            alert(response.statusText);
        }
    }
};

document
.querySelector('.edit-post')
.addEventListener('submit', editFormHandler);
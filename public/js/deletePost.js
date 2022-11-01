const deleteFormHandler = async (event) => {
    event.preventDefault();

    const id = document.querySelector('.post-title').getAttribute('post-id');

    if (id) {

        const response = await fetch('/api/posts/' + id, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
        });

    if (response.ok) {
        
        document.location.replace('/dashboard');
    } else {
            alert(response.statusText);
        }
    }
};

document
.querySelector('.delete-post')
.addEventListener('click', deleteFormHandler);
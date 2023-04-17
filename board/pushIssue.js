function pushIssue(title, body) {

    fetch(`https://api.github.com/repos/${repo}/issues`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

// pushIssue("Test", "123");

const pushHeader = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
}

function pushIssue(title, body) {
    return new Promise((resolve, reject) => {

        fetch(`https://api.github.com/repos/${repo}/issues`, {
            method: 'POST',
            headers: pushHeader,
            body: JSON.stringify({ title, body })
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                resolve(data);
            })
            .catch(error => {
                // console.error(error);
                reject(error);
            });
    })
}

// pushIssue("Test", "123");

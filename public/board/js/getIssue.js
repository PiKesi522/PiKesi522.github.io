const url = `https://api.github.com/repos/${repo}/issues?state=closed`;
const headers = {
    'Authorization': `token ${token}`
};

function fetchAllIssue() {
    const conversations = [];

    return new Promise((resolve, reject) => {

        fetch(url, { headers })
            .then(response => response.json())
            .then(issues => {
                // conversations.push(issues.title);
                console.log(issues); // 打印所有的 Issues
                issues.forEach(issue => {
                    conversations.push({
                        id: issue.number,
                        replyDate : issue.updated_at.split('T')[0],
                        title: issue.title,
                        question: issue.body,
                        reply: null,
                    });
                });
                resolve(conversations);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });

    })
}

function fetchAllIssueComments() {
    return fetchAllIssue()
        .then(conversations => {
            const promises = conversations.map(conversation => {
                const issueNumber = conversation.id;
                const issue_url = `https://api.github.com/repos/${repo}/issues/${issueNumber}/comments`;
                return fetch(issue_url, { headers })
                    .then(response => response.json())
                    .then(comments => {
                        const lastComment = comments[comments.length - 1];
                        if (lastComment && lastComment.user.login === 'PiKesi522') {
                            conversation.reply = lastComment.body;
                        }
                        return conversation;
                    })
                    .catch(error => console.error(error));
            });
            return Promise.all(promises);
        })
        .then(updatedConversations => {
            // console.log(updatedConversations); // 打印更新后的 conversations
            return updatedConversations;
        })
        .catch(error => console.error(error));

}

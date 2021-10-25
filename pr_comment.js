async function commentPullRequest(github, context, output, action = "update" ) { 
    // Default action is update existing comment
    // Variable shows initial state of comment deleting
    var wasDeleted = false;
    var reg = /<!--(.|\s)*?-->/g;
    // Get the existing comments.
    const {data: comments} = await github.issues.listComments({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
    });

    // Find any comment already made by the bot.
    const botComment = comments.find(comment => comment.user.login === 'github-actions[bot]');

    if (botComment) { // Comment was found
        if (action === 'update') { // We are going to update existing comment
            // Update existing comment
            await github.issues.updateComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                comment_id: botComment.id,
                body: output
            })
        } else if (action === 'replace') { // Existing comment will be replaced to last commit
            // Delete comment
            await github.issues.deleteComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                comment_id: botComment.id
            })
            // Set flag comment was deleted to true
            wasDeleted = true;
        }
    }
    if (!botComment || wasDeleted || action === 'add')  { // No bot' comments or it was deleted or always add new comment
        console.log('add')
        // Add new comment
        await github.issues.createComment({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: context.issue.number,
            body: output
        })
    }
}

// Export module
module.exports = async ({github, context, output, action}) => {
    await commentPullRequest(github, context, output, action);
}

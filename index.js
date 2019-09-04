const bitbucket = require('bitbucket-api');

const Qs = require('./qs');
var connection = require('./curl-transport').connection;

const baseUrl = 'http://bitbucket.com';
const apiVersion = '1.0';

function fetch(url) {
  return new Promise((resolve) => {
    const authenticate = 'BG387066:Yimi1994';
    resolve({
      json: () => connection(authenticate).get(baseUrl + url),
    });
  });
}

const project = 'v5';
const repo = 'ecosphere-web';
const pullRequestId = 148;
const fetchUrl = `${baseUrl}/rest/api/1.0/projects/${project}/repos/${repo}/pull-requests/${pullRequestId}/activities`;

async function fetchPullRequests({
    start = 0,
    state = 'ALL',
    project,
    repo,
}, prev = []) {
    // console.log('request params', project, repo, prev);
    const params = Qs.stringify({
        start,
        state,
    });
    const requestUrl = `/rest/api/1.0/projects/${project}/repos/${repo}/pull-requests?${params}`;
    const response = await fetch(requestUrl);
    const body = await response.json();
    const { isLastPage, nextPageStart, values } = body;
    if (isLastPage === false) {
        const results = await fetchPullRequests({
            start: nextPageStart,
            state,
            project,
            repo,
        }, values);
        return results.concat(prev);
    }
    return body.values;
}

async function fetchComments({
    project,
    repo,
    pullRequestId,
    title,
}) {
    console.log(`[fetch] 正在请求 ${title}`);
    const requestUrl = `/rest/api/1.0/projects/${project}/repos/${repo}/pull-requests/${pullRequestId}/activities`;
    const response = await fetch(requestUrl);
    const body = await response.json();
    return body;
}

function getCommentedFromCommentRecords(commentRecords) {
    const comments = commentRecords.reduce((all, record) => {
        return all.concat(record.values);
    }, []);

    const commentedComment = comments.filter(comment => {
        return comment.action === 'COMMENTED';
    });
    return commentedComment;
}

function mergeCommentArr(comments) {
    return comments.reduce((all, comment) => {
        const { user } = comment;
        const { displayName } = user;

        const result = all;
        result[displayName] = all[displayName] || [];
        result[displayName].push(comment);
        return result;
    }, {});
}

(async function() {
    const project = 'v5';
    const repo = 'ecosphere-web';
    const pullRequests = await fetchPullRequests({
        project,
        repo,
    });
    console.log(pullRequests);
    const commentRecords = [];
    let count = 0;
    async function run(tasks) {
        if (tasks && tasks.length === 0) {
            return;
        }
        count += 1;
        const currentTask = tasks[0];
        const lastTasks = tasks.slice(1);

        const comment = await fetchComments({
           project,
           repo,
           pullRequestId: currentTask.id, 
           ...currentTask,
        });
        commentRecords.push(comment);
        await run(lastTasks);
    }
    await run(pullRequests);

    // console.log(commentRecords);
    console.log('[info] count is', count);
    // console.log(commentedComment);
    const commentedComment = getCommentedFromCommentRecords(commentRecords);
    const computedResult = mergeCommentArr(commentedComment);
    console.log(computedResult);
}());

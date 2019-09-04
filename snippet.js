!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).Qs=e()}}(function(){return function i(a,l,c){function s(t,e){if(!l[t]){if(!a[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(f)return f(t,!0);var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}var n=l[t]={exports:{}};a[t][0].call(n.exports,function(e){return s(a[t][1][e]||e)},n,n.exports,i,a,l,c)}return l[t].exports}for(var f="function"==typeof require&&require,e=0;e<c.length;e++)s(c[e]);return s}({1:[function(e,t,r){"use strict";var o=String.prototype.replace,n=/%20/g;t.exports={default:"RFC3986",formatters:{RFC1738:function(e){return o.call(e,n,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},{}],2:[function(e,t,r){"use strict";var o=e("./stringify"),n=e("./parse"),i=e("./formats");t.exports={formats:i,parse:n,stringify:o}},{"./formats":1,"./parse":3,"./stringify":4}],3:[function(e,t,r){"use strict";var y=e("./utils"),m=Object.prototype.hasOwnProperty,h={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:y.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},s=function(e,t,r){if(e){var o=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,n=/(\[[^[\]]*])/g,i=/(\[[^[\]]*])/.exec(o),a=i?o.slice(0,i.index):o,l=[];if(a){if(!r.plainObjects&&m.call(Object.prototype,a)&&!r.allowPrototypes)return;l.push(a)}for(var c=0;null!==(i=n.exec(o))&&c<r.depth;){if(c+=1,!r.plainObjects&&m.call(Object.prototype,i[1].slice(1,-1))&&!r.allowPrototypes)return;l.push(i[1])}return i&&l.push("["+o.slice(i.index)+"]"),function(e,t,r){for(var o=t,n=e.length-1;0<=n;--n){var i,a=e[n];if("[]"===a&&r.parseArrays)i=[].concat(o);else{i=r.plainObjects?Object.create(null):{};var l="["===a.charAt(0)&&"]"===a.charAt(a.length-1)?a.slice(1,-1):a,c=parseInt(l,10);r.parseArrays||""!==l?!isNaN(c)&&a!==l&&String(c)===l&&0<=c&&r.parseArrays&&c<=r.arrayLimit?(i=[])[c]=o:i[l]=o:i={0:o}}o=i}return o}(l,t,r)}};t.exports=function(e,t){var r=function(e){if(!e)return h;if(null!==e.decoder&&void 0!==e.decoder&&"function"!=typeof e.decoder)throw new TypeError("Decoder has to be a function.");if(void 0!==e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new Error("The charset option must be either utf-8, iso-8859-1, or undefined");var t=void 0===e.charset?h.charset:e.charset;return{allowDots:void 0===e.allowDots?h.allowDots:!!e.allowDots,allowPrototypes:"boolean"==typeof e.allowPrototypes?e.allowPrototypes:h.allowPrototypes,arrayLimit:"number"==typeof e.arrayLimit?e.arrayLimit:h.arrayLimit,charset:t,charsetSentinel:"boolean"==typeof e.charsetSentinel?e.charsetSentinel:h.charsetSentinel,comma:"boolean"==typeof e.comma?e.comma:h.comma,decoder:"function"==typeof e.decoder?e.decoder:h.decoder,delimiter:"string"==typeof e.delimiter||y.isRegExp(e.delimiter)?e.delimiter:h.delimiter,depth:"number"==typeof e.depth?e.depth:h.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"==typeof e.interpretNumericEntities?e.interpretNumericEntities:h.interpretNumericEntities,parameterLimit:"number"==typeof e.parameterLimit?e.parameterLimit:h.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"==typeof e.plainObjects?e.plainObjects:h.plainObjects,strictNullHandling:"boolean"==typeof e.strictNullHandling?e.strictNullHandling:h.strictNullHandling}}(t);if(""===e||null==e)return r.plainObjects?Object.create(null):{};for(var o="string"==typeof e?function(e,t){var r,o={},n=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,i=t.parameterLimit===1/0?void 0:t.parameterLimit,a=n.split(t.delimiter,i),l=-1,c=t.charset;if(t.charsetSentinel)for(r=0;r<a.length;++r)0===a[r].indexOf("utf8=")&&("utf8=%E2%9C%93"===a[r]?c="utf-8":"utf8=%26%2310003%3B"===a[r]&&(c="iso-8859-1"),l=r,r=a.length);for(r=0;r<a.length;++r)if(r!==l){var s,f,u=a[r],p=u.indexOf("]="),d=-1===p?u.indexOf("="):p+1;(f=-1===d?(s=t.decoder(u,h.decoder,c),t.strictNullHandling?null:""):(s=t.decoder(u.slice(0,d),h.decoder,c),t.decoder(u.slice(d+1),h.decoder,c)))&&t.interpretNumericEntities&&"iso-8859-1"===c&&(f=f.replace(/&#(\d+);/g,function(e,t){return String.fromCharCode(parseInt(t,10))})),f&&t.comma&&-1<f.indexOf(",")&&(f=f.split(",")),m.call(o,s)?o[s]=y.combine(o[s],f):o[s]=f}return o}(e,r):e,n=r.plainObjects?Object.create(null):{},i=Object.keys(o),a=0;a<i.length;++a){var l=i[a],c=s(l,o[l],r);n=y.merge(n,c,r)}return y.compact(n)}},{"./utils":5}],4:[function(e,t,r){"use strict";var O=e("./utils"),p=e("./formats"),d=Object.prototype.hasOwnProperty,y={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},j=Array.isArray,o=Array.prototype.push,w=function(e,t){o.apply(e,j(t)?t:[t])},n=Date.prototype.toISOString,x={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:O.encode,encodeValuesOnly:!1,formatter:p.formatters[p.default],indices:!1,serializeDate:function(e){return n.call(e)},skipNulls:!1,strictNullHandling:!1},m=function e(t,r,o,n,i,a,l,c,s,f,u,p,d){var y=t;if("function"==typeof l?y=l(r,y):y instanceof Date?y=f(y):"comma"===o&&j(y)&&(y=y.join(",")),null===y){if(n)return a&&!p?a(r,x.encoder,d):r;y=""}if("string"==typeof y||"number"==typeof y||"boolean"==typeof y||O.isBuffer(y))return a?[u(p?r:a(r,x.encoder,d))+"="+u(a(y,x.encoder,d))]:[u(r)+"="+u(String(y))];var m,h=[];if(void 0===y)return h;if(j(l))m=l;else{var b=Object.keys(y);m=c?b.sort(c):b}for(var g=0;g<m.length;++g){var v=m[g];i&&null===y[v]||(j(y)?w(h,e(y[v],"function"==typeof o?o(r,v):r,o,n,i,a,l,c,s,f,u,p,d)):w(h,e(y[v],r+(s?"."+v:"["+v+"]"),o,n,i,a,l,c,s,f,u,p,d)))}return h};t.exports=function(e,t){var r,o=e,n=function(e){if(!e)return x;if(null!==e.encoder&&void 0!==e.encoder&&"function"!=typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||x.charset;if(void 0!==e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=p.default;if(void 0!==e.format){if(!d.call(p.formatters,e.format))throw new TypeError("Unknown format option provided.");r=e.format}var o=p.formatters[r],n=x.filter;return("function"==typeof e.filter||j(e.filter))&&(n=e.filter),{addQueryPrefix:"boolean"==typeof e.addQueryPrefix?e.addQueryPrefix:x.addQueryPrefix,allowDots:void 0===e.allowDots?x.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"==typeof e.charsetSentinel?e.charsetSentinel:x.charsetSentinel,delimiter:void 0===e.delimiter?x.delimiter:e.delimiter,encode:"boolean"==typeof e.encode?e.encode:x.encode,encoder:"function"==typeof e.encoder?e.encoder:x.encoder,encodeValuesOnly:"boolean"==typeof e.encodeValuesOnly?e.encodeValuesOnly:x.encodeValuesOnly,filter:n,formatter:o,serializeDate:"function"==typeof e.serializeDate?e.serializeDate:x.serializeDate,skipNulls:"boolean"==typeof e.skipNulls?e.skipNulls:x.skipNulls,sort:"function"==typeof e.sort?e.sort:null,strictNullHandling:"boolean"==typeof e.strictNullHandling?e.strictNullHandling:x.strictNullHandling}}(t);"function"==typeof n.filter?o=(0,n.filter)("",o):j(n.filter)&&(r=n.filter);var i,a=[];if("object"!=typeof o||null===o)return"";i=t&&t.arrayFormat in y?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var l=y[i];r||(r=Object.keys(o)),n.sort&&r.sort(n.sort);for(var c=0;c<r.length;++c){var s=r[c];n.skipNulls&&null===o[s]||w(a,m(o[s],s,l,n.strictNullHandling,n.skipNulls,n.encode?n.encoder:null,n.filter,n.sort,n.allowDots,n.serializeDate,n.formatter,n.encodeValuesOnly,n.charset))}var f=a.join(n.delimiter),u=!0===n.addQueryPrefix?"?":"";return n.charsetSentinel&&("iso-8859-1"===n.charset?u+="utf8=%26%2310003%3B&":u+="utf8=%E2%9C%93&"),0<f.length?u+f:""}},{"./formats":1,"./utils":5}],5:[function(e,t,r){"use strict";var l=Object.prototype.hasOwnProperty,f=Array.isArray,c=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),s=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},o=0;o<e.length;++o)void 0!==e[o]&&(r[o]=e[o]);return r};t.exports={arrayToObject:s,assign:function(e,r){return Object.keys(r).reduce(function(e,t){return e[t]=r[t],e},e)},combine:function(e,t){return[].concat(e,t)},compact:function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],o=0;o<t.length;++o)for(var n=t[o],i=n.obj[n.prop],a=Object.keys(i),l=0;l<a.length;++l){var c=a[l],s=i[c];"object"==typeof s&&null!==s&&-1===r.indexOf(s)&&(t.push({obj:i,prop:c}),r.push(s))}return function(e){for(;1<e.length;){var t=e.pop(),r=t.obj[t.prop];if(f(r)){for(var o=[],n=0;n<r.length;++n)void 0!==r[n]&&o.push(r[n]);t.obj[t.prop]=o}}}(t),e},decode:function(e,t,r){var o=e.replace(/\+/g," ");if("iso-8859-1"===r)return o.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(o)}catch(e){return o}},encode:function(e,t,r){if(0===e.length)return e;var o="string"==typeof e?e:String(e);if("iso-8859-1"===r)return escape(o).replace(/%u[0-9a-f]{4}/gi,function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"});for(var n="",i=0;i<o.length;++i){var a=o.charCodeAt(i);45===a||46===a||95===a||126===a||48<=a&&a<=57||65<=a&&a<=90||97<=a&&a<=122?n+=o.charAt(i):a<128?n+=c[a]:a<2048?n+=c[192|a>>6]+c[128|63&a]:a<55296||57344<=a?n+=c[224|a>>12]+c[128|a>>6&63]+c[128|63&a]:(i+=1,a=65536+((1023&a)<<10|1023&o.charCodeAt(i)),n+=c[240|a>>18]+c[128|a>>12&63]+c[128|a>>6&63]+c[128|63&a])}return n},isBuffer:function(e){return!(!e||"object"!=typeof e||!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e)))},isRegExp:function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},merge:function o(n,i,a){if(!i)return n;if("object"!=typeof i){if(f(n))n.push(i);else{if(!n||"object"!=typeof n)return[n,i];(a&&(a.plainObjects||a.allowPrototypes)||!l.call(Object.prototype,i))&&(n[i]=!0)}return n}if(!n||"object"!=typeof n)return[n].concat(i);var e=n;return f(n)&&!f(i)&&(e=s(n,a)),f(n)&&f(i)?(i.forEach(function(e,t){if(l.call(n,t)){var r=n[t];r&&"object"==typeof r&&e&&"object"==typeof e?n[t]=o(r,e,a):n.push(e)}else n[t]=e}),n):Object.keys(i).reduce(function(e,t){var r=i[t];return l.call(e,t)?e[t]=o(e[t],r,a):e[t]=r,e},e)}}},{}]},{},[2])(2)});

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
    const project = 'BSP';
    const repo = 'ironman';
    const pullRequests = await fetchPullRequests({
        project,
        repo,
    });
    // console.log(pullRequests);
    const commentRecords = [];
    let count = 0;
    async function run(tasks) {
        if (tasks.length === 0) {
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

// JIRA
let TIME_UNIT = 3600;

function getEstimateFromIssue(issue) {
    const estimate = {};
    const {
        key,
        fields = {},
    } = issue;
    const {
        assignee,
        summary,
        subtasks,
        timeestimate,
        timeoriginalestimate,
    } = fields;

    if (assignee !== null) {
        const { displayName } = assignee;
        estimate[displayName] = estimate[displayName] || [];
        // console.log( `${key} - ${summary}`);
        estimate[displayName].push({
            title: `${key} - ${summary}${subtasks.length ? '(父任务)' : ''}`,
            // 预估工时
            estimate: timeoriginalestimate,
            // 剩余工时
            remaining: timeestimate,
        });
    }
    return estimate;
}

/**
 * 有点像 vnode 更新操作，a 是更新前节点，b 是更新后节点
 * @param {Estimate} a
 * @param {Estimate} b
 */
function mergeEstimate(a = {}, b = {}) {
    const res = { ...a };
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    aKeys.map(aKey => {
        // 说明 b 中存在和 a 相同的 key
        if (bKeys.includes(aKey)) {
            res[aKey] = a[aKey].concat(b[aKey]);
        }
    });
    bKeys.map(bKey => {
        if (!aKeys.includes(bKey)) {
            res[bKey] = b[bKey];
        }
    });
    return res;
}

function fetchIssueDetail(issueIdOrKey) {
    return new Promise((resolve, reject) => {
        fetch(`/rest/agile/1.0/issue/${issueIdOrKey}`)
            .then((res) => res.json())
            .then((res) => {
                resolve(res);
            })
            .catch(reject);
    });
}

/**
 * 
 * @param {Array} issues
 * @returns {Object}
 */
function mergeEstimates(issues) {
    const results = issues.map(function(issue) {
        const content = getEstimateFromIssue(issue);
        return content;
    }).reduce((a, b) => {
        return mergeEstimate(a, b);
    }, {});
    return results;
}

/**
 * @param {Object} results
 */
function showEstimate(results) {
    const showedResult = Object.keys(results).map(name => {
        const items = results[name];
        const dataSource = items
            .map(item => {
                const { title, estimate, remaining } = item;
                return {
                    name,
                    title,
                    estimate: estimate !== null ? estimate / TIME_UNIT : 0,
                    remaining: remaining !== null ? remaining / TIME_UNIT : 0,
                };
            });
        // 这里算合计
        const remaining = dataSource.reduce((a, b) => {
            return a + b.remaining;
        }, 0);
        const estimateTotal = dataSource.reduce((a, b) => {
            return a + b.estimate;
        }, 0);
        // 这里是 { name: 'PersonName', dataSource: issues, total } 的对象
        const temp = dataSource.reduce((a, b) => {
            const res = a;
            res[b.title] = {
                estimate: b.estimate,
                remaining: b.remaining,
            };
            return res;
        }, {});

        // temp.name = name;
        temp['合计'] = { estimate: estimateTotal, remaining };
        console.log(name);
        console.table(temp, ['estimate', 'remaining']);
    });
}

function getSprintEstimate(sprint) {
    fetch(`/rest/agile/1.0/sprint/${sprint}/issue`)
        .then((res) => res.json())
        .then((res) => {
            const { issues } = res;
            const result = mergeEstimates(issues);
            showEstimate(result);
        }, console.error);
}

function fetchLatestSprint() {
    return new Promise((resolve, reject) => {
        fetch('/rest/agile/1.0/board/558/sprint?state=active').then((res) => res.json()).then(({ values }) => {
            const sprints = values;
            const ids = sprints.map(item => item.id);
            const maxId = Math.max.apply(null, ids);
            const sprint = sprints.find(sprint => sprint.id === maxId);
            resolve(sprint);
        }, reject);
    });
}

function main() {
    fetchLatestSprint()
        .then((sprint) => {
            getSprintEstimate(sprint.id);
        });
}

function sleep(time = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
}

main();


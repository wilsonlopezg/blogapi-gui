import Route from '../../libs/route';
import moment from 'moment';
import Miscellany from '../Miscellany/Loading';
import {
    getFormatterTags,
    like
} from '../Miscellany/PostsUtil';


var template = `
<div>
    <h1 class="text-center">{{TITLE}}</h1>
    <p class="text-secondary">{{DATE}} ~ {{USER}} &Tab; {{EMAIL}}</p>
    <p class="text-justify">{{BODY}}</p>
    <p class="text-secondary">{{TAGS}}</p>
    <div class="actions">
        <button type="button" class="btn btn-outline-primary btn-like" id="like-btn-{{POSTID}}" data-liked="{{LIKED}}" data-post-id="{{POSTID}}">
            <i class="fa fa-heart"></i>&Tab;Like <span id="likes-count-{{POSTID}}">{{LIKES}}</span>
        </button>
        <span class="float-right"><i class="fa fa-eye"></i>&Tab;<span id="views-count-{{POSTID}}">{{VIEWS}}</span></span>
    </div>
</div>
<hr>
<div>
    {{COMMENTS}} comentarios sobre <strong>"{{TITLE}}"</strong>
</div
`;

var commentsTemplate = `
    <div class="card mt-3 mb-3" id="comment-id-{{COMMENTID}}">
    <div class="card-header">
        <p>{{NAME}} ~ {{EMAIL}}</p>
        <p>{{DATE}}</p>
    </div>
    <div class="card-body">
        <p class="card-text">{{BODY}}</p>
    </div>
    </div>
`;

class List extends Route {

    constructor() {
        super('post', {
            htmlName: './views/Posts/Post.html'
        });
        this.onMountCb = this.whenMounted;
    }

    async whenMounted() {
        this.getPost();
        this.getPostComments();
    }

    async getPost() {
        const postId = window.location.hash.substring(window.location.hash.indexOf('/') + 1);
        document.getElementById('post').innerHTML = Miscellany.loading;

        let temporalTemplate = '';

        const post = await store.actions().getPost(postId);

        temporalTemplate += template
            .replace(/{{TITLE}}/gi, post.title)
            .replace(/{{POSTID}}/gi, post.id)
            .replace('{{DATE}}', moment(post.createdAt).format('DD/MM/YYYY h:mm:ss a'))
            .replace('{{USER}}', post.userName)
            .replace('{{EMAIL}}', post.userEmail)
            .replace('{{BODY}}', post.body)
            .replace('{{TAGS}}', getFormatterTags(post.tags))
            .replace('{{VIEWS}}', post.views)
            .replace('{{LIKES}}', post.likes)
            .replace('{{LIKED}}', post.liked)
            .replace('{{COMMENTS}}', post.comments)


        document.getElementById('post').innerHTML = temporalTemplate;

        const likeBtn = document.getElementsByClassName('btn-like');

        likeBtn.forEach(btn => {
            btn.addEventListener('click', like);
            if (btn.getAttribute('data-liked') === 'true') {
                btn.classList.remove('btn-outline-primary');
                btn.classList.add('btn-primary');
            }
        });

        document.getElementById('btn-comment').addEventListener('click', addPostComment);
    }

    async getPostComments() {
        const postId = window.location.hash.substring(window.location.hash.indexOf('/') + 1);

        let temporalTemplate = '';

        const comments = await store.actions().getPostComments(postId);

        comments.forEach(comment => {
            temporalTemplate += commentsTemplate
                .replace('{{POSTID}}', comment.postId)
                .replace('{{NAME}}', comment.userName)
                .replace('{{EMAIL}}', comment.userEmail)
                .replace('{{DATE}}', moment(comment.createdAt).format('DD/MM/YYYY h:mm:ss a'))
                .replace('{{BODY}}', comment.body)
                .replace('{{COMMENTID}}', comment.id)

        });

        document.getElementById('comments').setAttribute('id', `comments-of-post-${postId}`);
        document.getElementById(`comments-of-post-${postId}`).innerHTML = temporalTemplate
    }
}

async function addPostComment(event) {

    const postId = window.location.hash.substring(window.location.hash.indexOf('/') + 1);
    const comment = document.getElementById('comment-body').value;
    if (comment.length < 1) {
        alert('add a comment please');
        event.target.removeAttribute('disabled');
    } else {
        await store.actions().addPostComment(postId, {
            'body': comment
        });
        document.getElementById('comment-body').value = '';
    }
}

var posts = new List();
export default posts;
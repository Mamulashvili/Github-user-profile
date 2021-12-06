/**
 * GithubUserSearch
 * 
 * @property labelText
 * @property inputType
 * @property inputId
 * @property username
 * @property inputPlaceHolder
 * @method updateInputValue
 * @method search
 * @emits update:username
 * @emits search
 */
const GithubUserSearch = {
    template: '#github-user-search',
    props: {
        labelText: {
            type: String,
            required: true,
            default: '',
        },
        inputType: {
            type: String,
            required: true,
            default: '',
        },
        inputId: {
            type: String,
            required: true,
            default: '',
        },
        username: {
            type: String,
            required: true,
            default: '',
        },
        inputPlaceholder: {
            type: String,
            required: false,
            default: '',
        }
    },
    emits: [
        'update:username',
        'search',
    ],
    methods: {
        updateInputValue(e) {
            this.$emit('update:username', e.target.value);
        },
        search() {
            this.$emit('search');
        }
    }

}

/**
 * GithubCard
 * 
 * @template #githubCard
 * @property githubUsername
 * @method formatDate
 * @method getRepos
 * @emits getRepos
 */
const GithubCard = {
    template: '#github-card',
    props: {
        githubUsername: {
            required: true,
            type: String,
            default: '',
        }
    },
    data() {
        return {
            user: null,
            apiUri: 'https://api.github.com/users/',
        }
    },
    emits: ['publicRepos'],
    methods: {
        formatDate(date) {
            return date.split('T')[0];
        },
        getRepos() {
            this.$emit('publicRepos', this.user.repos_url);
        }
    },
    async created() {
        const response = await fetch(`${this.apiUri}${this.githubUsername}`);
        this.user = await response.json();
    }
}

const AccordionItem = {
    template: '#accordion-item',
    props: {
        accordionItemTitle: {
            type: String,
            required: true,
            default: '',
        },
        accordionItemContent: {
            type: [
                String,
                null,
            ],
            required: true,
            default: '',
        },
        accordionId: {
            type: String,
            required: true,
            default: 'accordionFlush',
        },
        // accordionHeadingId: {
        //     type: String,
        //     required: true,
        //     default: '',
        // },
        generatedId: {
            type: String,
            required: true,
            default: '',
        },
        repoFullName: {
            type: String,
            required: false,
            default: '',
        },
        repoFork: {
            type: Boolean,
            required: false,
            default: '',
        },
        repoLanguage: {
            type: String,
            required: false,
            default: '',
        },
        repoUrl: {
            type: String,
            required: false,
            default: '',
        },
        deploymentUrl: {
            type: String,
            required: false,
            default: '',
        },
    }
}

const GithubRepoAccordion = {
    template: '#github-repo-accordion',
    props: {
        accordionId: {
            type: String,
            required: true,
            default: 'accordionFlush',
        }
    },
    data() {
        return {

        }
    }
}

const app = Vue.createApp({
    components: {
        GithubUserSearch,
        GithubCard,
        GithubRepoAccordion,
        AccordionItem,
    },
    data() {
        return {
            username: 'mamulashvili',
            showGithubCard: false,
            showUserRepos: false,
            publicRepos: [],
        }
    },
    methods: {
        toggleGithubCard() {
            this.showGithubCard = true;
        },
        async getPublicRepos(e) {
            this.showUserRepos = true;
            const response = await fetch(e);
            this.publicRepos = await response.json();
        }
    },
    computed: {
        generateId() {
            return item => item.replaceAll(' ', '');
        }
    }
});

app.mount('#app');


// GithHub API response keys for uri https://api.github.com/users/username
// {
//     "login"
//     "id"
//     "node_id"
//     "avatar_url"
//     "gravatar_id"
//     "url"
//     "html_url"
//     "followers_url"
//     "following_url"
//     "gists_url"
//     "starred_url"
//     "subscriptions_url"
//     "organizations_url"
//     "repos_url"
//     "events_url"
//     "received_events_url"
//     "type"
//     "site_admin"
//     "name"
//     "company"
//     "blog"
//     "location"
//     "email"
//     "hireable"
//     "bio"
//     "twitter_username"
//     "public_repos"
//     "public_gists"
//     "followers"
//     "following"
//     "created_at"
//     "updated_at"
//   }


// GithHub API response keys for uri https://api.github.com/users/username/repos
// "id"
// "node_id"
// "name"
// "full_name"
// "private"
// "owner": {
    // "login"
    // "id"
    // "node_id"
    // "avatar_url"
    // "gravatar_id"
    // "url"
    // "html_url"
    // "followers_url"
    // "following_url"
    // "gists_url"
    // "starred_url"
    // "subscriptions_url"
    // "organizations_url"
    // "repos_url"
    // "events_url"
    // "received_events_url"
    // "type"
    // "site_admin"
// },
// "html_url"
// "description"
// "fork"
// "url"
// "forks_url"
// "keys_url"
// "collaborators_url"
// "teams_url"
// "hooks_url"
// "issue_events_url"
// "events_url"
// "assignees_url"
// "branches_url"
// "tags_url"
// "blobs_url"
// "git_tags_url"
// "git_refs_url"
// "trees_url"
// "statuses_url"
// "languages_url
// "stargazers_url"
// "contributors_url"
// "subscribers_url"
// "subscription_url"
// "commits_url"
// "git_commits_url"
// "comments_url"
// "issue_comment_url"
// "contents_url"
// "compare_url"
// "merges_url"
// "archive_url"
// "downloads_url"
// "issues_url"
// "pulls_url"
// "milestones_url"
// "notifications_url"participating}",
// "labels_url"
// "releases_url"
// "deployments_url"
// "created_at"
// "updated_at"
// "pushed_at"
// "git_url"
// "ssh_url"
// "clone_url"
// "svn_url"
// "homepage"
// "size"
// "stargazers_count"
// "watchers_count"
// "language"
// "has_issues"
// "has_projects"
// "has_downloads"
// "has_wiki"
// "has_pages"
// "forks_count"
// "mirror_url"
// "archived"
// "disabled"
// "open_issues_count"
// "license"
// "allow_forking":
// "is_template"
// "topics"
// "visibility"
// "forks"
// "open_issues"
// "watchers"
// "default_branch"
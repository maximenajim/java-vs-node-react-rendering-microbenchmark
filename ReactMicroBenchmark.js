var React = require('./js/react');

var CommentForm = React.createClass({displayName: "CommentForm",
    handleSubmit: function (e) {
        e.preventDefault();
        var author = this.refs.author.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();
        if (!author || !text) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.refs.author.getDOMNode().value = '';
        this.refs.text.getDOMNode().value = '';
    },
    render: function () {
        return (
            React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit},
                React.createElement("input", {type: "text", placeholder: "Your name", ref: "author"}),
                React.createElement("input", {type: "text", placeholder: "Say something...", ref: "text"}),
                React.createElement("input", {type: "submit", value: "Post"})
            )
        );
    }
});

var Comment = React.createClass({displayName: "Comment",
    render: function () {
        var rawMarkup = this.props.children.toString();
        return (
            React.createElement("div", {className: "comment"},
                React.createElement("h2", null, this.props.author),
                React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
            )
        );
    }
});

var CommentList = React.createClass({displayName: "CommentList",
    render: function () {
        var commentNodes = this.props.data.map(function (comment, index) {
            return (
                React.createElement(Comment, {author: comment.author, key: index},
                    comment.text
                )
            );
        });
        return (
            React.createElement("div", {className: "commentList"},
                commentNodes
            )
        );
    }
});

var CommentBox = React.createClass({displayName: "CommentBox",
    handleCommentSubmit: function (comment) {
        var comments = this.state.data;
        comments.push(comment);
        this.setState({data: comments}, function () {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                type: 'POST',
                data: comment,
                success: function (data) {
                    this.setState({data: data});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        });
    },
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {data: this.props.data};
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            React.createElement("div", {className: "commentBox"},
                React.createElement("h1", null, "Comments"),
                React.createElement(CommentList, {data: this.state.data}),
                React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
            )
        );
    }
});

var renderServer = function (comments) {
    return React.renderToString(
        React.createElement(CommentBox, {data: comments, url: "comments.json", pollInterval: 5000})
    );
};

module.exports = {
    renderServer: renderServer
};

var log = console.log.bind(console);
var timestamp = function() { return process.hrtime()[1] / 1e6; };

if (require.main === module) {
    var comments = [];
    var NUM_COMMENTS = 10;
    for (var i = 0; i < NUM_COMMENTS; ++i) {
        comments.push({author:"Name "+i, text:"This is comment #"+i+"."});
    }
    for (i = 0; i < 10000; ++i) {
        var start, stop;
        start = timestamp();
        renderServer(comments);
        stop = timestamp();
        log('Run #' + (i + 1) + ':', (stop - start), 'ms');
    }
}

!function() {
    "use strict";
    marked.setOptions({
        breaks: !0,
        highlight: function(e) {
            return Prism.highlight(e, Prism.languages.javascript, "javascript")
        }
    });
    const e = new marked.Renderer;
    e.link = function(e, t, a) {
        return `<a target="_blank" href="${e}">${a}</a>`
    }
    ;
    class t extends React.Component {
        constructor(e) {
            super(e),
            this.state = {
                markdown: r,
                editorMaximized: !1,
                previewMaximized: !1
            },
            this.handleChange = this.handleChange.bind(this),
            this.handleEditorMaximize = this.handleEditorMaximize.bind(this),
            this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this)
        }
        handleChange(e) {
            this.setState({
                markdown: e.target.value
            })
        }
        handleEditorMaximize() {
            this.setState({
                editorMaximized: !this.state.editorMaximized
            })
        }
        handlePreviewMaximize() {
            this.setState({
                previewMaximized: !this.state.previewMaximized
            })
        }
        render() {
            const e = this.state.editorMaximized ? ["editorWrap maximized", "previewWrap hide", "fa fa-compress"] : this.state.previewMaximized ? ["editorWrap hide", "previewWrap maximized", "fa fa-compress"] : ["editorWrap", "previewWrap", "fa fa-arrows-alt"];
            return React.createElement("div", null, React.createElement("div", {
                className: e[0]
            }, React.createElement(a, {
                icon: e[2],
                onClick: this.handleEditorMaximize,
                text: "Editor"
            }), React.createElement(n, {
                markdown: this.state.markdown,
                onChange: this.handleChange
            })), React.createElement("div", {
                className: "converter"
            }), React.createElement("div", {
                className: e[1]
            }, React.createElement(a, {
                icon: e[2],
                onClick: this.handlePreviewMaximize,
                text: "Previewer"
            }), React.createElement(i, {
                markdown: this.state.markdown
            })))
        }
    }
    const a = e=>React.createElement("div", {
        className: "toolbar"
    }, React.createElement("i", {
        className: "fa fa-free-code-camp",
        title: "no-stack-dub-sack"
    }), e.text, React.createElement("i", {
        className: e.icon,
        onClick: e.onClick
    }))
      , n = e=>React.createElement("textarea", {
        id: "editor",
        onChange: e.onChange,
        type: "text",
        value: e.markdown
    })
      , i = t=>React.createElement("div", {
        dangerouslySetInnerHTML: {
            __html: marked(t.markdown, {
                renderer: e
            })
        },
        id: "preview"
    })
      , r = "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)\n";
    ReactDOM.render(React.createElement(t, null), document.getElementById("app"))
}();

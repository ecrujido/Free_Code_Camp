import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0';

marked.setOptions({
  break: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  } });


const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target='_blank' href='${href}'>${text}</a> `;};

const editorContent = `

![Logo](https://drive.google.com/thumbnail?id=17nBCcTYz2QaLZqDE1tyRWb8cbRDS44Nq)


# Hallo an alle! 
## 웰컴
### Þetta er verkskilyrði fyrir freecodecamp

Here is the [Free Code Camp](https://www.freecodecamp.org/) link

\`<div></div>\`

\`\`\`
const multipleLineCode = (param) => {
    if(param) {
        return param
    }
}
\`\`\`


**A bold text**

**Some bold text**

> 1st Block Quote

> 2nd Block Quote

1. Eerste item on die lys
2. البند الثاني في القائمة
3. Třetí položka na seznamu
4. Vierde punt op de lijst
`;


const Editor = ({ content, handleTextAreaChange }) => {
  return (
    React.createElement("textarea", { id: "editor", value: content, onChange: handleTextAreaChange }));
};


const Previewer = ({ content }) => /*#__PURE__*/React.createElement("div", { id: "preview", dangerouslySetInnerHTML: {
    __html: marked.parse(content, { renderer: renderer }) } });


const App = () => {
  const [content, setContent] = React.useState(editorContent);

  const handleTextAreaChange = event => {
    setContent(event.target.value);};

  return (
    React.createElement("div", { className: "main" }, /*#__PURE__*/
    React.createElement(Editor, { content: content, handleTextAreaChange: handleTextAreaChange }), /*#__PURE__*/
    React.createElement(Previewer, { content: content }), ">"));

};

ReactDOM.render(React.createElement(App, null), document.querySelector('#app'));
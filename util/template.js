export default ({ title, html, css }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      ${css}
    </head>
    
    <body>
      <div id="root">${html}</div>
    </body>
    
    <script src="bundle.js"></script>
  </html>
`;

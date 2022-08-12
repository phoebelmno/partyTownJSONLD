const express = require('express')

const app = express()
const port = 4000

const { partytownSnippet } = require('@builder.io/partytown/integration')

const snippetText = partytownSnippet();


app.get('/', (req, res) => {
  res.send(`
  <head>
    <script>
      ${snippetText}
    </script>
    <script>
  // This should be hardcoded via Prismic
  (function(){
    setTimeout(function () {
      var schemas = [].slice.call(document.querySelectorAll('script[type="application/ld+json"]'));
      schemas = schemas.map(function(schema) {
        return JSON.parse(schema.innerHTML);
      });

      var hasOrganizationSchema = !!schemas.find(function(schema) {
        return (
          schema['@type'] === 'Organization' && 
          schema.name === "Wonderbly"
        )
      });

      if (hasOrganizationSchema) {
          return;
      }

      var data = {
        "@context": "http://www.schema.org",
        "@type": "Organization",
        "name": "Wonderbly",
        "url": "https://www.wonderbly.com",
        "sameAs": [
          "https://www.facebook.com/wonderbly",
          "https://www.pinterest.com/wonderbly",
          "https://twitter.com/wonderbly",
          "https://www.instagram.com/wonderbly"
        ],
        "logo": "https://lmn-website-assets.imgix.net/shared/logo-148x35.svg",
        "description": "Impossibly Personal Gifts to inspire children everyday."
      };

      var script = document.createElement('script');
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify(data);
      document.getElementsByTagName('head')[0].appendChild(script);
  }, 300);
  })(document);
</script>
  </head>
  <body>
    Hello world
  </body>
  `)
})

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

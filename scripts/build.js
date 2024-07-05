const fs = require("fs")
const { exec } = require("child_process")

const jsFile = "dist/index.js"
const htmlFile = "dist/index.html"

// Compile TypeScript to JavaScript
exec(`webpack`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error compiling TypeScript: ${error}`)
    console.error(stdout)
    console.error(stderr)
    return
  }

  // Read the compiled JavaScript file
  fs.readFile(jsFile, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading JavaScript file: ${err}`)
      return
    }

    // Create the HTML content
    const htmlContent = `
        <script targetDivId="yourTargetDivId">
          ${data}
        </script>
    `

    // Write the HTML file
    fs.writeFile(htmlFile, htmlContent, "utf8", (err) => {
      if (err) {
        console.error(`Error writing HTML file: ${err}`)
        return
      }
      console.log(`HTML file created at ${htmlFile}`)
    })
  })
})

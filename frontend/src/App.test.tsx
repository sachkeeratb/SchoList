// Import react, the app, and the rendering
import React from "react"
import { App } from "./App"
import { render } from "./test-utils"

test("renders", () => {
  render(<App />)
})

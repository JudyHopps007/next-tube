# NextTube

A modern video tube website coded in Typescript with Next.js framework. TailwindCSS is used for the styling.

### Features

- Change Themes easily
- Customize Tags, Models, Categories Pages
- Manage Videos, Keywords in seperated adminpanel
- Change images so they unique for serps
- Rewrite video titles with a spinner
- Scrape content from big sites
- MongoDB Database
- Report / Contact Modal

### Todos

- Improve SEO for ranking
- Add Video per UI (Currently only per API)
- Use Redis to cache pages

### Change Theme

The theme can be easily changed by editing the `global.css` file in the **styles** directory

```css
// FreshBlue Theme (dark)
:root {
  --bg-background: 34, 40, 49;
  --bg-primary: 57, 62, 70;
  --bg-secondary: 0, 173, 181;

  --text-main: 238, 238, 238;
  --text-inverted: 238, 238, 238;
  --text-alternative: 209, 213, 219;
  --text-color: 0, 173, 181;

  --border-primary: 238, 238, 238;
  --border-secondary: 0, 173, 181;
}

// IceWarm (warm)
:root {
  --bg-background: 227, 253, 253;
  --bg-primary: 166, 227, 233;
  --bg-secondary: 113, 201, 206;

  --text-main: 55, 55, 55;
  --text-inverted: 243, 244, 246;
  --text-color: 58, 153, 160;
  --text-alternative: 15, 15, 15;

  --border-primary: 203, 213, 225;
  --border-secondary: 113, 201, 206;
}
```

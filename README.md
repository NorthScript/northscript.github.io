# Glixer - GitHub Pages, Gulp, Jekyll, SCSS, Bootstrap.
Blog, Portfolio & Website build system.

## Why?
1. EASY to use and Quick to get started.
2. Nothing else does this.

People new to web developement and working professionals often do not have the knowledge or time to know which tools they should be using or the know-how to configure them.

This project is meant to be a jump start for people in both groups.

## Demo
View this jekyll theme in action [here](https://m-c-c.github.io/)

## Built with:
- [Bootstrap](http://getbootstrap.com/)
- [Bourbon](http://bourbon.io/)
- [Browser Sync](https://browsersync.io/)
- [Font Awesome](http://fontawesome.io/)
- [GitHub Pages](https://pages.github.com/)
- [Gulp](http://gulpjs.com/)
- [Jekyll](https://jekyllrb.com/)
- [jQuery](https://jquery.com/)
- [Node.js](https://nodejs.org/)
- [SASS](http://gulpjs.com/)

The tools listed above are included with this package and are ready to go once this package is installed.

## Getting Started
You have options here.  You can either locally develop in which case follow the instructions below for your OS, or you can develop online at [c9.io](https://c9.io).

### C9
1. Logon to Github
2. Fork this [repository](https://github.com/M-C-C/M-C-C.github.io)
3. Copy your fork url e.g. `git@github.com:YOURUSERNAME/M-C-C.github.io.git`
4. On [c9.io](https://c9.io) create a new workspace
   * Template: Blank (Ubuntu Logo)
   * Clone from Git: use your fork url here
5. See Linux Install Instructions

### Linux install instructions (For distributions with apt-get)
1. Open a BASH terminal and navigate to the project folder.
2. Enter the Following commands (1 command per line):
```
make
gulp serve
```
### Windows
See Windows-Install.md

### Mac OSX
#### Prerequisites
1. Node.js
2. XCode

#### Install/building instructions
1. open up a new terminal
2. Enter the following commands: 
```
git clone https://github.com/north-script/north-script.github.io
cd north-script.github.io
make #ignore the errors
sudo apt-get install zlib1g-dev ruby ruby-dev build-essential
npm install #you'll get a big thumbs up if its all good
```

## Operation (On local machines)
1. Navigate to the project folder using the Terminal, Command Prompt or, PowerShell and run `gulp serve`. It may seem that the program is hanging but it's not, it's running a web server right on the window! (That means that there's something wrong if it quits by itself)
2. [Click Me!](http://localhost:8080)
3. Modify files in the [_src](_src) folder and see that your browser reloads automatically!
4. When you are finished editing and admiring your work, you can terminate the web server by pressing `Ctrl-C` in the command window

## Operation (On C9.io)

1. In your terminal run `gulp serve`
2. Click the "Preview" link on the top.

## Project Structure
 - [_src](_src): Where all your magic is
     - [_app](_src/_app): Fonts, JS, SCSS, etc.
          - [fonts](_src/_app/fonts): Where you want to store your fonts that you made/downloaded
          - [js](_src/_app/js): JavaScript Files, [Vendor](_site/_app/js/vendor) is for your JavaScript libraries such as Jquery, Bootstrap, Angular, React, etc.
          - [scss](_src/_app/scss): Folder where all of the styling happens, You can divide the files up however you would like.
     - [_includes](_src/_includes): html snippets for the navbar, footer, etc.
     - [_layouts](_src/_layouts): html site layouts, see [front.html](_site/_layouts/front.html) for an example
     - [_posts](_src/_posts): Blog posts, used for blogs.
 - [.site](.site): Automatically generated output, not recommended to modify anything here as it will get deleted/overwritten.
 - [_config.yml](_config.yml): Jekyll Build Configuration, Don't change this unless you are feeling adventurous or know what you are doing
 - [css](css), [fonts](fonts), [js](js): Used for Jekyll build. Not recommended to change anything in these folders unless you know what you are doing

## Built by
[Mike Boardley](https://www.linkedin.com/in/boardley/)

Please email me your comments & feedback.

- by <a href="https://twitter.com/mikeboardley">twitter</a>
- mail <a href="mailto:boardley@gmail.com">boardley[at]gmail.com</a>
- via <a href="https://www.linkedin.com/in/boardley/">LinkedIn</a>

=========

## Maintainers
[Samuel Brekke](https://www.linkedin.com/in/sjbrekke/)

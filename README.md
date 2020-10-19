## CS481 - 04 Project 1 — A* Search (A-star)
### Project Team: (A)lways (I)nebriated
- Justin Drouin; jdrouin@csu.fullerton.edu
- Timothy Bui; timothybui98@csu.fullerton.edu
- Anthony Lam; Anthonylam2445@csu.fullerton.edu
- Michael Burdi; maburdi@csu.fullerton.edu

#### Intro
This project is built with Jathp-Lisp running with P5, JS, HTML in a web browser page.
The robot will navigate through the maze using A* Search to find the best path until it
reaches its destination tile. The bot should uses the Manhattan (AKA Taxicab) metric as
the heuristic function H(N) which never overestimates the required number of bot
moves from a node, to the goal. Blue tiles are visited tiles and green circles are laid
out indicating the best path to the destination tile/goal.

#### Contents:
- assets/
  - draw-stuff.js
  - sprite-cells-a.png
  - styles.css
- cs-sketch-paint.js
- index-js-p5-jathp-5.html
- Jathp.js
- p5.js
- README.txt
- sprite-cells-28x28-a.png  

#### External Requirements (None?):
- None

#### Setup and Installation (if any):
0. This zip includes all P5 and Jathp; browser already does HTML & JS.
1. Unzip the zip file into a folder.
2. Change directory into folder 481-04-p1_A-star-main
3. Open your Broswer to an empty tab.
4. Drag index-js-p5-jathp-5.html into the tab or right click and open with a browser.
5. Press "start" or press 's' to start the robot.
6. Use the slider to adjust robots speed.
7. Open the Inspector-Console-Debugger pane with your F12 key.
8. Select the Console tab to see the console.log text output stream.

#### Sample invocation:
1. Press "start" or press 's' to start the robot.
2. Use the slider to adjust robots speed.
3. Open the Inspector-Console-Debugger pane with your F12 key.

#### Features (both included and missing):
- bot moves orthogonally through maze.
- bot uses A* Search and Manhattan (AKA Taxicab) metric as heuristic function H(N).
- bot marks visited tiles blue and the best path with green circles.
- bot can be sped up or down with the "Frame Mod" slider.
- message is displayed when the bot has reached its goal tile.

#### Bugs (if any):
- bot is not yet on the "best" path.
- bot teleports to new route instead of backing up
- green circles marking best path not laid out.

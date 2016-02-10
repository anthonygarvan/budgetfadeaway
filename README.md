# Budget Fadeaway 
## Every line item in the White House's 2017 budget proposal, visualized and searchable.
See it live [here](http://anthonygarvan.github.io/budgetfadeaway/).

This is a simple visualization where every line item in the White House's 2017 budget is represented by a square whose area is proportional to its size. The squares are arranged to form a sort of "fadeaway" pattern which I found suited this data set. It helps show that, although there are many line items, the vast majority of funds get spent on just a few big things. It can also be used to easily highlight specific areas of interest (eg., try searching for "education" or "defense.")

To search for a term, type it in the search box on the upper right hand side and hit `ENTER` or click the "search" button. All budget line items which contain that term will be shown, as well as the total. Very small line items get marked with a bigger circle when they are searched for in order to be more visible.

For the presentation, I rely on PIXI.js, a game engine which uses WebGL when available and fails gracefully into canvas rendering.
This project is born out of my [wordgalaxy](https://github.com/anthonygarvan/wordgalaxy) project.

If you have questions, feature requests, or feedback of any kind, please don't hesitate to message me.


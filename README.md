# Budget Fadeaway: A Large Scale Visualization of the White House's 2016 Budget Proposal

Every line item in the white house's 2016 budget represented by a dot whose area is proportional to its size, and positioned such that line items that correlate together historically are closer together.

For the presentation, I rely on PIXI.js, a game engine which uses WebGL when available and fails gracefully into canvas rendering. To get a headstart, I launched off [this](https://github.com/anvaka/ngraph) implementation, which is a library for plotting graphs that already had zoom & pan built in.

If you have questions, feature requests, or feedback of any kind, please don't hesitate to message me.
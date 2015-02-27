# Budget Galaxy: A Large Scale Visualization of the White House's 2016 Budget Proposal

Every line item in the white house's 2016 budget represented by a dot whose area is proportional to its size, and positioned such that line items that correlate together historically are closer together.

For dimensionality reduction, I use [this](https://github.com/danielfrg/tsne) implementation of Barnes-Hut t-SNE.

For the presentation, I rely on PIXI.js, a game engine which uses WebGL when available and fails gracefully into canvas rendering. To get a headstart, I launched off [this](https://github.com/anvaka/ngraph) implementation, which is a library for plotting graphs that already had zoom & pan built in.

If you have questions, feature requests, or feedback of any kind, please don't hesitate to message me.

## References
[Barnes-Hut SNE](http://arxiv.org/pdf/1301.3342v2.pdf)

[Efficient Estimation of Word Representations in Vector Space](http://arxiv.org/pdf/1301.3781.pdf)

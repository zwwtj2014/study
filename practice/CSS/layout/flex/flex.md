![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png) 



- 设为Flex布局之后，子元素的`float`，`clear`, `vertical-align` 属性将失效
- 容器上有六个属性
  - flex-direction：决定主轴方向。共四个值
    - row(默认值)：主轴为水平方向，起点在左端
    - row-reverse：主轴为水平方向，起点在右端
    - column：主轴为垂直方向，起点在上沿
    - column-reverse：主轴为垂直方向，起点在下沿
  - flex-wrap：定义如果一条轴线排不下，如何换行
    - nowrap(默认值)：不换行
    - wrap：换行，第一行在上方
    - wrap-reverse：换行，第一行在下方
  - flex-flow：是`flex-direction`和`flex-wrap`的简写形式
  - justify-content：定义了项目在主轴上的对齐方式
    - flex-start(默认值)：左对齐
    - flex-end：右对齐
    - center：居中
    - space-between：两端对齐，项目之间的间隔相等
    - space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边距的间隔大一倍
  - align-items：定义了再交叉轴上如何对齐
    - flex-start：交叉轴的起点（顶部）对齐
    - flex-end：交叉轴的终点（底部）对齐
    - center：交叉轴的中点对齐
    - baseline：项目的第一行文字的基线对齐
    - stretch(默认值)：如果项目未设置高度或设为auto，将占满整个容器的高度（拉伸效果）
  - align-content：定义了多根轴线的对齐方式。如果项目只有一根轴线则该属性不生效
- 项目上（子节点）六个属性
  - order：定义项目的排列顺序，数值越小，排列越靠前，默认为0
  - flex-grow：定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
  - flex-shrink：定义项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
  - flex-basis：定义了分配多余空间之前，项目占据的主轴空间。
  - flex：是`flex-glow`, `flex-shrink`, `flex-basis`的简写，默认 `0 1 auto`
  - align-self：允许单个项目有与其他项目不一样的对齐方式，可以覆盖align-items属性



## 参考

[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

[Flex 布局示例](http://static.vgee.cn/static/index.html)
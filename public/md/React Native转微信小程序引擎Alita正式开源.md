# React Native转微信小程序引擎Alita正式开源！

> 作者：京东ARES多端技术团队

### 前言

Alita是一套由京东ARES多端技术团队打造的React Native代码转换引擎工具。它对React语法有全新的处理方式，支持在运行时处理React语法，实现了React Native和微信小程序之间的主要组件对齐，可以用简洁、高效的方式把React Native代码转换成微信小程序代码。

Alita不是一个新框架，不会有额外的学习成本，她只是一套转换引擎工具，可以把React Native扩展到微信小程序端，大大降低多终端上的业务开发成本。以后移动端开发者只需要掌握React Native技术栈，就可以轻松实现Android、iOS、Windows、Web（已有开源项目支持）、微信小程序等多端渲染。

### Alita项目开源地址: [https://github.com/areslabs/alita](https://github.com/areslabs/alita)

<table style="width: 600px">
    <tr>
   	    <td>React Native</td>
   	    <td>微信小程序</td>
    </tr>
	<tr>
		<td><img src="https://m.360buyimg.com/njmobilecms/jfs/t28462/355/1645075450/578499/f63fbc67/5ce6718bNba4326dc.gif"/></td>
		<td><img src="https://m.360buyimg.com/njmobilecms/jfs/t1/79503/27/247/663303/5ce671a6E441d058c/da780183476ddd36.gif"/></td>
	</tr>
</table>

### Alita 具备哪些能力

> #### 完备的React语法支持

Alita的设计目标是要尽可能无损的转换RN应用，即使是已经存在的RN应用，我们也希望只做少量的修改就可以在微信小程序平台运行，所以这就要求Alita必须对React语法有足够的支持，包括 `JSX` 语法，React生命周期等

##### JSX语法

Alita 支持大部分 `JSX` 语法，这意味着什么呢？意味着你可以使用React自由的代码方式以及强大的组件化支持，意味着你可以延用自己的编程习惯，不需要对已有的RN代码进行过多修改。这主要得益于 Alita 是在运行时处理 JSX语法，而不是现在社区上常见的编译时处理。

因此 Alita 没有诸如以下社区其他方案的限制：

1. `JSX` 只允许出现的组件的 `render` 方法中
2. 不能通过 `props` 传递 `JSX` 片段或者返回 `JSX` 的函数
3. 不支持在属性上传递函数

Alita 转换以下代码毫无压力：

![](https://m.360buyimg.com/njmobilecms/jfs/t1/53241/11/1032/226419/5ceba39dE7c6abc11/d98d0d0cbf9c3972.jpg)

##### 生命周期

Alita 支持所有的 React 生命周期。微信小程序本身给组件提供了生命周期，但是这些生命周期在写法和调用上与 React 存在着一些的差异，另外 React 生命周期更加丰富。Alita 在支持 React 生命周期的时候，把它们分为了两类，第一类： `componentDidMount`，`componentDidUpdate`，`componentWillUnmount` 这3个生命周期在微信小程序上有相应的触发时机，比如`ready`, `detached`，只需要在微信小程序相关回调触发的时候，调用 React 组件对应的方法即可。另外一类，在微信小程序端没有直接对应的生命周期，对于这一类生命周期，主要是借助于 Alita 内部嵌入的 mini-react，触发相应的回调。通过这两种方式，Alita 实现了 React 生命周期的对齐。

此外，Alita 抹平了 RN 和微信小程序之间的**事件**及**样式**差异，能够无损得将RN**事件**和**样式**传递到微信小程序中。

> #### RN基本组件和API

RN 提供了很多基本的组件和 API，这些组件加上 React 开发方式，共同构成了 RN 应用。Alita 除了要对 React 语法进行处理，还必须在预先在微信小程序平台对齐出一套与 RN 等效的组件和 API。比如在 RN 端，请求网络的方式是通过 `fetch` 方式，但是微信小程序本身并不存在 `fetch` 方法，就这要求 Alita 必须基于微信小程序的网络 API，在微信小程序上实现一个 `fetch` 方法。 同样的以 RN 组件 `FlatList` 为例，当 Alita 把 RN 应用转化为微信小程序代码之后，`FlatList` 在微信小程序平台并不存在，需要预先在微信小程序平台实现小程序版本的 `FlatList` 。这个预先处理的过程，我们称之为对齐，对齐的过程包括组件，组件属性，API 等。

![](https://m.360buyimg.com/njmobilecms/jfs/t1/65310/35/300/245467/5ce79944E97dbe436/674d74a06d61a896.jpg)

> #### Redux

Redux 是 JavaScript 状态容器，提供可预测化的状态管理，并且易于测试，是当前 React 技术栈流行的数据层管理方案。得益于 Alita 运行阶段处理 React 逻辑的设计，Alita 支持将使用Redux的RN应用转换成微信小程序。

> #### 动画

动画是每一个 app 不可或缺的能力，RN 和微信小程序的动画实现差异很大，RN 的动画能力要强于微信小程序，想要完全把 RN 的动画转化至微信小程序的是不可能的。为此我们封装了一套动画组件库，这一套动画组件库涵盖了所有微信小程序的动画能力，所有使用此动画库开发的动画，都可以无损转化到小程序端。

<table style="width: 600px">
   <tr>
   	    <td>React Native</td>
   	    <td>微信小程序</td>
   </tr>
	<tr>
		<td style="width: 300px"><img style="width: 300px" src="https://m.360buyimg.com/njmobilecms/jfs/t1/52383/29/719/308123/5ce6727cEe5bf86e9/4afd20f950b8074c.gif"/></td>
		<td><img src="https://m.360buyimg.com/njmobilecms/jfs/t1/48286/32/748/242998/5ce67294Ec1462abc/e52f58e1dd59209b.gif"/></td>
	</tr>
</table>


### Alita原理简介

那么 Alita 是如何将 RN 转换运行在微信小程序上的呢？我们不打算在这篇文章深入剖析，简单从编译阶段和运行阶段来说明。

编译阶段：我们通过静态分析RN源码，将其转换为微信小程序可以识别的代码，首先我们会将 `JSX` 语法转换为微信小程序的wxml模块语法，RN组件在这个阶段会被转换为微信小程序自定义组件，一般会产生微信小程序需要的4个文件 wxml， js，json 和 wxss。 此外，我们会保留一份babel转译之后的RN源码，这份代码里面所有的 `JSX` 都已经由 `React.createElement` 替换，运行阶段，会使用这个能被微信小程序的 JavaScript 运行环境识别的源码。

运行阶段：Alita 内部嵌入了一个 mini-react，这个 mini-react 在运行阶段会运行上文所说的转译后的RN源码，与 React 一样，递归（React Fiber之后，不再是递给的方式）的处理组件树，调用组件的 `render` 方法，调用组件生命周期，计算 `context` 等。另外 React 在运行的过程中有一个重要的 reconciliation 算法（即virtual-dom），mini-react 同样提供了简化版本的 reconciliation 来决定组件的销毁与复用。mini-react 执行完之后，最终会输出一个描述视图的数据结构，这份数据结构提供了微信小程序渲染所需要的所有数据。微信小程序通过桥接模块与 mini-react 通信，获取到这一份数据，通过 `setData` 的方式设置到微信小程序模版上，从而渲染出视图。

![](https://m.360buyimg.com/njmobilecms/jfs/t1/71086/29/207/269191/5ce6731cEc8c1be21/6ece7aa7464b29fa.jpg)

### Alita组件库

在项目开发中，仅仅使用RN基本组件和API，是很难满足需要的。我们在使用Alita的过程中，积累了很多常用的三端组件，包括`ScrollTabView`，`ViewPager`，`SegmentedControl`等等，我们正在剥离和梳理这些组件，很快会发布兼容三端的 Alita 组件库。此组件库也是我们日后的工作重点之一，我们将会不断优化和扩展新组件。

除了 Alita 组件库，我们还提供了扩展方式，开发者可以很方便的把本团队的基本 UI 组件库扩展到微信小程序端，然后通过 Alita 把使用了这些组件的 RN 应用运行在微信小程序平台。

![](https://m.360buyimg.com/njmobilecms/jfs/t1/37322/11/10591/107343/5ce67344Ea9357083/6f24b8bbde26319c.jpg)


### 结语

我们将不断拓展 Alita 的能力，支持更多端能力，如：百度小程序、头条小程序等，继续完善开发者体验，提高开发者效率，帮助更多开发者。

我们也在考察 `Flutter` 这一新的跨端方案和微信小程序融合转化的可行性。

我们十分重视开源社区的反馈和建议，会不断从中汲取养分，让 Alita 变得更加强大。


### 意见反馈

如果有任何的意见或者建议，欢迎在 [Github](https://github.com/areslabs/alita) 创建 issue，感谢你的支持和贡献。
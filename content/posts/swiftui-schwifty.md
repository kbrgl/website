---
title: "SwiftUI Needs to Get Schwifty"
subtitle: The state of SwiftUI development in 2022. (It's not great.)
date: 2022-04-03
preview: https://kabirgoel.com/static/schwifty.png
---

<figure>
  <img src="/static/schwifty.png" alt="" />
  <figcaption>Big red caveat as you read this post: I’m not an iOS developer. I learned SwiftUI for a toy project.</figcaption>
</figure>

Building [Twine](https://kabirgoel.com/recently), my first impression of SwiftUI was “wow, this is pretty neat”: it’s easy to build the interface you want, and complex things like animations are elementary. And I just love Swift as a language. You can tell it was designed by Apple. Since the honeymoon phase, though, I’ve been increasingly dissatisfied with the SwiftUI development experience. I list my reasons down below, mostly as a form of therapy. My thoughts are based on my experience with React in VS Code and Java in IntelliJ.

# Xcode sucks

I’m just gonna say it right out the gate: Xcode is painful to use. I cannot figure out why Apple doesn’t just let people bring their own editors. It’d be easier to cope with other issues if I could use VS Code.

For one, everything is slow: there’s a lag of 4 seconds between typing something and the suggestions and warnings showing up, even on my M1 Pro machine. I’m sure this is due to complex Swift compiler reasons that I’m not privy to, but I still expect better in 2022. VS Code is snappier while using less memory, even though it’s built on Electron. Even JetBrains IDEs outdo Xcode on performance, while managing to not be 12 GB downloads.

Xcode also makes everything fiendishly complicated. The version control pane is so poorly designed that I still haven’t quite figured out what all the icons mean, and I seldom have any idea what I’m committing. I was able to use the Git pane in VS Code from day one. 😕

My criticisms may be unfair. Many of Xcode’s features predate their modern equivalents in VS Code and the like, so it’s easy to criticize them even though they may have been groundbreaking when they were released. But perhaps that means it’s time for Apple to rebuild Xcode in line with modern metaphors. The first thing they should do is provide command line tools to build and run iOS projects. This would provide first-class support for developing outside Xcode.

# Nothing is stable

The React team is great with API stability: React code written 3-4 years ago still mostly works now. This API stability has important effects downstream: it means you can get by on React blog posts from 2017 even if they don’t reflect current best practices, like hooks. And you don’t have to worry too much about breaking changes when using libraries. Things mostly Just Work. Hey, isn’t that Apple’s thing?

SwiftUI, in my experience, has been the opposite. You search for an obscure problem and paste in something from Stack Overflow, and odds are Xcode tells you that what you pasted is deprecated. This is more than just annoying—it means people writing SwiftUI tutorials and answering questions on Stack Overflow are documenting a moving target.

Further, simple things like auto-resizing text boxes haven’t made their way into SwiftUI yet. I needed these in Twine but conveniently, they do not exist. Instead, you have to resort to a hack that layers a text box on top of a “ghost” text view. This way, when you type, the ghost text becomes bigger, so the text box does too. But even this approach is brittle: you have to align the ghost text and the text box exactly, and the only way to do this is to measure things through trial and error. Which might break when the user adjusts their text size. Oh well.

[This thread on /r/apple](https://www.reddit.com/r/apple/comments/nt80an/apples_support_and_level_of_care_for_swiftui_is/) echoes a lot of my sentiments. As someone in the thread mentioned, it feels like I’m beta testing SwiftUI.

# Incoherent documentation

One of the most annoying things about SwiftUI: the documentation requires you to Sherlock your way through a patchwork of one-line API docs, videos from WWDC, and half-baked examples. If you’re looking up `aMethodThatDoesSomething(handler:)`, consider yourself lucky if the documentation says:

> `aMethodThatDoesSomething(handler:)` does something, accepting a handler.

The incoherent docs haven’t gone unnoticed either: [On Apple’s Piss-Poor Documentation](https://www.caseyliss.com/2020/11/10/on-apples-pisspoor-documentation) by Casey Liss does a great job of covering all the issues. (Hacker News thread [here](https://news.ycombinator.com/item?id=25046691).)

---

These issues are all fixable, but not without investment from Apple. Right now, it seems inertia rules. If Apple’s iOS/SwiftUI/etc. teams keep on strapping more and more meat onto Xcode, it’ll eventually collapse under its own weight (with zero documentation of its demise).

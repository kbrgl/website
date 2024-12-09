---
title: "Opinionated by Default,\nProgrammable by Design"
subtitle: Why don’t more apps leverage programming experience?
date: 2021-06-02
preview: https://kabirgoel.com/static/programmable-by-design.jpg
---

<figure>
  <img src="/static/programmable-by-design.jpg" alt="What might programmability mean?" />
  <figcaption>What if you could program your writing app?</figcaption>
</figure>

Customizability used to be a big deal in the MySpace and Tumblr era, with people coding custom designs on their homepages. But in the 2010s, there was a shift away from customizable apps to opinionated ones: Facebook, with its clean but inflexible user interface, replaced MySpace; for many, Medium came to replace Tumblr. Look back even earlier and apps used to be not only customizable, but programmable. It wasn’t just about customizing designs, but also about building _workflows_. Software from then, like Photoshop, had scripting built-in. You could create a button that did 10 things at once.

Today, it seems like opinionated software is the default. If you’re writing, you might use Bear or iA Writer; if you’re designing, you’ll probably use Figma; messaging, and you might hop on Discord. The tool decides your workflow, not you. Some of these tools have basic support for programmability: Figma has plugins, Discord’s got bots. But these are largely an afterthought, not a core part of the user experience.

What would programmable software look like? There’s a pretty compelling vision. Consider Figma: want to build a complex shape, but can’t be bothered to use the pen tool? Just use the (hypothetical) Generative Art Tool to write a program that generates the curves for you. Or think of Bear: you could wire up ⌘+S to publish your post to a git repo and deploy it to Vercel. These aren’t new concepts: generative art has been a thing for a while, and there exist long-winded ways to publish to git from writing apps. Yet we still don’t see these in mainstream tools. The concerns of developers are legitimate: programming is daunting, and they want their apps to be friendly to new users. But that doesn’t explain why we aren’t seeing some tools come up that _do_ assume programming experience. Heck, the programming interface doesn’t even have to be text-based. You could use [Scratch](https://scratch.mit.edu) or [Snap](https://snap.berkeley.edu/) to ease the learning curve.

Currently, we seem to be going in the opposite direction: augmenting our programming tools to do other things. Some people write their notes in VS Code using its Markdown ecosystem. Others use [MDX Deck](https://github.com/jxnblk/mdx-deck) to build presentations in code. This isn’t a bad thing, but it misses the point: Programmers are a large enough demographic that we should be seeing purpose-built apps that leverage programming experience.[^1]

Of course, programmers aren’t a monolith either: use Ruby as your scripting language, and you’ll alienate the Python programmers. This is a very real problem. As an extreme example, no one uses macOS’s scripting capabilities because no one likes writing AppleScript. My initial thought was that we need a more modern programming language that can serve as a DSL for application scripting. We could call it Glue. But seldom have matters been simplified by adding yet another programming language to the mix. So perhaps we instead need a programmability _protocol_: a layer that specifies how _any_ programming language can interface with applications that want to be programmable. Give the protocol enough time, and we might even see people write protocol libraries for Scratch. Maybe then programmability could be mainstream.

For now, I’m writing this post in VS Code. But I’m hopeful for a future where our tools are opinionated by default and programmable by design, providing us with hooks and building blocks that make them work for us, rather than the other way around.

[^1]: Why _not_ use VS Code for everything, you ask? Why do we need something purpose-built? Because with the exception of Emacs users, I think most people prefer purpose-built tools. It’s much nicer to do your writing in your writing app than in a programming tool that’s got a gazillion distractions.

---
title: The story of Little Boy Blue
subtitle: How and why I built a Slack bot to foster community in a Berkeley student org
date: 2023-07-14
preview: https://static.kabirgoel.com/little-boy-blue/cover.png
---

![](https://static.kabirgoel.com/little-boy-blue/intro.png)

For this post, I thought I’d talk about a fun little project I did for Blueprint, a student org at Berkeley that I recently led as VP of Projects.

Blueprint has an incredibly tight-knit community, and a big part of that is a strong culture of encouraging members to go the extra mile for each other. To make it fun and easy to recognize each other’s hard work, we’ve long had a Slack tradition of _plusplussing_ each other to award points on an internal kudos leaderboard.

![](https://static.kabirgoel.com/example-plus-plus.png)

When you want to recognize someone’s contributions to the community, you @-mention them and add a `++` after. A bot then reads your message and awards points on the leaderboard. From 2015 to 2022, this bot was Big Blue. This post chronicles the growing pains we faced with Big Blue and my journey building Little Boy Blue, a replacement for Big Blue, from the ground up.

## The Problem

Big Blue was much-loved, but it had started showing its age. The bot was built in 2015, written in CoffeeScript, based on GitHub’s Hubot framework, and hosted on AWS. The unsexy stack wasn’t a problem. (We’re not big fans of fixing what isn’t broken.) But the bot consumed absurd amounts of CPU and memory and frequently crashed by overrunning our AWS resource limits. Bringing it back up was an ordeal, since you’d have to SSH into AWS and run a bunch of commands.

Most importantly, downtime meant some kudos were just ignored, robbing their recipients of the opportunity to move up the leaderboard. Just look at some of the messages lost to the void:

![](https://static.kabirgoel.com/little-boy-blue/into-the-void.png)

Our troubles with Big Blue manifested themselves as a collective frustration voiced across dozens of Slack messages. Over a period of months, Big Blue went from a cherished piece of technology to a pariah whose name was invariably invoked with an accompanying sigh.

My wistful message about Big Blue seemed to resonate:

![](https://static.kabirgoel.com/little-boy-blue/hater.png)

Meanwhile, chaos reigned in the #hack-big-blue channel, with people frantically trying to revive the bot with the `/bigblue up` command, invented as a hacky way to get Big Blue back online:

![](https://static.kabirgoel.com/little-boy-blue/panik.png)

In this chaos, I saw an opportunity. We could not only rebuild Big Blue on a robust technical foundation to make it leaner and snappier, but we could also give the bot a fresh, fun personality and fix longstanding usability issues. In a detailed investigation of past Big Blue invocations, I found several usability issues:

1. **Messy status messages:** Big Blue’s responses didn’t highlight usernames and the first line wasn’t aligned with the rest, making it harder to read.
2. **False positives:** You couldn’t use `++` when discussing Big Blue itself, since it would misinterpret it as you trying to literally plusplus someone, so you had to tiptoe around it.
3. **False negatives:** If your spacing wasn’t precise, Big Blue would ignore your message. For example, if you typed `@Kabir ++@Jay++` instead of `@Kabir ++ @Jay ++` . (`@Kelly ++` for pointing out a bug with leading plusplusses!)
4. **Lack of threading:** Rather than replying in a thread, Big Blue would reply in the channel, making conversations harder to follow.

## Building it out

Like any self-respecting creator, I started this project by coming up with a name. This one came easy: a big, slow Big Blue provocatively suggested the existence of a lean, fast Little Blue, and I recalled a nursery rhyme called Little Boy Blue. Thus, Little Boy Blue was born with a name that is not only incredibly cute, but is also a nod to Big Blue’s eight year legacy.

With that out of the way, I prototyped an MVP. To make it easy to develop, maintain, and host Little Boy Blue, I decided to build it on Replit, an online live-coding environment I’d enjoyed in a previous project.

The first steps were easy: I set up Slack’s fantastic Bolt library for Python and scaffolded some code capable of reading and responding to messages. Naturally, the bot’s first babbles spelled out the infamous Navy SEAL copypasta:

![](https://static.kabirgoel.com/little-boy-blue/copypasta.png)

The base plusplus functionality came easily as well. To store scores, I decided to use Replit’s built in key-value store; to parse mentioned entities out of messages, I relied on simple rules. Then, all I had to do was increment the keys corresponding to the mentioned entities. (I say “entity” because Blueprint likes to plusplus random stuff as a meme.)

## Closing infinite points loopholes

After the initial MVP was ready, I wrote code that dealt with the three ways in which users would no doubt try to game the system and steal points for themselves:

1. By plusplussing themselves.
2. By getting others to plusplus them repeatedly.
3. By repeating mentions in the same message.

\#1 was simple: all I had to do was check if the list of plusplussed entities included the sender.

\#2 was a bit more complicated. To defang this strategy, I reimplemented a “cooldown” feature from Big Blue that prevented someone from plusplussing the same user again before a preset duration had elapsed. Every time someone awards a plusplus, Little Boy Blue checks if they’ve given a plusplus to the same person within the last few minutes. If they have, it blocks the attempt and chides them.

Finally, for #3, I deduplicated mentions in messages.

## Implementing and porting the leaderboard

With all the base functionality complete, I implemented the Little Boy Blue leaderboard. Big Blue used a custom message syntax to query the bot and invoke the leaderboard; for Little Boy Blue, I instead used a Slack slash-command, which provides better discoverability and easier invocation:

![](https://static.kabirgoel.com/little-boy-blue/slash-command.png)

I found that Big Blue’s leaderboard cluttered many of the channels it was invoked in, since the leaderboard could be quite long. Little Boy Blue’s leaderboard, on the other hand, is only visible to the user that invokes it. (With the notable exception of the `#leaderboard` channel, where all invocations are public.)

Once I got the leaderboard working, all that was left to do was port the old scores to the new leaderboard. Since Slack deprecated usernames in 2018, I wanted to migrate the leaderboard from using usernames to simply @-mentioning the relevant users.

This was nontrivial; mentions require you to know the mentioned user’s unique user ID, but the entries on the leaderboard only contain usernames. I solved this by indexing the details of a few hundred users on the Blueprint Slack and looking up the usernames on the leaderboard against this index. Fortunately, my script ran on the first try, so I didn’t have to spend too much time on this part.

## Refining the chat interface

I wanted to make Little Boy Blue as easy and pleasant to use as possible, so I added hints to guide users when they make common mistakes. For instance, Little Boy Blue will remind you to invoke the leaderboard in `#leaderboard` if you want it to be publicly visible.

I also realized users often want to look up specific entries on the leaderboard, so I added a `/score` command to look up the scores of specific entities.

Next on my priority list were the quality-of-life improvements: threading, false positive/negative handling, and messy status messages. Threading just meant passing a couple of extra arguments to the Slack API, and has significantly neatened up the Slack; likewise, messy status messages were easily fixed by formatting every line in the status message identically, with the exception of a fun emoji at the beginning to visually separate distinct entries:

![](https://static.kabirgoel.com/little-boy-blue/status-emoji.png)

Finally, I added special-case logic to customize the leaderboard message according to the number of entries requested and to deal with pluralizing “points.” (I’ve always found generically writing “point(s)” a little annoying.)

## Bringing it to life

I asked Bry, a Blooper whose art style I really admire, to draw Little Boy Blue’s visual identity. The mascot she came up with was even more creative than I’d expected, taking inspiration from the nursery rhyme’s farm setting.

Bry drew the mascot several different ways, enabling context-specific use and bringing Little Boy Blue to life:

![](https://static.kabirgoel.com/little-boy-blue/cover.png)

---

With Little Boy Blue built—and brought to life by Bry—I officially retired Big Blue during a lightning talk at Blueprint’s general meeting—preceded, of course, by a customary one minute silence. (You can find my slides [here](https://static.kabirgoel.com/slides.pdf).)

Little Boy Blue is by far one of the most rewarding projects I’ve undertaken. It enabled Blueprint to halve our spending on hosting thanks to the switch from AWS to Replit, and it’s allowed me the privilege of making a lasting mark on a community I really care about.

As of this post, Little Boy Blue has been used to give over 4,000 kudos, rewarding Bloopers for everything from fixing difficult bugs to cooking for each other.

---
title: Notion is down
subtitle: It appears they forgot to renew their domain. Oops.
date: 2021-02-12
preview: https://kabirgoel.com/static/notion-name-tweet.jpg
hidden: true
---

_Update: The issue has been fixed. See end of post._

I was trying to save a link to a Notion board, but the desktop app inexplicably kept saying that it couldn't connect to the Internet. It appears that Notion itself was experiencing DNS issues:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">We&#39;re experiencing a DNS issue, causing the site to not resolve for many users. We are actively looking into this issue.</p>&mdash; Notion Status (@NotionStatus) <a href="https://twitter.com/NotionStatus/status/1360220589743480838?ref_src=twsrc%5Etfw">February 12, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Panic appeared to have set in at Notion HQ, which was asking users for help getting in touch with Name.com (their domain name registrar).

<center>
    <figure>
      <img src="/static/notion-name-tweet.jpg" alt="Notion tweet" />
      <figcaption>The tweet has since been deleted.</figcaption>
    </figure>
</center>

Jane Manchun Wong hinted that Notion's .so domain, which is based in Somalia, may have been seized.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Reminder that when you register domains under .io / .so / .me, they actually are originally intended for their own respective geolocations <a href="https://t.co/3N5DWK1MrD">https://t.co/3N5DWK1MrD</a></p>&mdash; Jane Manchun Wong (@wongmjane) <a href="https://twitter.com/wongmjane/status/1360246121575055360?ref_src=twsrc%5Etfw">February 12, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Update

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I think I know what&#39;s happened with Notion. They just allowed their domain to expire. Somalia has a 5 day deletion window, and look at the expiry grace period end - it&#39;s in exactly 5 days.<br><br>cc <a href="https://twitter.com/wongmjane?ref_src=twsrc%5Etfw">@wongmjane</a> <a href="https://t.co/wQ8uHtAU3b">pic.twitter.com/wQ8uHtAU3b</a></p>&mdash; Kieran McHugh (@kieranmch) <a href="https://twitter.com/kieranmch/status/1360246567463235585?ref_src=twsrc%5Etfw">February 12, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Looks like they've fixed the issue. The homepage still shows an error (at least for me), but the fact that it's back up points to the above explanation being correct.

<figure>
  <img src="/static/notion-dns-error.png" alt="Notion homepage" />
  <figcaption>The error on the Notion homepage.</figcaption>
</figure>

This incident appears to have been a one-off thing. Presumably, no one at Notion saw the email from their domain registrar, which is understandable for a startup growing as fast as it is. Still, it's a timely reminder that errors come from where you least expect, and also that you should host your status page on a different domain than your main website. ([status.notion.so](https://status.notion.so) was also down during the outage, rendering it completely useless. 🙄)

Oh well, the excitement is over. Back to work now I guess. ✌️

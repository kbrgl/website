---
title: Minimizing first-byte latency for audio on the web
subtitle: A few easy, high impact fixes, and one hard one.
date: 2025-03-10
hidden: true
---

At [Cartesia](https://github.com), we're building the world's fastest, most scalable real-time models for AI voices.

But that work doesn't matter if we can't deliver generated audio to the user as quickly as possible. So we also spend a lot of time thinking end-to-end about how to make that happen, whether that's by replicating our service across the globe or optimizing our client-side code.

In this post, I'll share a few fixes for lower first-byte latency—how long it takes the first byte to reach the user—that had the lowest effort-to-impact ratio for us.

## 1. Avoid preflight requests by setting the `Access-Control-Max-Age` header

Fetch requests that leave your web app's domain ("cross-origin" requests) face more security restrictions than those that don't ("same-origin" requests). If you've written an app that makes these kinds of requests (which is probably most apps these days), you may have heard of CORS headers, which you add to your server's responses to let the browser know the server is OK with requests from other (sub)domains.

What you might not know is that every time you make certain types of cross-origin requests, the browser sends a preflight request (with the OPTIONS HTTP method) that checks if the server is comfortable with accepting that request. Specifically, preflight checks happen for ["non-simple" requests](https://stackoverflow.com/questions/29954037/why-is-an-options-request-sent-and-can-i-disable-it).

In the network inspector for Chromium-based browsers, you'll see preflight requests both as separate entries in the request list, as well as being included in the "Queueing" portion of the main request's timing information.

CORS middlewares usually handle responding to preflight requests. However, most CORS middlewares don't set the `Access-Control-Max-Age` header, meaning the preflight request isn't cached, and takes place every single time you try to send a non-trivial request. This adds an entire round trip to your latency, so tuning the value to something reasonable for your app (such as `300`, for 5 minutes) is a good idea.

## 2. Don't compress real-time responses

> I will caveat this one by saying that if your users are on low-bandwidth Internet connections, this might not be the right choice. See #3 instead.

Compression is best for responses that are served from storage. If you're serving responses in real-time to users on good Internet connections, consider avoiding compression, since compression algorithms typically require buffering up a chunk before they can transmit the first byte.

## 3. Make your data smaller

If you're delivering raw PCM audio, this might mean using `int16` encoding instead of `float32` (which keeps your audio sounding the same), or dropping the sample rate (which will have a higher impact on how your audio sounds).

If you have to serve users on low-bandwidth connections, you should look at using Opus in a WebM container. (You need the container to support Safari.) You can use FFmpeg to handle the encoding.

## 4. If you're using FFmpeg, tune it for latency

Most servers delivering real-time audio use FFmpeg somewhere in the pipeline. FFmpeg's default options generally prioritize throughput (how many bytes can be pushed out per second) over latency (how fast the first byte can be delivered).

Some things you can tune:

1. `-fflags nobuffer`: Disable input buffering, reducing latency (at the cost of potentially causing some stuttering).
2. `-probesize <int>`: Set the probe size, which is how much of the input is used to detect the input format.
3. `-flags low_delay`: Enable low-delay processing mode.

## 5. Use the Web Audio API to take playbck into your own hands (hard)

The naive approach to playing audio on the web is to slap the URL into an audio element and make it play with JavaScript:

```javascript
const audio = new Audio("my-audio-file.mp3");
audio.play();
```

This is great for most use cases, because the browser truly does a lot for you here:

1. Buffering up enough audio that the user can play it back uninterrupted, based on their network connection.
2. Managing hardware audio resources.
3. Showing a simple UI that supports scrubbing, play/pause, and downloading.

However, #1—automatic buffering—means you lose the ability to trade off uninterrupted playback for latency.

An alternative is to use the (very finnicky) Web Audio API, in tandem with `fetch()`ed `ReadableStream`s of audio, to control every aspect of playback, from how audio chunks are scheduled to how much audio is buffered and under what circumstances.

Beware, though—here be dragons. There are a lot of footguns in the API:

1. Different timing properties use different units and epochs.
2. Scheduling of audio buffers is done by the browser on a best-effort basis, rather than 
3. You have to come up with your own workarounds to deal with artifacts such as popping, such as [finding zero-crossings in your audio data](https://alemangui.github.io/ramp-to-value).

---

Happy coding!

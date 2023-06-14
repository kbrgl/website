---
title: What apps do
subtitle: A framework for thinking about apps.
date: 2023-06-13
---

I think that at its core, any app is an interface that does three things:

1. Interact with some persisted data.
2. Compute results from data.
3. Connect to external systems.

Some useful observations using this framework:

- Interacting with persisted data is the most common feature by a landslide.
- Some apps—like Notion, Linear, and Netflix—_primarily_ interact with persisted data. They can be seen as opinionated UIs for interacting with a database.
- Some apps—like Google Flights—primarily connect to external systems.
- Spreadsheets interact with persisted data and use it to compute results. Newer spreadsheet apps, like Airtable, connect to external systems like Snowflake.

This framework is useful if you’re trying to invent some sort of abstraction or system for building apps more easily. Each of the features is a problem space you can focus on. [Riffle](https://riffle.systems), for instance, focuses on interactions with persisted data; [Pipedream](https://pipedream.com/) focuses on connecting systems together.

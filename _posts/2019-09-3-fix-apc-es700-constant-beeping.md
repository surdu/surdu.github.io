---
layout: post
title:  "How to fix APC Back-UPS ES-700 constant beeping problem"
disqus: true
---

Lately my APC UPS was crippled by the problem that seems to kill most of it's models: after a surge event, instead of switching to battery it starts to continuously beep. For a while I could restart it several times and the problem would go away, but in the past few days nothing would make it turn on again without constant beeping.

Time to take it apart.

Before taking it apart, it would be a good idea to take a picture of the board and it's connections, as they are plenty:

![Connections](/assets/images/apc/connections.jpg)

After a quick visual inspection of the main board it was clear that no parts where blown. Next I checked on a hint from a YouTube comment, that someone was successful in fixing it by replacing some bad capacitors, but he/she didn't go into any more detail than that.

Time to take out the [ESR Meter](https://www.aliexpress.com/item/32622606673.html).

Measured all capacitors and sure enough, found 4 caps that where dead as a dodo. I've circled them in red in the following picture.

![Bad Capacitors](/assets/images/apc/bad-caps.jpg)

_Note: the capacitors in the picture are already changed. Yours will look different, probably like the ones in the picture below._

All 4 bad caps where the same: `22uF 25V` made by Jamicon.

![Culprit](/assets/images/apc/culprit.jpg)

I replaced mine with better quality [Nichicon ones](https://ro.farnell.com/nichicon/uka1e220mdd1td/cap-22-f-25v-20/dp/2841899) and I would recommend you do the same.

After putting it back together I realised that this also fixed another problem: for as far as I can remember, like 5 seconds after starting the UPS, it started buzzing loudly for a while. Now you can barely hear the buzzing.

Hope this helps 😎

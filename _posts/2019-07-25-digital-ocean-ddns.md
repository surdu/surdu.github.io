---
layout: post
title:  "Use DigitalOcean as dynamic DNS"
date:   2019-07-25
disqus: true
---
I've set up a server at my home to host various test projects, and I needed a dynamic DNS service as my ISP assigns me an IP dynamically. Tried DuckDNS and it's fine, but their domain names tend to get long, and I don't like typing URLS. So, decided to buy a domain and handle the DNS update myself.

Basically, what we need to do is a script that finds out what our IP is and then tells it to [DigitalOcean](https://www.digitalocean.com/).

I will not cover in detail what needs to be done on DigitalOcean's side, as their awesome documentations covers it all. I'll list the steps with links in their docs:

1. [Generate an access token](https://www.digitalocean.com/docs/api/create-personal-access-token/)
2. [Create a project](https://www.digitalocean.com/docs/projects/how-to/create/)
3. [Add domains to the created project](https://www.digitalocean.com/docs/networking/dns/how-to/add-domains/)

Once you have added domains to your project, you need to [add at least one A record to your DNS records](https://www.digitalocean.com/docs/networking/dns/how-to/manage-records/#a-records).

In my case, I added two records:

![Example A records](/assets/images/do-dns/records.jpg)

The first one will point `example.com` domain to my machine and the last one will point all sub-domains of `example.com` to my machine. For the first one enter `@` as host on DigitalOcean, and for the last one enter `*`. As for the IP, it doesn't matter what you enter as it will be automatically updated as described next.

This should be all that you need to do on the side of DigitalOcean.

Now let's write a bash script that will update DigitalOcean's DNS records with our IP.

First, here is the whole script, and next we'll go step by step and see what we need to change and what it does.

<gist id="gist-5fb84832b75d2f76b2c6bc961882d1c4" data-file="update-ddns.sh"></gist>

The things we need to change are at the top of the file.

The first thing we need to change is at line 3 where we need to add the access token that we generated above in step 1 on DigitalOcean. Should look something like this:

<gist
	id="gist-5fb84832b75d2f76b2c6bc961882d1c4"
	data-file="update-ddns-filled.sh"
	data-line="3"
	data-showFooter="false">
</gist>

Next, we'll need to tell our script what are the ids for the DNS records. For this, we'll use this little script to list all our DigitalOcean DNS records for a specific domain:

<gist id="gist-5fb84832b75d2f76b2c6bc961882d1c4" data-file="get_dns.sh"></gist>

---
layout: post
title:  "Automate Building GitHub Pages That Use Jekyll Plugins"
---

As of the writing of this article, this blog's content is generated using [Jekyll](https://jekyllrb.com/) and hosted on [GitHub Pages](https://pages.github.com/). Until recently all was well: I pushed my code to the `master` branch on my website's repository and GitHub took care of generating the website for me using Jekyll. All this changed when I started needing to use a custom Jekyll plugin, as GitHub Pages don't support custom plugins due to security concerns.

What is needed in order to use GitHub pages with custom plugins is to generate the website locally and then upload the generated content to a special branch on your repository called `gh-pages`.

The solution that I've implemented involves creating a pre-push git hook that will do the following if it sees a push on the `master` branch:

 1. build the Jekyll website locally
 2. moves the `_site` folder that contains the generated website somewhere outside of the current folder (I choose the parent folder for simplicity)
 3. checkout the `gh-pages` branch and remove everything from the working directory
 4. copy back the content of the `_site` folder directly into the current working directory
 5. commit and push the newly copied content on the `gh-pages` branch

What we need to do first is to set-up our repository for this purpose.

First thing that we need to do, is make sure we have the `gh-pages` branch on the repository. To do this, run the following terminal command in your local repository folder:

```bash
git checkout -b gh-pages
git push origin gh-pages
```

If you already have the `gh-pages`, just run `git checkout gh-pages`.

Next, we'll need to make sure this new branch doesn't contain anything. This is especially the case when we don't do this at the inception of the repository and the `gh-pages` will basically inherit the content from the branch we made it from.

To clean the `gh-branch`, run the following in the terminal:

```bash
git checkout gh-pages
rm -rf *
git add -A
git commit -m "Initialized gh-pages branch"
git push
```

Now that the `gh-pages` branch contains no file, we're ready to add the git hook that will take care of generating the content for us.

First let's create the git hook file:

```bash
touch .git/hooks/pre-push
```

This will create a file in the `.git/hooks` folder called pre-push. Open it in your preferred editor and paste in the following content:

<gist id="gist-a3224b51c37f6f2b6cf1aeb9fc98bd23" data-file="pre-push"></gist>

Please note the comments in the above code (lines starting with #) which explain what each section of the code does. You should find steps that are listed in the beginning of this article.

And that's it! Now, every time you push a commit to the `master` branch, you `gh-pages` branch should be updated with the content of your website.

Hope this helps! 👍

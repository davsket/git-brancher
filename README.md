# Git Brancher

his command lets you create a new branch easily, you can pass your branch text as the arguments and it will generate a valid branch name from it.
A recommendation is to surround your text by ", so you can add line breaks into it.

It will also suggest some prefixes to add to the branch:

```sh
$ branch Project-1440 Sign up screen alignment (iOS)
! Your branch name so far:
git checkout -b WFM365-1440-Sign-up-screen-alignment-iOS
? Would you like to add a prefix? (none)
  (none)
❯ fix
  feature
  hotfix
  refactor
  chore
$ git checkout -b fix/WFM365-1440-Sign-up-screen-alignment-iOS

```

## Installation

```sh
$ npm i -g git-brancher
```

## Usage

You can pass your branch as the arguments:

```sh
$ branch your branch name
```

This will execute:

```sh
$ git checkout -b your-branch-name
```

You can also copy/paste your task from other place (i.e. Jira) and paste it using quotes:

```sh
$ branch "YourProject-2344
This would be the issue text (and possible description)"
```

Will execute:

```sh
$ git checkout -b YourProject-2344-This-would-be-the-issue-text-and-possible-description
```

## Help

```
$ brancher --help
```

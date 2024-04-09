#!/bin/sh

# Credits: http://stackoverflow.com/a/750191

git filter-branch -f --env-filter "GIT_AUTHOR_NAME='Bestmart721' GIT_AUTHOR_EMAIL='steven93721@gmail.com' GIT_COMMITTER_NAME='Bestmart721' GIT_COMMITTER_EMAIL='steven93721@gmail.com'" HEAD
# Gator CLI

Gator CLI is a command-line tool for managing RSS feeds, following feeds, and browsing posts from feeds you follow.

## Usage

```
cli <command> [args...]
```

## Commands

### User Management

#### `register <username>`
Creates a new user account and logs in as that user.

Example:
```
cli register johndoe
```

#### `login <username>`
Logs in as an existing user.

Example:
```
cli login johndoe
```

#### `users`
Lists all registered users, marking the current user.

Example:
```
cli users
```

#### `reset`
Resets the database by deleting all users.

Example:
```
cli reset
```

### Feed Management

#### `addfeed <feed_name> <feed_url>`
Adds a new RSS feed to the system. Requires being logged in.

Example:
```
cli addfeed "Boot.dev Blog" https://blog.boot.dev/index.xml
```

#### `feeds`
Lists all feeds in the system.

Example:
```
cli feeds
```

#### `follow <feed_url>`
Follows a feed. Requires being logged in.

Example:
```
cli follow https://blog.boot.dev/index.xml
```

#### `following`
Lists all feeds the current user is following. Requires being logged in.

Example:
```
cli following
```

#### `unfollow <feed_url>`
Unfollows a feed. Requires being logged in.

Example:
```
cli unfollow https://blog.boot.dev/index.xml
```

### Content Management

#### `agg <time_between_reqs>`
Starts the feed aggregator, which fetches new posts from all feeds at the specified interval.
The time format can be specified as "1h 30m 15s" or "3500ms".

Example:
```
cli agg 30m
```

#### `browse [limit]`
Displays posts from feeds the user is following. Optionally limits the number of posts shown (default is 2).
Requires being logged in.

Example:
```
cli browse 5
```

## Authentication

Commands that require authentication (`addfeed`, `follow`, `following`, `unfollow`, `browse`) will only work if you're logged in.
Use the `login` or `register` command to authenticate before using these commands.
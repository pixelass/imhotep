# Imhotep

Imhotep is a collection of dev tools.

Included:

-   typescript
-   babel
-   browserslist
-   prettier
    -   markdown
    -   json
    -   javascript
    -   typescript
-   stylelint
    -   a11y
    -   animations
    -   browser-features
-   ava
-   webpack
-   webpack-dev-server

## webpack

```shell
imhotep build ## --watch
```

## webpack-dev-server

```shell
imhotep dev ## --hot
```

## prettier

```shell
imhotep format
```

## delete generated directories

```shell
imhotep clean
```

## stylelint

```shell
imhotep lint ## --fix
```

## create package

```shell
imhotep pack
```

## test

```shell
imhotep test ## --watch
```

## types

```shell
imhotep types ## --watch
```

## queue

```shell
imhotep clean babel types test lint ## --fix
```

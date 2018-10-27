Simple constants generator.

https://constants-creator.herokuapp.com/



write like:

```
const G8_LANGUAGE_MAP = {
                [ENGLISH]: 2057,
                [GERMAN]: 1031,
                [ARABIC]: 10241,
                }
```

to get

```
const ENGLISH = "ENGLISH
const GERMAN = "GERMAN
const ARABIC = "ARABIC

const consts = {
 G8_LANGUAGE_MAP,
ENGLISH,
GERMAN,
ARABIC,
}

module.exports = consts
```
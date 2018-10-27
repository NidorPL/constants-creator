## Simple constants generator.

https://constants-creator.herokuapp.com/



write like:

```
const abc = {
                [ENGLISH]: 2057,
                [GERMAN]: 1031,
            }


```

to get the pieces you need:

```
const ENGLISH = "ENGLISH"
const GERMAN = "GERMAN"

const consts = {
abc,
ENGLISH,
GERMAN,
}
module.exports = consts

```
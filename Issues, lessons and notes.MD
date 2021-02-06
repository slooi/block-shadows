# Issues, Lessons and Notes

This is documentation for myself of information I have learnt from this project. The purpose of this documentation is to provide future me potentially useful information.

## Issues I faced:

-   TS2459: Module '"./webgl"' declares 'createRenderer' locally, but it is not exported.
    -   Solution: Restart the webpack serve
-   Webpack:
    -   Accidentally tried getting position of v_BlockPos instead of a_BlockPos
-   Can't access typescript variables in the console browser

## Lessons

-   ReturnType<typeof createRenderer>
-   config: typeof initialConfig
-   `keyof` - union of public properties NAMES. Eg: `keyof UpdatedUniformsType`
-   assertions. `as` keyword can be used to ASSERT to the compiler that you know what something is
-   `extends` - contrains generic parameter.

```
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

-   `in` - index accessor

```
type Optional<T> = {
  [K in keyof T]?: T[K]
};

interface Animal {
  age: number;
  race: string;
}
-	[] <= signiies tuples
-	type RA<T extends [] | number> = "hi"
const animal: Optional<Animal> = {
  age: 15
};
```

-   import "./styles.css" <= This is how you import css files!

-   --lib in tsconfig controls is the source. --target is the target ES version javascript is compiled to
    source: https://stackoverflow.com/questions/42093758/need-clarification-of-the-target-and-lib-compiler-options

-   type ValueOf<T> = T[keyof T];
    source: https://stackoverflow.com/questions/49285864/is-there-a-valueof-similar-to-keyof-in-typescript

-   declare module '\*.jpg';
-   ^ Allows typescript compiler to find modules with .jpg
    source:
    https://stackoverflow.com/questions/51100401/typescript-image-import
    https://stackoverflow.com/questions/52759220/importing-images-in-typescript-react-cannot-find-module
-   <T, K extends keyof T>

-   type A<T> = {
    [K in keyof T]:T[K]
    }

-   Use clamp(gl_PoinPosition.x,offset,1.0-offset) instead of doing math without clamp in the texture2D(). Clamp PREVENTS texture bleed with math and
    seems!
-   Use gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST); for when blocks are zoomed inNOT the mipmap!

#### Webgl notes

-   Make sure to use the right data type to store values
-   Webgl 1.0 does not support uint and double
-   varyings can not be ints. They must be floats

-   I'm using floats not ints for u_NumOfBlocks and v_BlockIndex. This is because:
    -   u_NumOfBlocks eventually divides a float. Can't do float/int without casting.
    -   v_BlockIndex gets passed to a varying. Varyings must be floats, they can't be ints.
    -   u_NumOfBlocks and v_BlockIndex must be of the same type as `bufferData(gl.ARRAY_BUFFER,new FLOAT/INT(data), gl.STATIC)`

## Notes

-   Only once `inputHandler`
-   `Game` - this is the actual gameplay part. NOT homescreen!
-   `SceneManager` - controls transitionings between different scenes. Eg: title screen, lobby, game

-   The `map` given by the server is a 2d array of numbers representing block_id (in future might just turn it into binary)

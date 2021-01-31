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

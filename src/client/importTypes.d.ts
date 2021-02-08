import createInputHandler from "./createInputHandler";
import initialConfig from "./initialConfig";

type InputHandlerType = ReturnType<typeof createInputHandler>;
type BlockIndices = GeneralNumbersUpTo<typeof initialConfig.numOfBlocks>; // typeof is a number as initialConfig.numOfBlocks is CONST

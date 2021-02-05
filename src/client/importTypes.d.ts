import createInputHandler from "./createInputHandler";
import initalConfig from "./initialConfig";

type InputHandlerType = ReturnType<typeof createInputHandler>;

type GeneralNumbersUpTo<T extends number, A extends number[] = []> =
    | A["length"]
    | (T extends A["length"] ? never : GeneralNumbersUpTo<T, [...A, 0]>);
type BlockIndices = GeneralNumbersUpTo<typeof initalConfig.numOfBlocks>;
